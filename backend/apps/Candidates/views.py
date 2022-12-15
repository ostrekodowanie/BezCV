from django.db.models import Q
from django.shortcuts import render

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from . import serializers
from .models import Candidates, Abilities

class CandidateView(generics.RetrieveAPIView):
    queryset = Candidates.objects.filter(is_verified=True)
    serializer_class = serializers.CandidatesSerializer
    lookup_field = 'slug'

class CandidateAddView(generics.CreateAPIView):
    serializer_class = serializers.CandidatesSerializer

class OffersView(generics.ListAPIView):
    queryset = Candidates.objects.filter(is_verified=True)
    serializer_class = serializers.SearchCandidateSerializer

class AbilitiesView(APIView):
    def get(self, request):
        abilities = Abilities.objects.all().order_by('name').distinct('name')
        abilities_list = []
        for x in abilities:
            abilities_list.append(x.name)

        data = {
            'abilities': abilities_list,
        }

        return Response(data)

class SearchCandidateView(generics.ListAPIView):
    serializer_class = serializers.SearchCandidateSerializer
    def get_queryset(self):
        q = self.request.GET.get('q')
        a = self.request.GET.get('a')
        queries = Q(is_verified=True)

        if q:
            query=Q()
            for x in q.split():
                query &= Q(slug__icontains=x)
            queries.add(Q(query), Q.AND)
        
        if a:
            a.split(',')
            queries.add(Q(candidates__ability__name__in=a), Q.AND)
        
        return Candidates.objects.filter(queries)
