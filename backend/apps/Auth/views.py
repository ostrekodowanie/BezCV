from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import authenticate

from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.settings import api_settings

from . import serializers
from .models import User

import jwt

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            "password": attrs["password"],
        }
        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass
        
        try:
            user_obj = User.objects.get(email=attrs[self.username_field])
            if not user_obj.check_password(attrs['password']):
                raise AuthenticationFailed('Nieprawidłowe hasło')
            self.user = authenticate(**authenticate_kwargs)

            return super().validate(attrs)
        except User.DoesNotExist:
            raise AuthenticationFailed('Konto nie istnieje')
    
    def get_token(cls, user):
        if user.is_verified == False:
            raise AuthenticationFailed('Zweryfikuj swoje konto')    
            
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        
        token['id'] = user.id
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['nip'] = user.nip

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class SignUpView(views.APIView):
    serializer_class = serializers.SignUpSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = serializer.data

            token = jwt.encode({'email': user['email']}, settings.SECRET_KEY, algorithm='HS256')
            
            email_message = EmailMessage(
                subject='Potwierdź swoją rejestrację',
                body='Aby potwierdzić swoją rejestrację, kliknij w link: https://' + get_current_site(request).domain + '/rejestracja/verify?token={}'.format(token),
                to=[user['email']]
            )
            email_message.send()
            
            return Response({'User created'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyView(views.APIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(email=payload['email'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            payload = jwt.decode(token, settings.SECRET_KEY,  algorithms=['HS256'], options={"verify_signature": False})
            if User.objects.filter(email=payload['email']).exists() == True:
                user = User.objects.get(email=payload['email'])
                if user.is_verified:
                    return Response({'User is already verified'}, status=status.HTTP_400_BAD_REQUEST)
                User.objects.get(email=payload['email']).delete()
            return Response({'Activation link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(views.APIView):
    def post(self, request):
        try:
            refresh_token = request.data
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)