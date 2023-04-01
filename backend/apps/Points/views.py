from django.urls import reverse
from rest_framework import generics
from rest_framework.response import Response

from . import serializers
from .models import PaymentDetails
from apps.Auth.models import User

import requests


class PurchasePointsView(generics.CreateAPIView):
    serializer_class = serializers.PurchasePointsSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        payment_details = PaymentDetails.objects.create(
            employer=User.objects.get(id=1),
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

        return Response({"redirect_url": response_data['redirectUri']})