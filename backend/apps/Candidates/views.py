from django.db.models import Exists, Q, OuterRef

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from django_filters import rest_framework as filters

from . import serializers
from .models import Candidates, Abilities, PurchasedOffers
from apps.Survey.models import Categories


class CandidateView(generics.RetrieveAPIView):
    #permission_classes = [IsAuthenticated]
    serializer_class = serializers.CandidateSerializer
    queryset = Candidates.objects.all()


class CandidatesFilter(filters.FilterSet):
    professions = filters.BaseInFilter(field_name='profession', lookup_expr='in')
    availability =  filters.BaseInFilter(field_name='availability', lookup_expr='in')
    salary = filters.BaseInFilter(field_name='salary_expectation', lookup_expr='in')

    class Meta:
        model = Candidates
        fields = ['professions', 'availability', 'salary']

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20

class CandidatesView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.CandidatesSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CandidatesFilter

    def get_queryset(self):
        queryset = (Candidates.objects.annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=self.request.user, candidate_id=OuterRef('pk'))))
            .filter(Q(is_visible=True) & Q(is_purchased=False)))

        ordering = self.request.query_params.get('order', None)

        if ordering:
            if ordering == 'oldest':
                return queryset.order_by('created_at')
            elif ordering == 'salary_asc':
                return queryset.order_by('salary_expectation')
            elif ordering == 'salay_desc':
                return queryset.order_by('-salary_expectation')

        return queryset.order_by('-created_at')


class FiltersView(APIView):
    def get(self, request):
        abilities = Abilities.objects.values_list('name', flat=True).order_by('name')
        professions = Categories.objects.values_list('name', flat=True).order_by('name')
        availability = Candidates.objects.values_list('availability', flat=True).order_by('availability')
        salary = Candidates.objects.values_list('salary_expectation', flat=True).order_by('salary_expectation')
        
        data = {
            'abilities': abilities,
            'professions': professions,
            'availability': availability,
            'salary': salary
        }

        return Response(data)


class PurchaseOfferView(generics.CreateAPIView):
    serializer_class = serializers.PurchaseOfferSerializer


class PurchasedOffersListView(generics.ListAPIView):
    serializer_class = serializers.PurchasedOffersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Candidates.objects.filter(purchasedoffers_candidate__employer_id=self.request.user)
    
    
class AddReportView(generics.CreateAPIView):
    serializer_class = serializers.AddReportSerializer
    permission_classes = [IsAuthenticated]