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
            Candidates.objects.get(id=id).save()

            for x in abilities:
                CandidateAbilities.objects.create(candidate_id=id, ability=Abilities.objects.get(name=x))

            CandidateRoles.objects.create(candidate_id=id, role=Roles.objects.get(name=role))

            return Response({'Successfully verified'})

        Candidates.objects.filter(id=id).delete()

        return Response({'Successfully deleted'})