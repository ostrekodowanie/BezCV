from rest_framework import serializers

from .models import FavouriteCandidates
from apps.Candidates.models import Candidates

class FavouriteCandidatesSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    class Meta:
        model = Candidates
        fields = ('id', 'first_name', 'last_name', 'email', 'phone')

    def get_first_name(self, obj):
        if obj.purchasedoffers_candidate.filter(employer=self.context['request'].user).exists():
            return obj.first_name
        return obj.first_name[0] + '*' * (len(obj.first_name) - 1)

    def get_last_name(self, obj):
        if obj.purchasedoffers_candidate.filter(employer=self.context['request'].user).exists():
            return obj.last_name
        return obj.last_name[0] + '*' * (len(obj.last_name) - 1)

class FavouriteOffersSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteCandidates
        fields = '__all__'