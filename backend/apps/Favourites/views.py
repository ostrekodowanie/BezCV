from django.db.models import Q

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .models import FavouriteCandidates
from apps.Candidates.models import Candidates


class AddToFavouritesView(generics.CreateAPIView):
    serializer_class = serializers.FavouriteOffersSerializer
    permission_classes = [IsAuthenticated]       
    
    def create(self, request, *args, **kwargs):
        employer = request.user

        candidate_id = request.data.get('candidate')

        try:
            candidate = Candidates.objects.get(id=candidate_id)
        except Candidates.DoesNotExist:
            return Response({"error": "Candidate not found"}, status=status.HTTP_404_NOT_FOUND)

        if FavouriteCandidates.objects.filter(employer=employer, candidate=candidate).exists():
            return Response({"error": "Already added to favourites"}, status=status.HTTP_400_BAD_REQUEST)

        favourite = FavouriteCandidates(employer=employer, candidate=candidate)
        favourite.save()

        serializer = self.get_serializer(favourite)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RemoveFromFavouritesView(generics.DestroyAPIView):
    serializer_class = serializers.FavouriteOffersSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        candidate = self.kwargs['c']
        favourite = FavouriteCandidates.objects.get(Q(employer=self.request.user) & Q(candidate=candidate))
        favourite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)