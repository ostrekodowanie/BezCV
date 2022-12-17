from rest_framework import serializers

from .models import PaymentDetails

class PurchasePointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetails
        fields = '__all__'

    def create(self, validated_data):
        instance = PaymentDetails.objects.create(**validated_data)
        instance.employer.purchase_points(validated_data['amount'])

        return instance