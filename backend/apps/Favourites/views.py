from django.db.models import Q

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .models import FavouriteCandidates


class AddToFavouritesView(generics.CreateAPIView):
    serializer_class = serializers.FavouriteOffersSerializer
    permission_classes = [IsAuthenticated]        


class RemoveFromFavouritesView(generics.DestroyAPIView):
    serializer_class = serializers.FavouriteOffersSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        candidate = self.kwargs['c']
        favourite = FavouriteCandidates.objects.get(Q(employer=self.request.user) & Q(candidate=candidate))
        favourite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)