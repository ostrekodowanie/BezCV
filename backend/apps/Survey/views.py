from django.core.mail import send_mail
from django.db.models import Count, Q

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.Candidates.models import Candidates
from .models import Questions, CandidateAnswers, QuestionCategories, GeneratedCodes
from .serializers import QuestionSerializer, CandidatesSerializer
from .signals import update_percentage

import string, random , os, openai, datetime


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
        Oto rozbudowany opis kandydata oraz jego możliwości (w trzeciej osobie, bez określania płci, rodzaj męski) zachęcający pracodawców na podstawie jego:
        1.Najlepszych umiejętności: {best_abilities}
        2.Najgorszych umiejętności: {worst_abilities}
        2.Preferowanych zawodów: {professions}
        3.Wybranej stawki: {candidate.salary_expectation}
        4.Dostępności: {candidate.availability}
        5.Wcześniejszej lub obecnej pozycji w pracy: {candidate.job_position}
        6.Doświadczenia na stanowiskach:
        - sprzedaży: {candidate.experience_sales} miesięcy
        - obsługi klienta: {candidate.experience_customer_service} miesięcy
        - administracji biurowej: {candidate.experience_office_administration} miesięcy
        7.Edukacji: {candidate.education}
        8.Posiadania prawo jazdy: {candidate.driving_license}
        '''
        
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=input_text,
            max_tokens=1500,
            n=1,
            stop=None,
            temperature=0.3,
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
            return Response({'Email is available.'}, status=status.HTTP_200_OK)
        return Response({'Email is available.'}, status=status.HTTP_204_NO_CONTENT)
    

class PhoneCheckView(APIView):
    def get(self, request, phone):
        if Candidates.objects.filter(phone=phone).exists():
            return Response({'Phone number already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Phone number is available.'}, status=status.HTTP_200_OK)
    

class SendCodeView(APIView):
    def post(self, request):
        email = request.data.get('email')
        candidate = Candidates.objects.get(email=email)

        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        
        if candidate.access_code:
            candidate.access_code.all().delete()
        
        GeneratedCodes.objects.create(candidate=candidate, code=code)

        send_mail(
            'BezCV - Kod dostępu',
            f'Twój kod dostępu to: {code}',
            os.environ.get('EMAIL'),
            [email],
            fail_silently=False,
        )

        return Response({'Access code sent successfully'}, status=200)
    

class CheckCodeView(APIView):
    def post(self, request):
        email = request.data.get('email')
        code = request.data.get('code')
        candidate = Candidates.objects.get(email=email)

        try:
            generated_code = GeneratedCodes.objects.get(candidate=candidate, code=code)
        except GeneratedCodes.DoesNotExist:
            return Response({'Access code is not valid'}, status=400)

        if (datetime.datetime.now(datetime.timezone.utc) - generated_code.created_at).total_seconds() <= 600:
            completed_categories = set()
            answered_questions = CandidateAnswers.objects.filter(candidate__email=email).select_related('question')

            for answer in answered_questions:
                categories = set(answer.question.category.all())
                if categories:
                    completed_categories.update(categories)

            category_dict = {}
            for category in QuestionCategories.objects.all():
                category_questions = Questions.objects.filter(category=category)
                user_questions = answered_questions.filter(question__in=category_questions)
                if len(user_questions) == len(category_questions):
                    category_dict[category.name] = True
                else:
                    category_dict[category.name] = False
            return Response(category_dict, status=200)
        else:
            return Response({'Access code expired'}, status=400)
