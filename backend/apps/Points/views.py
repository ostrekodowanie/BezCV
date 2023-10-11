import os
from datetime import datetime, timedelta

import requests
from apps.Auth.models import User
from apps.Codes.models import UsedCodes
from config.settings import fakturownia_token
from django.core.mail import EmailMessage
from django.db.models import Sum
from django.template.loader import render_to_string
from django.utils import timezone
from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Orders

client_id = os.environ.get("PAYU_CLIENT_ID")
client_secret = os.environ.get("PAYU_CLIENT_SECRET")


class PurchasePointsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        amount = request.data.get("amount")
        price = request.data.get("price")
        expiry = request.data.get("expiry")
        phone = request.data.get("phone")
        email = request.data.get("email")
        street = request.data.get("street")
        postal_code = request.data.get("postal_code")
        city = request.data.get("city")
        code_id = request.data.get("code_id")
        description = f"bezCV - {amount} tokens, expiry: {expiry}"
        if code_id:
            description += f", code: {code_id}"

        employer = self.request.user

        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        }

        data = requests.post(
            f"https://secure.payu.com/pl/standard/user/oauth/authorize?grant_type=client_credentials&client_id={client_id}&client_secret={client_secret}",
            headers=headers,
        )

        response_data = data.json()

        access_token = response_data["access_token"]

        unit_price = price / amount

        order_headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        order_data = {
            "merchantPosId": client_id,
            "description": description,
            "currencyCode": "PLN",
            "totalAmount": str(int(price * 100)),
            "customerIp": request.META.get("REMOTE_ADDR"),
            "continueUrl": "https://bezcv.com",
            "notifyUrl": "https://bezcv.com/api/payu-notify",
            "buyer": {
                "email": email,
                "phone": phone,
                "firstName": employer.first_name,
                "lastName": employer.last_name,
                "language": "pl",
                "delivery": {"street": street, "postalCode": postal_code, "city": city},
            },
            "products": [
                {
                    "name": f"Pakiet rekrutacyjny - {amount}",
                    "unitPrice": int(unit_price),
                    "quantity": amount,
                }
            ],
        }

        response = requests.post(
            "https://secure.payu.com/api/v2_1/orders",
            headers=order_headers,
            json=order_data,
            allow_redirects=False,
        )

        location_header = response.headers.get("Location")

        return Response(location_header)


