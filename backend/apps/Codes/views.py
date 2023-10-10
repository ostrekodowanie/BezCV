from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from . import serializers
from .models import Codes, UsedCodes, User


class UseCodeView(generics.CreateAPIView):
    serializer_class = serializers.UsedCodesSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = self.request.user
        code = request.data.get("code")

        try:
            code = Codes.objects.get(code=code, is_active=True, type="reward")
        except:
            return Response(
                {"Kod wygasł lub jest niepawidłowy"}, status=status.HTTP_400_BAD_REQUEST
            )

        if UsedCodes.objects.filter(user=user, type="reward").exists():
            return Response(
                {"Kod został już wykorzystany"}, status=status.HTTP_400_BAD_REQUEST
            )

        used_code = UsedCodes(user=user, code=code)
        used_code.save()

        user.tokens += code.value
        user.save()

        return Response(code.value, status=status.HTTP_201_CREATED)


class UseDiscountCodeView(generics.CreateAPIView):
    serializer_class = serializers.UsedCodesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UsedCodes.objects.none()

    def get(self, request):
        user = self.request.user

        try:
            used_codes = UsedCodes.objects.filter(
                user=user,
                is_active=True,
                code__is_active=True,
                code__type="discount",
            )

            data = [{"id": code.id, "value": code.code.value} for code in used_codes]
            return Response(data, status=200)
        except:
            return Response(status=404)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        code = request.data.get("code")

        try:
            code = Codes.objects.get(code=code, is_active=True, type="discount")
        except:
            return Response(
                {"Kod wygasł lub jest niepawidłowy"}, status=status.HTTP_400_BAD_REQUEST
            )

        if UsedCodes.objects.filter(code=code, user=user).exists():
            return Response(
                {"Kod został już wykorzystany"}, status=status.HTTP_400_BAD_REQUEST
            )

        used_code = UsedCodes(user=user, code=code)
        used_code.save()

        return Response(
            {"id": used_code.id, "value": code.value}, status=status.HTTP_201_CREATED
        )
