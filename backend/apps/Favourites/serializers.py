from rest_framework import serializers

from .models import FavouriteCandidates
from apps.Candidates.models import Candidates

class FavouriteCandidatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('id', 'first_name', 'last_name', 'email', 'phone')

class FavouriteOffersSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteCandidates
        fields = '__all__'