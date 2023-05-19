from django.urls import reverse
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.db.models import Sum
from django.utils import timezone
from rest_framework import generics, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import timedelta

from . import serializers
from .models import Orders
from apps.Auth.models import User

import requests, os


client_id = os.environ.get('PAYU_CLIENT_ID') 
client_secret = os.environ.get('PAYU_CLIENT_SECRET') 


class PurchasePointsView(views.APIView):
    #permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')
        price = request.data.get('price')
        
        #employer = self.request.user
        employer = User.objects.get(email="se6359@gmail.com")
        
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }
        
        data = requests.post(f"https://secure.payu.com/pl/standard/user/oauth/authorize?grant_type=client_credentials&client_id={client_id}&client_secret={client_secret}", headers=headers)
        
        response_data = data.json()
        print(response_data)
        access_token = response_data['access_token']
        
        order_headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        order_data = {
            "merchantPosId": client_id,
            "description": "Purchase of points",
            "currencyCode": "PLN",
            "totalAmount": "1",#str(int(price) * 100),
            "customerIp": "127.0.0.1",
            "continueUrl": "https://bezcv.com",
            "buyer": {
                "email": employer.email,
                "firstName": employer.first_name,
                "lastName": employer.last_name,
                "language": "pl",
            },
            "products": [
                {
                    "name": f"{amount} tokens",
                    "unitPrice": "1",
                    "quantity": "1"
                }
            ]
        }
        
        response = requests.post("https://secure.payu.com/api/v2_1/orders", headers=order_headers, json=order_data, allow_redirects=False)
        location_header = response.headers.get('Location')
        print(response.text)
        return Response(location_header)
        
        last_month = timezone.now() - timedelta(days=30)
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
                'employer': "test",#employer['first_name'],
                'token_count': remaining_tokens
            }
                    
        message = render_to_string('employers/after_payment.html', context)
        email_message = EmailMessage(
            subject='Dziękujemy za zakup tokenów bCV - Jak z nich korzystać?',
            body=message,
            to=["se6359@gmail.com"]#[employer['email']]
        )
        email_message.content_subtype ="html"
        email_message.send()

        return Response({"redirect_url": response_data['redirectUri']})