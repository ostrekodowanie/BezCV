from rest_framework import serializers
from rest_framework.validators import ValidationError

from .models import User

class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            error_messages={
                'unique': 'Email jest już przypisany do istniejącego konta'
            }
        )
    nip = serializers.CharField(
            error_messages={
                'unique': 'NIP jest już przypisany do istniejącego konta'
            }
        )
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'nip', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        email = validated_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError('Email jest już przypisany do istniejącego konta')
        nip = validated_data.get('nip')
        if User.objects.filter(nip=nip).exists():
            raise ValidationError('NIP jest już przypisany do istniejącego konta')
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
            
        instance.save()

        return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  User
        fields = ('first_name', 'last_name', 'email', 'desc', 'image', 'nip', 'points', 'is_staff')

