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

    def create(self, validated_data):
        preferred_professions_data = validated_data.pop('preferred_professions')
        print(preferred_professions_data)
        candidate = Candidates.objects.create(**validated_data)
        for profession_data in preferred_professions_data:
            profession = Professions.objects.get(id=profession_data['id'])
            candidate.preferred_professions.add(profession)
        return candidate