from django.db.models import Q, Exists, OuterRef, Count, F
from django.contrib.postgres.aggregates import ArrayAgg

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .models import Candidates, Abilities, PurchasedOffers, Roles
from apps.Favourites.models import FavouriteCandidates


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
        
        if candidate.values('is_purchased').first()['is_purchased'] == True:
            return candidate

        email = candidate.values('email').first()['email']
        email_parts = email.split('@')
        hidden_email = email_parts[0][0] + '*' * (len(email_parts[0]) - 1) + '@' + email_parts[1]
        
        return Response({
            'id': candidate.values('id').first()['id'],
            'first_name': candidate.values('first_name').first()['first_name'],
            'last_name': candidate.values('last_name').first()['last_name'],
            'email': hidden_email,
            'phone': '*********',
            'is_purchased': candidate.values('is_purchased').first()['is_purchased'],
            'abilities': candidate.values('abilities').first()['abilities'],
            'role': candidate.values('role').first()['role']
        })


class CandidateAddView(generics.CreateAPIView):
    serializer_class = serializers.CandidateAddSerializer


class OffersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        u = self.request.GET.get('u')
        page = self.request.GET.get('page', 1)

        per_page = 10
        offset = (int(page) - 1) * per_page

        queries = Q(is_verified=True)

        queryset = (Candidates.objects
            .filter(queries)
            .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=u, candidate_id=OuterRef('pk'))))
            .filter(is_purchased=False)
        )

        total_count = queryset.count()

        queryset = (queryset
            .annotate(favourite=Exists(FavouriteCandidates.objects.filter(employer=u, candidate_id=OuterRef('pk'))))
            .annotate(ids=Count('favouritecandidates_candidate__id'))
            .order_by('-ids')
            .annotate(abilities=ArrayAgg('candidateabilities_candidate__ability__name'))
            .annotate(role=F('candidateroles_candidate__role__name'))
            .distinct()[offset:offset + per_page]
        )

        if not queryset.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({'count': total_count, 'results': queryset.values('id', 'first_name', 'last_name', 'slug', 'favourite', 'abilities', 'role')})


class SearchCandidateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        q = self.request.GET.get('q')
        a = self.request.GET.get('a')
        r = self.request.GET.get('r')
        u = self.request.GET.get('u')
        page = self.request.GET.get('page', 1)

        per_page = 10
        offset = (int(page) - 1) * per_page

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

        queryset = (Candidates.objects
            .filter(queries)
            .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=u, candidate_id=OuterRef('pk'))))
            .filter(is_purchased=False))

        total_count = queryset.count()

        queryset = (queryset
            .annotate(favourite=Exists(FavouriteCandidates.objects.filter(employer=u, candidate_id=OuterRef('pk'))))
            .annotate(ids=Count('favouritecandidates_candidate__id'))
            .order_by('-ids')
            .annotate(abilities=ArrayAgg('candidateabilities_candidate__ability__name'))
            .annotate(role=F('candidateroles_candidate__role__name'))
            .distinct()[offset:offset + per_page])

        if not queryset.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)
 
        return Response({'count': total_count,'results': queryset.values('id', 'first_name', 'last_name', 'slug', 'favourite', 'abilities', 'role')})

        
class FiltersView(APIView):
    def get(self, request):
        abilities = Abilities.objects.annotate(ability_count=Count('name')).order_by('ability_count')
        roles = Roles.objects.annotate(role_count=Count('name')).order_by('role_count')

        abilities_list = []
        for x in abilities:
            abilities_list.append(x.name)

        roles_list = []
        for x in roles:
            roles_list.append(x.name)

        data = {
            'abilities': abilities_list,
            'roles': roles_list,
        }

        return Response(data)

class PurchaseOfferView(generics.CreateAPIView):
    serializer_class = serializers.PurchaseOfferSerializer

class PurchasedOffersView(generics.ListAPIView):
    serializer_class = serializers.PurchasedOffersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        u = self.request.GET.get('u')
        return Candidates.objects.filter(purchasedoffers_candidate__employer_id=u)
        