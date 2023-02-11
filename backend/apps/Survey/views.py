from django.core.mail import send_mail

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.Candidates.models import Candidates
from .models import Questions, CandidateAnswers, QuestionCategories
from .serializers import QuestionSerializer, CandidatesSerializer

import string
import random
import os


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
        return Response({'success'})


class CandidateCreateView(generics.CreateAPIView):
    queryset = Candidates.objects.all()
    serializer_class = CandidatesSerializer


class EmailCheckView(APIView):

    def get(self, request, email):
        if Candidates.objects.filter(email=email).exists():
            candidate = Candidates.objects.get(email=email)
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
            candidate.access_code = code
            candidate.save()

            '''send_mail(
                'Access code',
                f'Your access code is: {code}',
                os.environ.get('EMAIL'),
                [email],
                fail_silently=False,
            )'''

            return Response({'Access code sent to your email.'}, status=status.HTTP_200_OK)

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