from django.db.models import Avg, F
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.Candidates.models import Candidates
from .models import Questions, CandidateAnswers, Categories, GeneratedCodes
from .serializers import QuestionSerializer, CandidateCreateSerializer
from .signals import update_percentage
from config.settings import client

import string, random , openai, datetime


class QuestionsByCategoryView(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        category = self.request.GET.get('c')
        phone = self.request.GET.get('phone')
        answered_questions = Questions.objects.filter(candidateanswers_question__candidate__phone=phone).values_list('id', flat=True)
        return Questions.objects.exclude(id__in=answered_questions).filter(category__name=category).order_by('?')
    

class CandidateAnswersView(APIView):
    def post(self, request, format=None):
        candidate_phone = request.data.get('candidate')
        answers = request.data.get('answers')
        candidate = Candidates.objects.get(phone=candidate_phone)
        
        candidate_answers = [
            CandidateAnswers(question=Questions.objects.get(pk=question), answer=answer, candidate=candidate)
            for question, answer in answers
        ]
        CandidateAnswers.objects.bulk_create(candidate_answers)

        for answer in candidate_answers:
            update_percentage(None, instance=answer)

        if not candidate.is_visible:
            candidate.is_visible = True
        
        abilities = candidate.candidateabilities_candidate.annotate(
            name=F('ability__name')
        ).values('name', 'percentage').order_by('-percentage').distinct()[:3]
        
        total_experience_months = candidate.experience_customer_service + candidate.experience_office_administration + candidate.experience_sales

        if total_experience_months > 0:
            positions = {
                'obsługi klienta': candidate.experience_customer_service,
                'administracji biurowej': candidate.experience_office_administration,
                'sprzedaży': candidate.experience_sales
            }
            best_position = max(positions, key=positions.get)
            years_of_experience = positions[best_position] // 12
            months_of_experience = positions[best_position] % 12

            experience_text = f"z {str(years_of_experience) + ' letnim' if years_of_experience > 0 else str(months_of_experience) + ' miesięcznym'} doświadczeniem na stanowisku {best_position}"
        else:
            experience_text = "bez doświadczenia"

        input_text = f'''
        Napisz korzyści (długi opis kandydata), jakie może przynieść zatrudnienie pracownika {experience_text}.
        Tego pracownika wyróżniają trzy najważniejsze kompetencje miękkie, takie jak {abilities[0]['name']}, {abilities[1]['name']} oraz {abilities[2]['name']}. 
        Skoreluj je ze sobą. 
        Bez pisania wprost o umiejętnościach. 
        Nie powtarzaj słów kluczowych.
        '''
        
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=input_text,
            max_tokens=1500,
            n=1,
            stop=None,
            temperature=0.3,
        )
        
        profession = candidate.candidateabilities_candidate.values(
            'ability__abilityquestions_ability__question__category__name').annotate(
            avg_percentage=Avg('percentage')).order_by('-avg_percentage')[:1]
        
        profession_name = profession[0]['ability__abilityquestions_ability__question__category__name']
        candidate.profession = profession_name
        
        description = response.choices[0].text.strip()
        candidate.desc = description

        candidate.save()
        
        answered_questions = candidate.candidateanswers_candidate.all().select_related('question')
     
        count = 0
        for category in Categories.objects.all():
            category_questions = category.questions_category.all()
            user_questions = answered_questions.filter(question__in=category_questions)
            if len(user_questions) == len(category_questions):
                count += 1
                
        if count == 1:            
            context = {
                'candidate': candidate
            }
                    
            message = render_to_string('candidates/survey.html', context)
            email_message = EmailMessage(
                subject='Zwiększ swoją szansę na wymarzoną pracę - bezCV',
                body=message,
                to=[candidate.email]
            )
            email_message.content_subtype ="html"
            email_message.send()
            
        if count == 3:
            sales = []
            office_administration = []
            customer_service = []
            
            abilities = candidate.candidateabilities_candidate.annotate(
                name=F('ability__name'),
                category=F('ability__abilityquestions_ability__question__category__name')
            ).values('name', 'percentage', 'category').order_by('-percentage').distinct()

            for ability in abilities:
                category = ability['category']
                if category == 'sales':
                    sales.append({
                        'name': ability['name'],
                        'percentage': ability['percentage']
                    })
                elif category == 'office_administration':
                    office_administration.append({
                        'name': ability['name'],
                        'percentage': ability['percentage']
                    })
                elif category == 'customer_service':
                    customer_service.append({
                        'name': ability['name'],
                        'percentage': ability['percentage']
                    })
                 
            context = {
                'candidate': candidate,
                'sales': sales,
                'office_administration': office_administration,
                'customer_service': customer_service
            }
                    
            message = render_to_string('candidates/all_surveys.html', context)
            email_message = EmailMessage(
                subject='Zobacz swoje kompetencje miękkie - bezCV',
                body=message,
                to=[candidate.email]
            )
            email_message.content_subtype ="html"
            email_message.send()

        return Response({'first_name': candidate.first_name})


class CandidateCreateView(generics.CreateAPIView):
    queryset = Candidates.objects.all()
    serializer_class = CandidateCreateSerializer


class EmailCheckView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if Candidates.objects.filter(email=email).exists():
            return Response({'Email already exists.'}, status=status.HTTP_200_OK)
        return Response(status=204)
    

class SendCodeView(APIView):
    def post(self, request):
        phone = request.data.get('phone')
        gen_code = GeneratedCodes.objects.filter(phone=phone)

        code = ''.join(random.choices(string.digits, k=6))
        
        if gen_code:
            gen_code.delete()
        
        GeneratedCodes.objects.create(phone=phone, code=code)

        client.sms.send(to=phone, message=f'Twój kod weryfikacyjny bezCV to: {code}', from_="Test")

        return Response({'Access code sent successfully'}, status=200)
    

class CheckCodeView(APIView):
    def post(self, request):
        phone = request.data.get('phone')
        code = request.data.get('code')
        if Candidates.objects.filter(phone=phone).exists():
            try:
                gen_code = GeneratedCodes.objects.get(phone=phone, code=code)
            except GeneratedCodes.DoesNotExist:
                return Response({'Access code is not valid'}, status=400)
            
            candidate = Candidates.objects.get(phone=phone)

            if (datetime.datetime.now(datetime.timezone.utc) - gen_code.created_at).total_seconds() <= 600:
                completed_categories = set()
                answered_questions = candidate.candidateanswers_candidate.all().select_related('question')

                for answer in answered_questions:
                    categories = set(answer.question.category.all())
                    if categories:
                        completed_categories.update(categories)

                category_dict = {}
                for category in Categories.objects.all():
                    category_questions = category.questions_category.all()
                    user_questions = answered_questions.filter(question__in=category_questions)
                    if len(user_questions) == len(category_questions):
                        category_dict[category.name] = True
                    else:
                        category_dict[category.name] = False
                return Response(category_dict, status=200)
            else:
                return Response({'Access code expired'}, status=400)
        else:
            return Response(status=204)