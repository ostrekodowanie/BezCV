from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.db.models import Sum
from django.utils import timezone
from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import timedelta, datetime

from .models import Orders
from apps.Auth.models import User
from config.settings import fakturownia_token

import requests, os


client_id = os.environ.get('PAYU_CLIENT_ID') 
client_secret = os.environ.get('PAYU_CLIENT_SECRET') 


class PurchasePointsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')
        price = request.data.get('price')
        
        employer = self.request.user
        
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }
    
        data = requests.post(f"https://secure.payu.com/pl/standard/user/oauth/authorize?grant_type=client_credentials&client_id={client_id}&client_secret={client_secret}", headers=headers)
        
        response_data = data.json()
        
        access_token = response_data['access_token']
        
        order_headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        order_data = {
            "merchantPosId": client_id,
            "description": f"bezCV - {amount} tokens",
            "currencyCode": "PLN",
            "totalAmount": "1",#str(int(price) * 100),
            "customerIp": request.META.get("REMOTE_ADDR"),
            "continueUrl": "https://bezcv.com",
            "notifyUrl": "https://bezcv.com/api/payu-notify",
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
            
        tokens_from_codes = employer.usedcodes_user.aggregate(total_value=Sum('code__value')) or 0

        remaining_tokens = purchased_tokens - purchased_contacts + tokens_from_codes['total_value']
        
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

        return Response(location_header)
    

class PayUNotificationView(views.APIView):
    def post(self, request, *args, **kwargs):
        payload = request.data
        status = payload['order']['status']
        if status == "COMPLETED":
            products = payload['order']['products']
            tokens = sum(int(product['quantity']) for product in products)
            order_id = payload['order']['orderId']
            amount = payload['order']['totalAmount']
            buyer_email = payload['order']['buyer']['email']
            
            buyer = User.objects.get(email=buyer_email)

            order = Orders.objects.create(
                buyer=buyer,
                tokens=tokens,
                amount=amount,
                order_id=order_id
            )
            
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            
            current_date = datetime.now()
            formatted_date = current_date.strftime("%d/%m/%Y")
            
            data = {
                "invoice": {
                    "kind":"vat",
                    "number": order.id,
                    "sell_date": formatted_date,
                    "issue_date": formatted_date,
                    "payment_to": formatted_date,
                    "seller_name": "AGENCJA SOCIAL MEDIA YO ME SP. Z O.O.",
                    "seller_tax_no": "5252445767",
                    "buyer_name": buyer.first_name + buyer.last_name,
                    "buyer_email": buyer_email,
                    "buyer_tax_no": buyer.nip,
                    "positions":[
                        {"name":"tokeny bCV", "tax":23, "total_price_gross":amount, "quantity":tokens}
                    ]
                }
            }
            
            data = requests.post(f"https://yome-biuro.fakturownia.pl/invoices.json?api_token={fakturownia_token}", json=data, headers=headers) 
            response_data = data.json()
            
            data = requests.post(f"https://yome-biuro.fakturownia.pl/invoices/{response_data['id']}/send_by_email.json?api_token={fakturownia_token}")
            response_data = data.json()            

        return Response(status=200)