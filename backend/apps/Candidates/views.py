from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from django_filters import rest_framework as filters

from . import serializers
from .models import Candidates, Abilities, Professions


class CandidateView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CandidateSerializer
    queryset = Candidates.objects.all()


class CandidatesFilter(filters.FilterSet):
    professions = filters.BaseInFilter(field_name='preferred_profession', lookup_expr='in')
    availability =  filters.BaseInFilter(field_name='availability', lookup_expr='in')

    class Meta:
        model = Candidates
        fields = ['professions', 'availability']

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20

class CandidatesView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CandidatesSerializer
    queryset = Candidates.objects.all()
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CandidatesFilter

    def get_queryset(self):
        queryset = super().get_queryset().filter(is_visible=True)

        ordering = self.request.query_params.get('order', None)

        if ordering:
            if ordering.startswith('-'):
                queryset = queryset.order_by('-created_at')
            else:
                queryset = queryset.order_by('created_at')

        return queryset


class FiltersView(APIView):
    def get(self, request):
        abilities = Abilities.objects.values_list('name', flat=True).order_by('name')
        professions = Professions.objects.values_list('name', flat=True).order_by('name')
        availability = Candidates.objects.values_list('availability', flat=True).order_by('availability').distinct()

        data = {
            'abilities': abilities,
            'professions': professions,
            'availability': availability
        }

        return Response(data)


class PurchaseOfferView(generics.CreateAPIView):
    serializer_class = serializers.PurchaseOfferSerializer


class PurchasedOffersListView(generics.ListAPIView):
    serializer_class = serializers.PurchasedOffersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Candidates.objects.filter(purchasedoffers_candidate__employer_id=self.request.user)