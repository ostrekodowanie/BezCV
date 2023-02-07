from rest_framework import serializers

from .models import Questions
from apps.Candidates.models import Candidates, Professions


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ['id', 'text']


class ProfessionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professions
        fields = '__all__'

class CandidatesSerializer(serializers.ModelSerializer):
    preferred_professions = ProfessionsSerializer(many=True)

    class Meta:
        model = Candidates
        fields = '__all__'