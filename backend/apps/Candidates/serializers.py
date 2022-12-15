from rest_framework import serializers

from .models import Candidates

class CandidatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'email', 'nip')

class SearchCandidateSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Candidates
        fields = ['id', 'first_name', 'last_name', 'slug']