from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from apps.Candidates.models import Candidates
from . import serializers

class VerifyCandidatesView(generics.ListAPIView):
    queryset = Candidates.objects.filter(is_verified=False)
    serializer_class = serializers.VerifyCandidatesSerializer
    permission_classes = [IsAdminUser]