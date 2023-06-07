from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from . import serializers
from .models import UsedCodes, Codes, User


class UseCodeView(generics.CreateAPIView):
    serializer_class = serializers.UsedCodesSerializer
    permission_classes = [IsAuthenticated]       
    
    def create(self, request, *args, **kwargs):
        user = self.request.user
        code = request.data.get('code')
        
        try:
            code = Codes.objects.get(code=code, is_active=True)  
        except Codes.DoesNotExist:
            return Response({"Kod wygasł lub jest niepawidłowy"}, status=status.HTTP_400_BAD_REQUEST)
        
        if UsedCodes.objects.filter(user=user, code=code).exists():
            return Response({"Kod został już wykorzystany"}, status=status.HTTP_400_BAD_REQUEST)

        used_code = UsedCodes(user=user, code=code)
        used_code.save()
        
        user.points += code.value
        user.save()
        return Response(code.value, status=status.HTTP_201_CREATED)