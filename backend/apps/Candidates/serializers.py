from rest_framework import serializers
from rest_framework.validators import ValidationError

from .models import Candidates, PurchasedOffers
from apps.Auth.models import User

class CandidateAddSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            error_messages={
                'unique': 'Email jest już przypisany do kandydata'
            }
        )
    phone = serializers.CharField(
            error_messages={
                'unique': 'Numer telefonu jest już przypisany do kandydata'
            }
        )
        
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'email', 'phone')

    def create(self, validated_data):
        email = validated_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError('Email jest już przypisany do istniejącego konta')
        nip = validated_data.get('nip')
        if User.objects.filter(nip=nip).exists():
            raise ValidationError('Numer telefonu jest już przypisany do kandydata')
        
        instance = self.Meta.model(**validated_data)
        instance.save()

        return instance

class PurchaseOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchasedOffers
        fields = '__all__'

    def create(self, validated_data):
        instance = PurchasedOffers.objects.create(**validated_data)
        instance.employer.reduce_points()

        return instance

class PurchasedOffersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('id', 'slug', 'first_name', 'last_name', 'email', 'phone')

