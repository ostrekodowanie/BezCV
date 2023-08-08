from django.core.mail import EmailMessage, get_connection
from django.utils import timezone
from django.template.loader import render_to_string
from django.db import models

from config.settings import client
from apps.Auth.models import User
from apps.Candidates.models import Candidates, CandidateAbilities

from django_q.tasks import async_task
from datetime import timedelta

def has_job():
    one_week_ago = timezone.now() - timedelta(weeks=1)
    candidates = Candidates.objects.filter(has_job=False, created_at__lte=one_week_ago)
    eligible_candidates = candidates.exclude(first_offer_date=None)
    if eligible_candidates.exists():
        phone_numbers = [candidate.phone for candidate in eligible_candidates]
        async_task(
            client.sms.send(
                to=phone_numbers, 
                message=f'Zainteresowanie Twoim profilem rośnie!\nNapisz nam, czy udało Ci się już znaleźć wymarzoną pracę?\nJeżeli tak, wyślij SMS o treści 1.', 
                from_="2way", encoding="utf-8"
            )
        )

#candidates
def companies():
    companies_this_week = User.objects.filter(is_verified=True, date_joined__gte=timezone.now()-timezone.timedelta(days=7)).values_list('company_name', flat=True)
    candidates = Candidates.objects.filter(is_visible=True)
    
    context = {
        'companies_this_week': companies_this_week
    }
    
    with get_connection() as connection:
            for candidate in candidates:
                context['candidate'] = candidate
                message = render_to_string('candidates/companies.html', context)
                email_message = EmailMessage(
                    subject='Te firmy szukają pracownika - bezCV',
                    body=message,
                    to=[candidate.email],
                    connection=connection
                )
                email_message.content_subtype ="html"
                async_task(email_message.send())       
                

#employers
#every monday
def new_candidates():
    employers = User.objects.filter(is_verified=True)
    new_candidates = Candidates.objects.filter(created_at__gte=timezone.now()-timezone.timedelta(days=7)).count
    new_abilities = CandidateAbilities.objects.filter(created_at__gte=timezone.now()-timezone.timedelta(days=7)).count
    
    context = {
        'new_candidates': new_candidates,
        'new_abilities': new_abilities
    }
    
    with get_connection() as connection:
            for employer in employers:            
                context['employer'] = employer
                message = render_to_string('employers/new_candidates.html', context)
                email_message = EmailMessage(
                    subject='Tyle osób szuka pracy - bezCV',
                    body=message,
                    to=[employer.email],
                    connection=connection
                )
                email_message.content_subtype ="html"
                async_task(email_message.send())


#every thursday
def no_tokens():
    employers = User.objects.filter(purchasedpoints_employer__isnull=True, is_verified=True)
    
    context = {}
    
    with get_connection() as connection:
            for employer in employers:            
                context['employer'] = employer
                message = render_to_string('employers/no_tokens.html', context)
                email_message = EmailMessage(
                    subject='Skontaktuj się z kandydatami chętnymi do pracy u Ciebie w firmie - bezCV',
                    body=message,
                    to=[employer.email],
                    connection=connection
                )
                email_message.content_subtype ="html"
                async_task(email_message.send())
                
                
#everyday
""" def token_expiring():
    payment_details = PaymentDetails.objects.filter(
        created_at__lte=timezone.now() - timezone.timedelta(days=28),
        created_at__gt=timezone.now() - timezone.timedelta(days=29)
    )
    
    context = {}
    
    with get_connection() as connection:
            for payment_detail in payment_details:  
                expire_date = payment_detail.created_at + timezone.timedelta(days=30)
                expire_date_formatted = expire_date.strftime('[%d.%m.%Y]')   
                context['date'] = expire_date_formatted       
                context['employer'] = payment_detail.employer
                message = render_to_string('employers/token_expiring.html', context)
                email_message = EmailMessage(
                    subject='Pozostało 1 dzień ważności Twoich tokenów - bezCV',
                    body=message,
                    to=[payment_detail.employer.email],
                    connection=connection
                )
                email_message.content_subtype ="html"
                async_task(email_message.send()) """
                
