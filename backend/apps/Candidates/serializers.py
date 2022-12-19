from rest_framework import serializers

from .models import Candidates, PurchasedOffers, Abilities, Roles, CandidateAbilities, CandidateRoles

class CandidateAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'email', 'phone')

class SearchCandidateSerializer(serializers.ModelSerializer):
    favourite = serializers.BooleanField(read_only=True)
    abilities = serializers.ListField(child=serializers.CharField())
    role = serializers.CharField()
    class Meta:
        model = Candidates
        fields = ('id', 'first_name', 'last_name', 'slug', 'favourite', 'abilities', 'role')

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

