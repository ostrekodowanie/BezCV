from django.db.models import Q

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .models import FavouriteCandidates
from apps.Candidates.models import Candidates

class FavouriteCandidatesView(generics.ListAPIView):
    serializer_class = serializers.FavouriteCandidatesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Candidates.objects.filter(favouritecandidates_candidate__employer_id=self.request.user)


class AddToFavouritesView(generics.CreateAPIView):
    serializer_class = serializers.FavouriteOffersSerializer


class RemoveFromFavouritesView(generics.DestroyAPIView):
    serializer_class = serializers.FavouriteOffersSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        candidate = self.kwargs['c']
        favourite = FavouriteCandidates.objects.get(Q(employer=self.request.user) & Q(candidate=candidate))
        favourite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)