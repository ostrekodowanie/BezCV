from django.core.mail import EmailMessage

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
                  'experience_sales', 'experience_customer_service', 'experience_office_administration', 'education',
                  'driving_license', 'preferred_professions']

    def create(self, validated_data):
        preferred_professions_data = validated_data.pop('preferred_professions')
        candidate = Candidates.objects.create(**validated_data)
        for profession in preferred_professions_data:
            CandidateProfessions.objects.create(candidate=candidate, profession=profession)

        subject = 'Potwierdzenie rejestracji kandydata'
        message = 'Dziękujemy za rejestrację w naszej bazie kandydatów. Poniżej znajdują się informacje, które zostały przesłane:\n'
        message += 'Imię: ' + candidate.first_name + '\n'
        message += 'Nazwisko: ' + candidate.last_name + '\n'
        message += 'E-mail: ' + candidate.email + '\n'
        message += 'Telefon: ' + candidate.phone + '\n'
        message += 'Oczekiwania finansowe: ' + str(candidate.salary_expectation) + '\n'
        message += 'Dostępność: ' + str(candidate.availability) + '\n'
        message += 'Pozycja zawodowa: ' + candidate.job_position + '\n'
        message += 'Doświadczenie w sprzedaży: ' + str(candidate.experience_sales) + '\n'
        message += 'Doświadczenie w obsłudze klienta: ' + str(candidate.experience_customer_service) + '\n'
        message += 'Doświadczenie w administracji: ' + str(candidate.experience_office_administration) + '\n'
        message += 'Wykształcenie: ' + candidate.education + '\n'
        driving_license = 'Tak' if candidate.driving_license else 'Nie'
        message += 'Prawo jazdy: ' + driving_license + '\n'
        message += 'Preferowane zawody: ' + ', '.join([profession.name for profession in preferred_professions_data]) + '\n'
        
        to_email = candidate.email
        email = EmailMessage(subject, message, to=[to_email])
        email.send()

        return candidate