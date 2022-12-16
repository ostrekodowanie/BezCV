from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.Candidates.models import Candidates, CandidateAbilities, Abilities
from . import serializers

class UnverifiedCandidatesView(generics.ListAPIView):
    queryset = Candidates.objects.filter(is_verified=False)
    serializer_class = serializers.VerifyCandidatesSerializer
    permission_classes = [IsAdminUser]

class VerifyCandidatesView(APIView):
    def post(self, request):
        action = request.data.pop('action')
        id = request.data.pop('id')
        abilities = request.data.pop('abilities')
        if action == 'verify':
            Candidates.objects.filter(id=id).update(**request.data)
            Candidates.objects.get(id=id).save()
            for x in abilities:
                CandidateAbilities.objects.create(candidate_id=id, ability=Abilities.objects.get(name=x))

            return Response({'Successfully verified'})

        Candidates.objects.filter(id=request.data['id']).delete()
        return Response({'Successfully deleted'})