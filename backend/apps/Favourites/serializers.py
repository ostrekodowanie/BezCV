from rest_framework import serializers

from .models import FavouriteCandidates


class FavouriteOffersSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteCandidates
        fields = '__all__'