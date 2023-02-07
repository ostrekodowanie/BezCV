from django.core.mail import EmailMessage

from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.Candidates.models import Candidates, CandidateAbilities, Abilities, CandidateRoles, Roles
from . import serializers

class UnverifiedCandidatesView(generics.ListAPIView):
    queryset = Candidates.objects.filter(is_verified=False)
    serializer_class = serializers.VerifyCandidatesSerializer
    permission_classes = [IsAdminUser]

class VerifyCandidatesView(APIView):
    def post(self, request):
        action = request.data.pop('action')
        id = request.data.pop('id')

        if action == 'verify':
            abilities = request.data.pop('abilities')
            role = request.data.pop('role')

            Candidates.objects.filter(id=id).update(is_verified=True, **request.data)
            
            candidate = Candidates.objects.get(id=id)
            candidate.save()

            for x in abilities:
                CandidateAbilities.objects.create(candidate_id=id, ability=Abilities.objects.get(name=x[0]), percentage=x[1])

            CandidateRoles.objects.create(candidate_id=id, role=Roles.objects.get(name=role))

            #email_message = EmailMessage(
            #subject='BezCV - Zgłoszenie',
            #body=f'''Dziękujemy za zgłoszenie!\n\n
            #    Szczegóły:\n
            #    Imię i nazwisko: {candidate.first_name} {candidate.last_name}\n
            #    Email: {candidate.email}\n
            #    Numer telefonu: {candidate.phone}\n
            #    Zawód: {role}\n
            #    Umiejętności: {', '.join(abilities)}''',
            #to=[candidate.email]
            #)
            #email_message.send()

            return Response({'Successfully verified'})

        Candidates.objects.filter(id=id).delete()

        return Response({'Successfully deleted'})