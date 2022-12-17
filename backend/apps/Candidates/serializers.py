from rest_framework import serializers

from .models import Candidates, PurchasedOffers, Abilities, Roles

class AllCandidatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('id', 'slug')

class CandidateSerializer(serializers.ModelSerializer):
    
    class CandidateAbilitites(serializers.ModelSerializer):
        class Meta:
            model = Abilities
            fields = ('name')
    class CandidateRoles(serializers.ModelSerializer):
        class Meta:
            model = Roles
            fields = ('name')

    is_purchased = serializers.BooleanField(read_only=True)
    abilities = CandidateAbilitites(many=True)
    role = CandidateRoles
    class Meta:
        model = Candidates
        fields = ('id', 'slug', 'first_name', 'last_name', 'email', 'phone', 'is_purchased', 'abilities', 'role')

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
        instance = PurchasedOffers.objects.create(**validated_data)
        instance.employer.reduce_points()

        return instance

class PurchasedOffersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('id', 'slug', 'first_name', 'last_name', 'email', 'phone')

