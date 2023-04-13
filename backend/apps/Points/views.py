from django.urls import reverse
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.db.models import Sum
from django.utils import timezone
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import timedelta

from . import serializers
from .models import PaymentDetails

import requests


class PurchasePointsView(generics.CreateAPIView):
    serializer_class = serializers.PurchasePointsSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        employer = self.request.user

        payment_details = PaymentDetails.objects.create(
            employer=employer,
            amount=serializer.validated_data['amount'],
            price=serializer.validated_data['price'],
            currency=serializer.validated_data.get('currency', 'PLN'),
        )
        
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }
        
        data = {
            'grant_type': 'client_credentials',
            'client_id': '4176518',
            'client_secret': '72dab8a214ca3060b5a297f10ab9ef73'
        }

        data = requests.post("https://secure.snd.payu.com/pl/standard/user/oauth/authorize", headers=headers, data=data)
        print(data.content)
        response_data = data.json()
        access_token = response_data['access_token']
        
        
        headers = {"Authorization": f'Bearer {access_token}'}
        
        data = {
            "merchantPosId": '4176518',
            "description": "Purchase of points",
            "currencyCode": payment_details.currency,
            "totalAmount": str(payment_details.price * 100),
            "notifyUrl": request.build_absolute_uri(reverse('payu_notify')),
            "customerIp": request.META.get('REMOTE_ADDR'),
            "buyer": {
                "email": payment_details.employer.email,
                "firstName": payment_details.employer.first_name,
                "lastName": payment_details.employer.last_name,
                "language": "pl",
            },
            "products": [
                {
                    "name": f"{payment_details.amount} points",
                    "unitPrice": str(payment_details.price * 100),
                    "quantity": "1"
                }
            ],
            "settings": {
                "invoiceDisabled": "true"
            },
            "continueUrl": "https://youtube.com",
            "extOrderId": str(payment_details.id)
        }
        
        response = requests.post("https://secure.snd.payu.com/api/v2_1/orders/", headers=headers, json=data)
        print(response.content)
        response_data = response.json()
        

        if response.status_code != 201 or 'orderId' not in response_data:
            payment_details.delete()
            return Response({"error": "Failed to create PayU order"}, status=400)

        payment_details.payu_order_id = response_data['orderId']
        payment_details.payu_status = response_data['status']
        payment_details.save()
        
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
                'employer': employer['first_name'],
                'token_count': remaining_tokens
            }
                    
        message = render_to_string('employers/after_payment.html', context)
        email_message = EmailMessage(
            subject='Dziękujemy za zakup tokenów bCV - Jak z nich korzystać?',
            body=message,
            to=[employer['email']]
        )
        email_message.content_subtype ="html"
        email_message.send()

        return Response({"redirect_url": response_data['redirectUri']})