from rest_framework import serializers

from .models import Candidates

class CandidatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'email', 'phone')