class PayUNotificationView(views.APIView):
    def post(self, request, *args, **kwargs):
        payload = request.data
        status = payload["order"]["status"]
        if status == "COMPLETED":
            products = payload["order"]["products"]
            tokens = sum(int(product["quantity"]) for product in products)
            order_id = payload["order"]["orderId"]
            amount = int(payload["order"]["totalAmount"]) / 100
            buyer_email = payload["order"]["buyer"]["email"]
            post_code = payload["order"]["buyer"]["delivery"]["postalCode"]
            city = payload["order"]["buyer"]["delivery"]["city"]
            street = payload["order"]["buyer"]["delivery"]["street"]
            description = payload["order"]["description"]

            parts = description.split("expiry: ")
            parts = parts[1].strip()
            if ", code: " in parts:
                expiry, code_id = parts.split(", code: ")
                expiry = expiry.strip()
                code_id = code_id.strip()
            else:
                expiry = parts.strip()
                code_id = None
            expiration_date = timezone.now() + timezone.timedelta(days=int(expiry))

            buyer = User.objects.get(email=buyer_email)

            Orders.objects.create(
                buyer=buyer,
                tokens=tokens,
                amount=amount,
                order_id=order_id,
                expiration_date=expiration_date,
                remaining_tokens=tokens,
            )

            if code_id is not None:
                UsedCodes.objects.filter(id=code_id).update(is_active=False)

            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }

            current_date = datetime.now()
            formatted_date = current_date.strftime("%d/%m/%Y")

            current_month = current_date.month
            current_year = current_date.year
            orders_count = Orders.objects.filter(
                created_at__year=current_year, created_at__month=current_month
            ).count()
            formatted_number = f"b{orders_count + 1}"

            message = f"""invoice": 
                    "kind": "vat",
                    "number": "{formatted_date}{formatted_number}",
                    "sell_date": {formatted_date},
                    "issue_date": {formatted_date},
                    "payment_to": {formatted_date},
                    "seller_name": "AGENCJA SOCIAL MEDIA YO ME SP. Z O.O.",
                    "seller_tax_no": "5252445767",
                    "seller_street": "MEKSYKAŃSKA 6/10",
                    "seller_post_code": "03-948",
                    "seller_city": "WARSZAWA",
                    "seller_country": "Polska",
                    "seller_email": "biuro@bezcv.com",
                    "seller_www": "www.bezCV.com",
                    "seller_bank": "mBank",
                    "seller_bank_account": "57 1140 2004 0000 3802 8113 3172",
                    "buyer_name": {buyer.company_name},
                    "buyer_email": {buyer_email},
                    "buyer_tax_no": {buyer.nip},
                    "buyer_post_code": {post_code},
                    "buyer_city": {city},
                    "buyer_street": {street},
                    "positions": [
                        
                            "name": f"Pakiet rekrutacyjny - {tokens}",
                            "tax": 23,
                            "total_price_gross": {str(amount)},
                            "quantity": {tokens},
                        
                    ],
                )"""

            email_message = EmailMessage(
                subject=f"Faktura {formatted_date}{formatted_number}",
                body=message,
                to=["biuro@bezcv.com"],
            )
            email_message.send()

            purchased_tokens = (
                buyer.purchasedpoints_employer.filter(
                    expiration_date__gt=timezone.now(), remaining_tokens__gt=0
                ).aggregate(Sum("remaining_tokens"))["remaining_tokens__sum"]
                or 0
            )

            remaining_tokens = purchased_tokens + buyer.tokens

            context = {"employer": buyer.first_name, "token_count": remaining_tokens}

            message = render_to_string("employers/after_payment.html", context)
            email_message = EmailMessage(
                subject="Dziękujemy za zakup tokenów bCV - Jak z nich korzystać?",
                body=message,
                to=[buyer.email, "biuro@bezcv.com"],
            )
            email_message.content_subtype = "html"
            email_message.send()

            # data = {
            #     "invoice": {
            #         "kind": "vat",
            #         "number": f"{formatted_date}{formatted_number}",
            #         "sell_date": formatted_date,
            #         "issue_date": formatted_date,
            #         "payment_to": formatted_date,
            #         "seller_name": "AGENCJA SOCIAL MEDIA YO ME SP. Z O.O.",
            #         "seller_tax_no": "5252445767",
            #         "seller_street": "MEKSYKAŃSKA 6/10",
            #         "seller_post_code": "03-948",
            #         "seller_city": "WARSZAWA",
            #         "seller_country": "Polska",
            #         "seller_email": "biuro@bezcv.com",
            #         "seller_www": "www.bezCV.com",
            #         "seller_bank": "mBank",
            #         "seller_bank_account": "57 1140 2004 0000 3802 8113 3172",
            #         "buyer_name": buyer.company_name,
            #         "buyer_email": buyer_email,
            #         "buyer_tax_no": buyer.nip,
            #         "buyer_post_code": post_code,
            #         "buyer_city": city,
            #         "buyer_street": street,
            #         "positions": [
            #             {
            #                 "name": f"Pakiet rekrutacyjny - {tokens}",
            #                 "tax": 23,
            #                 "total_price_gross": str(amount),
            #                 "quantity": tokens,
            #             }
            #         ],
            #     }
            # }

            # data = requests.post(
            #     f"https://yome-biuro.fakturownia.pl/invoices.json?api_token={fakturownia_token}",
            #     json=data,
            #     headers=headers,
            # )
            # response_data = data.json()

            # data = requests.post(
            #     f"https://yome-biuro.fakturownia.pl/invoices/{response_data['id']}/send_by_email.json?api_token={fakturownia_token}"
            # )
            # response_data = data.json()

        return Response(status=200)
