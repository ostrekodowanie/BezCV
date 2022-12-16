from rest_framework import serializers

from apps.Candidates.models import Candidates

class VerifyCandidatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidates
        fields = ('first_name', 'last_name', 'email', 'phone', 'created_at')