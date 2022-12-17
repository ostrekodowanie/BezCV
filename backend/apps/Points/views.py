from rest_framework import generics

from . import serializers

class PurchasePointsView(generics.CreateAPIView):
    serializer_class = serializers.PurchasePointsSerializer