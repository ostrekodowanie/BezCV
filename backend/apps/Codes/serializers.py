from rest_framework import serializers

from .models import UsedCodes


class UsedCodesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsedCodes
        fields = "__all__"