""" from django.db.models import F, Sum            
def all_emails(email):
    employer = User.objects.get()
    candidate = Candidates.objects.get()
    
    #1
    companies_this_week = User.objects.filter(is_verified=True, date_joined__gte=timezone.now()-timezone.timedelta(days=7)).values_list('company_name', flat=True)
    
    context = {
        'companies_this_week': companies_this_week
    }
    
    context['candidate'] = candidate
    message = render_to_string('candidates/companies.html', context)
    email_message = EmailMessage(
        subject='Te firmy szukają pracownika - bezCV',
        body=message,
        to=[email]
    )
    email_message.content_subtype ="html"
    async_task(email_message.send())  
    
    #2
    
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
        to=[email]
    )
    email_message.content_subtype ="html"
    async_task(email_message.send()) 
    
    #3
    context = {
        'candidate': candidate
    }
            
    message = render_to_string('candidates/survey.html', context)
    email_message = EmailMessage(
        subject='Zwiększ swoją szansę na wymarzoną pracę - bezCV',
        body=message,
        to=[email]
    )
    email_message.content_subtype ="html"
    async_task(email_message.send()) 
    
    #4
    new_candidates = Candidates.objects.filter(created_at__gte=timezone.now()-timezone.timedelta(days=7)).count
    new_abilities = CandidateAbilities.objects.filter(created_at__gte=timezone.now()-timezone.timedelta(days=7)).count
    
    context = {
        'employer': employer,
        'new_candidates': new_candidates,
        'new_abilities': new_abilities
    }
    
    message = render_to_string('employers/new_candidates.html', context)
    email_message = EmailMessage(
        subject='Tyle osób szuka pracy - bezCV',
        body=message,
        to=[email]
    )
    email_message.content_subtype ="html"
    async_task(email_message.send())
    
    #5
    context={}
    expire_date_formatted = '14.04.2023'
    context['date'] = expire_date_formatted       
    context['employer'] = employer
    message = render_to_string('employers/token_expiring.html', context)
    email_message = EmailMessage(
        subject='Pozostało 1 dzień ważności Twoich tokenów - bezCV',
        body=message,
        to=[email]
    )
    email_message.content_subtype ="html"
    async_task(email_message.send())
    
    #6
    last_month = timezone.now() - timezone.timedelta(days=30)
    purchased_tokens = employer.purchasedpoints_employer.filter(
        created_at__gte=last_month
    ).aggregate(Sum('amount'))['amount__sum'] or 0
    
    oldest_token_date = employer.purchasedpoints_employer.filter(
        created_at__gte=last_month
    ).order_by('created_at').values_list('created_at', flat=True).first()
    
    if oldest_token_date:
        purchased_contacts = employer.purchasedoffers_employer.filter(
            created_at__gte=oldest_token_date
        ).count()
    else:
        purchased_contacts = 0

    remaining_tokens = purchased_tokens - purchased_contacts
    
    context = {
            'employer': employer.first_name,
            'token_count': remaining_tokens
        }
                
    message = render_to_string('employers/after_payment.html', context)
    email_message = EmailMessage(
        subject='Dziękujemy za zakup tokenów bCV - Jak z nich korzystać?',
        body=message,
        to=[email]
    )
    email_message.content_subtype ="html"
    async_task(email_message.send())
    
    #7
    context = {
        'user': employer
    }
    
    message = render_to_string('employers/after_verify.html', context)
    email_message = EmailMessage(
        subject='Od teraz masz dostęp do wszystkich kandydatów! - bezCV',
        body=message,
        to=[email]
    )
    email_message.content_subtype ="html"
    async_task(email_message.send())
    
    #8
    context = {
        'employer': employer
    }
    message = render_to_string('employers/no_tokens.html', context)
    email_message = EmailMessage(
        subject='Skontaktuj się z kandydatami chętnymi do pracy u Ciebie w firmie - bezCV',
        body=message,
        to=[email]
    )
    email_message.content_subtype ="html"
    async_task(email_message.send())
    
    #9
    link = 'https://bezcv.com/rejestracja'
    
    context = {
        'user': employer.first_name,
        'link': link
    }
    
    message = render_to_string('employers/verify.html', context)
    email_message = EmailMessage(
        subject='Potwierdź swoją rejestrację',
        body=message,
        to=[email]
    )
    email_message.content_subtype ="html"
    async_task(email_message.send()) """