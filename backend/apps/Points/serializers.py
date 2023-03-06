from rest_framework import serializers

from .models import PaymentDetails


class PurchasePointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetails
        fields = '__all__'