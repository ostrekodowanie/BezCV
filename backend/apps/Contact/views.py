from django.core.mail import send_mail

from rest_framework import views
from rest_framework.response import Response

from .serializers import ContactFormSerializer


class ContactFormView(views.APIView):
  serializer_class = ContactFormSerializer

  def post(self, request):
    serializer = self.serializer_class(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data

    send_mail(
    'BEZCV Formularz Kontaktowy',
    f'From: {data["first_name"]} {data["last_name"]}\n{data["email"]}\n{data["phone"]}\n\n{data["message"]}',
    'portfoliositeexample@gmail.com',
    ['divideproject.business@gmail.com'],
    fail_silently=False,
    )

    return Response({'Form submitted successfully.'})