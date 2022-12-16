from rest_framework import serializers

from .models import Candidates, PurchasedOffers

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'email', 'phone')

class CandidateAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'email', 'phone')

class SearchCandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('id', 'first_name', 'last_name', 'slug')

class PurchaseOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchasedOffers
        fields = '__all__'