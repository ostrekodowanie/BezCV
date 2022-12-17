from rest_framework import serializers

from .models import Candidates, PurchasedOffers
from apps.Auth.views import MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken



class CandidateSerializer(serializers.ModelSerializer):
    is_purchased = serializers.BooleanField(read_only=True)
    class Meta:
        model = Candidates
        fields = ('id', 'slug', 'first_name', 'last_name', 'email', 'phone', 'is_purchased')

class Candidate2Serializer(serializers.ModelSerializer):
    is_purchased = serializers.BooleanField(read_only=True)
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'is_purchased')

class CandidateAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'email', 'phone')

class SearchCandidateSerializer(serializers.ModelSerializer):
    favourite = serializers.BooleanField(read_only=True)
    class Meta:
        model = Candidates
        fields = ('id', 'first_name', 'last_name', 'slug', 'favourite')

class PurchaseOfferSerializer(serializers.ModelSerializer):
    refresh = serializers.CharField()
    class Meta:
        model = PurchasedOffers
        fields = '__all__'

    def create(self, validated_data):
        refresh = validated_data.pop('refresh')
        instance = PurchasedOffers.objects.create(**validated_data)
        instance.employer.reduce_points()

        token = RefreshToken(refresh)
        token.blacklist()

        return instance

