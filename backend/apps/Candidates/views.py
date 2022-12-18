from django.db.models import Q, Exists, OuterRef, Count, F
from django.contrib.postgres.aggregates import ArrayAgg

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .models import Candidates, Abilities, PurchasedOffers, Roles
from apps.Favourites.models import FavouriteCandidates

class AllCandidatesView(generics.ListAPIView):
    queryset = Candidates.objects.filter(is_verified=True)
    serializer_class = serializers.AllCandidatesSerializer

class CandidateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        u = self.request.GET.get('u')
        slug=self.kwargs['slug']
        id=self.kwargs['pk']

        candidate = (Candidates.objects
            .filter(Q(is_verified=True) & Q(slug=slug) & Q(id=id))
            .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=u, candidate_id=OuterRef('pk'))))
            .annotate(abilities=ArrayAgg('candidateabilities_candidate__ability__name'))
            .annotate(role=F('candidateroles_candidate__role__name')))

        if candidate.filter(is_purchased=True):
            return Response(candidate.values('id', 'first_name', 'last_name', 'email', 'phone', 'is_purchased', 'abilities', 'role'))

        return Response(candidate.values('id', 'first_name', 'last_name', 'is_purchased', 'abilities', 'role'))


class CandidateAddView(generics.CreateAPIView):
    serializer_class = serializers.CandidateAddSerializer


class OffersView(generics.ListAPIView):
    serializer_class = serializers.SearchCandidateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        u = self.request.GET.get('u')

        queries = Q(is_verified=True)

        return (Candidates.objects
            .filter(queries)
            .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=u, candidate_id=OuterRef('pk'))))
            .filter(is_purchased=False)
            .annotate(favourite=Exists(FavouriteCandidates.objects.filter(employer=u, candidate_id=OuterRef('pk'))))
            .annotate(ids=Count('favouritecandidates_candidate__id'))
            .order_by('-ids'))

        
class FiltersView(APIView):
    def get(self, request):
        abilities = Abilities.objects.all().order_by('name').distinct('name')
        abilities_list = []
        for x in abilities:
            abilities_list.append(x.name)

        roles = Roles.objects.all().order_by('name').distinct('name')
        roles_list = []
        for x in roles:
            roles_list.append(x.name)

        data = {
            'abilities': abilities_list,
            'roles': roles_list,
        }

        return Response(data)

class SearchCandidateView(generics.ListAPIView):
    serializer_class = serializers.SearchCandidateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        q = self.request.GET.get('q')
        a = self.request.GET.get('a')
        r = self.request.GET.get('r')
        u = self.request.GET.get('u')
        queries = Q(is_verified=True)

        if q:
            query=Q()
            for x in q.split():
                query &= Q(slug__icontains=x)
            queries.add(Q(query), Q.AND)

        if a:     
            s = a.split(',')
            queries.add(Q(candidateabilities_candidate__ability__name__in=s), Q.AND)
        
        if r:
            s = r.split(',')
            queries.add(Q(candidateroles_candidate__role__name__in=s), Q.AND)

        return (Candidates.objects
            .filter(queries)
            .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=u, candidate_id=OuterRef('pk'))))
            .filter(is_purchased=False)
            .annotate(favourite=Exists(FavouriteCandidates.objects.filter(employer=u, candidate_id=OuterRef('pk'))))
            .annotate(ids=Count('favouritecandidates_candidate__id'))
            .order_by('-ids')
            .distinct())

class PurchaseOfferView(generics.CreateAPIView):
    serializer_class = serializers.PurchaseOfferSerializer

class PurchasedOffersView(generics.ListAPIView):
    serializer_class = serializers.PurchasedOffersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        u = self.request.GET.get('u')
        return Candidates.objects.filter(purchasedoffers_candidate__employer_id=u)
        