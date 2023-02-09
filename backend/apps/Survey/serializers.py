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
    preferred_professions = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Candidates
        fields = '__all__'

    def create(self, validated_data):
        preferred_professions = validated_data.pop('preferred_professions')
        candidate = Candidates.objects.create(**validated_data)
        for profession_name in preferred_professions:
            profession = Professions.objects.get_or_create(name=profession_name)
            candidate.preferred_professions.add(profession)
        return candidate