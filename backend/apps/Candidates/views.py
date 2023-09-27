from django.db.models import Exists, Q, OuterRef
from django.utils import timezone

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view

from django_filters import rest_framework as filters

from . import serializers
from .models import Candidates, PurchasedOffers
from apps.Survey.models import Categories
from config.settings import client


class CandidateView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CandidateSerializer
    queryset = Candidates.objects.all()


class CandidatesFilter(filters.FilterSet):
    professions = filters.BaseInFilter(
        field_name='profession', lookup_expr='in')
    availability = filters.BaseInFilter(
        field_name='availability', lookup_expr='in')
    salary = filters.BaseInFilter(
        field_name='salary_expectation', lookup_expr='in')
    province = filters.BaseInFilter(field_name='province', lookup_expr='in')

    class Meta:
        model = Candidates
        fields = ['professions', 'availability', 'salary']


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10


class CandidatesView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CandidatesSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CandidatesFilter

    def get_queryset(self):
        queryset = Candidates.objects.filter(is_visible=True)
        ordering = self.request.query_params.get("order", None)
        show_purchased = self.request.query_params.get("show_purchased", True)

        if show_purchased == "False":
            queryset = (
                queryset.annotate(
                    is_purchased=Exists(
                        PurchasedOffers.objects.filter(
                            employer=self.request.user, candidate_id=OuterRef(
                                "pk")
                        )
                    ),
                )
                .filter(is_purchased=False)
            )

        if ordering:
            order_dict = {
                "oldest": "created_at",
                "salary_asc": "salary_expectation",
                "salary_desc": "-salary_expectation",
            }
            queryset = queryset.order_by(
                order_dict.get(ordering, "-created_at"))
        else:
            queryset = queryset.order_by("-created_at")

        return queryset


class FiltersView(APIView):
    def get(self, request):
        professions = Categories.objects.values_list(
            'name', flat=True).order_by('name')
        salary = Candidates.objects.values_list(
            'salary_expectation', flat=True).order_by('salary_expectation').distinct()

        data = {
            'professions': professions,
            'salary': salary
        }

        return Response(data)


class PurchaseOfferView(generics.CreateAPIView):
    serializer_class = serializers.PurchaseOfferSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        purchased_offer_id = response.data.get('id')

        purchased_offer = PurchasedOffers.objects.get(id=purchased_offer_id)

        user = self.request.user

        purchased_tokens = user.purchasedpoints_employer.filter(
            expiration_date__gt=timezone.now(), remaining_tokens__gt=0).count()

        if purchased_tokens > 0:
            purchased_tokens_obj = user.purchasedpoints_employer.filter(
                expiration_date__gt=timezone.now(), remaining_tokens__gt=0).order_by('expiration_date').first()
            if len(purchased_offer.candidate.completed_surveys) == 3:
                purchased_tokens_obj.remaining_tokens -= 2
            else:
                purchased_tokens_obj.remaining_tokens -= 1
            purchased_tokens_obj.save()
        else:
            if len(purchased_offer.candidate.completed_surveys) == 3:
                user.tokens -= 2
            else:
                user.tokens -= 1
            user.save()

        message = f'Twój profil zainteresował jednego z pracodawców w naszej bazie. Jest zainteresowany współpracą.\n\nPoniżej informacje o nim: {purchased_offer.employer.first_name} {purchased_offer.employer.last_name}\n{purchased_offer.employer.company_name}\n\nNiedługo powinien się z Tobą skontaktować. Powodzenia!'

        client.sms.send(to=purchased_offer.candidate.phone,
                        message=message, from_="bezCV", encoding="utf-8")

        return response


class PurchasedOffersListView(generics.ListAPIView):
    serializer_class = serializers.PurchasedOffersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Candidates.objects.filter(purchasedoffers_candidate__employer=self.request.user)


class AddReportView(generics.CreateAPIView):
    serializer_class = serializers.AddReportSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
def smsapi_endpoint(request):
    if request.method == 'POST':
        from_number = request.data.get('sms_from')
        message = request.data.get('sms_text')

        if message == '1':
            phone_number = from_number[2:]
            candidate = Candidates.objects.get(phone=phone_number)
            candidate.has_job = True
            candidate.save()
            return Response({'status': 'OK'})
        else:
            return Response({'status': 'ERROR', 'message': 'Nieprawidłowa treść wiadomości.'})
