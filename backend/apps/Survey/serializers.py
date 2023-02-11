from rest_framework import serializers

from .models import Questions
from apps.Candidates.models import Candidates, Professions, CandidateProfessions


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ['id', 'text']


class PreferredProfessionField(serializers.StringRelatedField):
    def to_internal_value(self, data):
        profession = Professions.objects.get(name=data)
        return profession

class CandidatesSerializer(serializers.ModelSerializer):
    preferred_professions = PreferredProfessionField(many=True)

    class Meta:
        model = Candidates
        fields = ['first_name', 'last_name', 'email', 'phone', 'salary_expectation', 'availability', 'job_position',
                  'experience_sales', 'experience_customer_service', 'experience_administration', 'education',
                  'driving_license', 'preferred_professions']

    def create(self, validated_data):
        preferred_professions_data = validated_data.pop('preferred_professions')
        candidate = Candidates.objects.create(**validated_data)
        for profession in preferred_professions_data:
            CandidateProfessions.objects.create(candidate=candidate, profession=profession)
        return candidate