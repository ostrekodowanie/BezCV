from django.core.mail import EmailMessage
from django.utils import timezone
from django.db.models import Count

from config.settings import client
from apps.Auth.models import User
from apps.Candidates.models import Candidates

from django_q.tasks import async_task


def send_code():
    client.sms.send(to=790541511, message=f'Twoj kod dostepu to: ', from_="Test")


#candidates
def companies():
    companies_this_week = User.objects.filter(is_verified=True, date_joined__gte=timezone.now()-timezone.timedelta(days=7)).values_list('name', flat=True)
    top_companies = User.objects.filter(is_verified=True).annotate(num_candidates=Count('purchasedoffers_employer')).order_by('-num_candidates')[:20].values_list('name', flat=True)
    candidates = Candidates.objects.filter(is_visible=True)
    
    email_body = f"Firmy, które dołączyły w tym tygodniu:\n{', '.join(companies_this_week)}\n\nLista firm:\n{', '.join(top_companies)}"
    email_message = EmailMessage(
        subject='BezCV - Firmy',
        body=email_body,
        to=[candidate.email for candidate in candidates],
    )
    
    async_task(email_message.send)