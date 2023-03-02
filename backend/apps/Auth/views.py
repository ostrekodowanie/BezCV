from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import authenticate

from rest_framework import views, status, generics
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from cloudinary.uploader import upload, destroy

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


class PasswordResetView(views.APIView):
    def post(self, request):
        email = request.data

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'Nie ma użytkownika o podanym adresie email'}, status=status.HTTP_400_BAD_REQUEST)

        token = jwt.encode({'email': email}, settings.SECRET_KEY, algorithm='HS256')

        email_message = EmailMessage(
            subject='Resetowanie hasła',
            body='Aby zresetować, kliknij w link: https://' + get_current_site(request).domain + '/logowanie/reset-password?token={}'.format(token),
            to=[email]
        )
        email_message.send()

        return Response({'Wiadomość została wysłana na podany adres email'}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(views.APIView):
    def post(self, request):
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            email = payload['email']
        except jwt.ExpiredSignatureError:
            return Response({'Token resetu hasła wygasł'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError:
            return Response({'Nieprawidłowy token resetu hasła'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()

        return Response({'Hasło zostało zresetowane'}, status=status.HTTP_200_OK)


# user/employer
class UserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]


class UpdateUserView(generics.UpdateAPIView):
    parser_classes = (MultiPartParser, FormParser)
    queryset = User.objects.all()
    serializer_class = serializers.UpdateUserSerializer

    def perform_update(self, serializer):
        image = self.request.FILES.get('image')
        if image:
            public_id = self.get_object().image.split("/")[-1].split(".")[0]
            destroy('BezCV/Users/' + public_id)
            result = upload(self.request.data.get('image'), folder='BezCV/Users')
            url = result.get("url").replace("http://", "https://")
            serializer.save(image=url)
        else:
            serializer.save()


class EmployerProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.EmployerProfileSerializer
    permission_classes = [IsAuthenticated]
