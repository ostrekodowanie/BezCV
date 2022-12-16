from rest_framework import serializers

from .models import Candidates, PurchasedOffers
from apps.Auth.views import MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class CandidateSerializer(serializers.ModelSerializer):
    is_purchased = serializers.BooleanField(read_only=True)
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'email', 'phone', 'is_purchased')

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
    class Meta:
        model = PurchasedOffers
        fields = '__all__'

    def create(self, validated_data):
        token = validated_data.pop('refresh')
        instance = PurchasedOffers.objects.create(**validated_data)
        instance.employer.reduce_points()
        
        refresh_token = RefreshToken(token).refresh()
        
        refresh_token['id'] = self.id
        refresh_token['first_name'] = self.first_name
        refresh_token['last_name'] = self.last_name
        refresh_token['email'] = self.email
        refresh_token['nip'] = self.nip
        refresh_token['points'] = int(self.points)
        refresh_token['is_staff'] = self.is_staff
        
    
        print(refresh_token)
        return instance

