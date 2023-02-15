from django.core.mail import send_mail

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.Candidates.models import Candidates
from .models import Questions, CandidateAnswers, QuestionCategories
from .serializers import QuestionSerializer, CandidatesSerializer
from .signals import update_percentage

import string, random , os, openai


class QuestionsByCategoryView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        category = self.request.GET.get('c')
        email = self.request.GET.get('e')
        answered_questions = Questions.objects.filter(candidateanswers_question__candidate__email=email).values_list('id', flat=True)
        return Questions.objects.exclude(id__in=answered_questions).filter(category__name=category).order_by('?')
    

class CandidateAnswersView(APIView):
    def post(self, request, format=None):
        candidate_email = request.data['candidate']
        answers = request.data['answers']
        candidate = Candidates.objects.get(email=candidate_email)
        candidate_answers = [
            CandidateAnswers(question=Questions.objects.get(pk=question),
                             candidate=candidate, answer=answer)
            for question, answer in answers
        ]
        CandidateAnswers.objects.bulk_create(candidate_answers)

        for answer in candidate_answers:
            update_percentage(None, instance=answer)

        if not candidate.is_visible:
            candidate.is_visible = True
        
        sorted_abilities = sorted(
            [{'name': ability.ability.name, 'percentage': ability.percentage}
            for ability in candidate.candidateabilities_candidate.all()],
            key=lambda x: x['percentage'], reverse=True)
        professions = [profession.profession.name for profession in candidate.candidateprofessions_candidate.all()]
        best_abilities = [ability['name'] for ability in sorted_abilities[:3]]
        worst_abilities = [ability['name'] for ability in sorted_abilities[-3:][::-1]]
        professions = ', '.join(professions)
        input_text = f'''
        Oto rozbudowany opis kandydata (w trzeciej osobie) zachęcający pracodawców na podstawie jego:
        1.Najlepszych umiejętności: {best_abilities}
        2.Najgorszych umiejętności: {worst_abilities}
        2.Preferowanych zawodów: {professions}
        3.Wybranej stawki: {candidate.salary_expectation}
        4.Dostępności: {candidate.availability}
        5.Wcześniejszej lub obecnej pozycji w pracy: {candidate.job_position}
        6.Doświadczenia na stanowiskach:
        - sprzedaży: {candidate.experience_sales} miesięcy
        - obsługi klienta: {candidate.experience_customer_service} miesięcy
        - administracji biurowej: {candidate.experience_administration} miesięcy
        7.Edukacji: {candidate.education}
        8.Posiadania prawo jazdy: {candidate.driving_license}
        '''
        
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=input_text,
            max_tokens=2048,
            n=1,
            stop=None,
            temperature=0.2,
        )

        description = response.choices[0].text.strip()

        candidate.desc = description

        candidate.save()

        return Response({'success'})


class CandidateCreateView(generics.CreateAPIView):
    queryset = Candidates.objects.all()
    serializer_class = CandidatesSerializer


class EmailCheckView(APIView):

    def get(self, request, email):
        if Candidates.objects.filter(email=email).exists():
            #candidate = Candidates.objects.get(email=email)
            #code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
            #candidate.access_code = code
            #candidate.save()

            '''send_mail(
                'Access code',
                f'Your access code is: {code}',
                os.environ.get('EMAIL'),
                [email],
                fail_silently=False,
            )'''

            return Response({'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Email is available.'}, status=status.HTTP_200_OK)
    

class PhoneCheckView(APIView):
    
    def get(self, request, phone):
        if Candidates.objects.filter(phone=phone).exists():
            return Response({'Phone number already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Phone number is available.'}, status=status.HTTP_200_OK)
    

class SurveyStatusView(APIView):

    def get(self, request):
        email = self.request.GET.get('e')
        answered_questions = Questions.objects.filter(candidateanswers_question__candidate__email=email)
        categories = list(set(question.category.all() for question in answered_questions))
        survey_statuses = {}
        for category in QuestionCategories.objects.all():
            if category in categories:
                survey_statuses[category.name] = True
            else:
                survey_statuses[category.name] = False
        return Response(survey_statuses)