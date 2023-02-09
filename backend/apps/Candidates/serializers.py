from rest_framework import serializers
from rest_framework.validators import ValidationError

from .models import Candidates, PurchasedOffers

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


class PurchaseOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchasedOffers
        fields = '__all__'

    def create(self, validated_data):
        instance = PurchasedOffers.objects.create(**validated_data)
        instance.employer.reduce_points()

        return instance


class PurchasedOffersSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    abilities = serializers.SerializerMethodField()
    class Meta:
        model = Candidates
        fields = ('id', 'first_name', 'last_name', 'role', 'abilities')

    def get_role(self, obj):
        return obj.candidateroles_candidate.role.name

    def get_abilities(self, obj):
        return [ability.ability.name for ability in obj.candidateabilities_candidate.all()]