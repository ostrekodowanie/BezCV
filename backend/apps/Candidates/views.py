from django.db.models import Q, Exists, OuterRef, Count, F

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .models import Candidates, Abilities, PurchasedOffers, Roles
from apps.Favourites.models import FavouriteCandidates
from .utils import get_candidate, get_similar_candidates


class CandidateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.GET.get('u')
        candidate_slug = self.kwargs['slug']
        candidate_id = self.kwargs['pk']

        candidate = get_candidate(user, candidate_slug, candidate_id)
        abilities = [ability.ability.name for ability in candidate.candidateabilities_candidate.all()]
        role = candidate.candidateroles_candidate.role.name

        data = {
            'id': candidate.id,
            'first_name': candidate.first_name,
            'last_name': candidate.last_name,
            'email': candidate.email,
            'phone': candidate.phone,
            'is_purchased': candidate.is_purchased,
            'abilities': abilities,
            'role': role
        }

        similar_candidates = get_similar_candidates(user, role, abilities, candidate_id)

        similar_candidate_data = []
        for similar_candidate in similar_candidates:
            similar_candidate_dict = {
                'id': similar_candidate.id,
                'slug': similar_candidate.slug,
                'first_name': similar_candidate.first_name,
                'last_name': similar_candidate.last_name,
                'abilities': [ability.ability.name for ability in similar_candidate.candidateabilities_candidate.all()],
                'role': similar_candidate.candidateroles_candidate.role.name
            }
                
            similar_candidate_data.append(similar_candidate_dict)

            data.update({'similar_candidates': similar_candidate_data})

        if candidate.is_purchased:
            return Response(data)

        email_parts = candidate.email.split('@')
        hidden_email = email_parts[0][0] + '*' * (len(email_parts[0]) - 1) + '@' + email_parts[1]
        
        data.update({
            'email': hidden_email,
            'phone': '*********'
        })

        return Response(data)


class CandidateAddView(generics.CreateAPIView):
    serializer_class = serializers.CandidateAddSerializer


class OffersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.GET.get('u')
        page = self.request.GET.get('page', 1)

        per_page = 5
        offset = (int(page) - 1) * per_page

        queryset = (Candidates.objects
            .only('id', 'first_name', 'last_name', 'slug')
            .select_related('candidateroles_candidate__role')
            .prefetch_related('candidateabilities_candidate__ability')
            .prefetch_related('favouritecandidates_candidate')
            .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=user, candidate_id=OuterRef('pk'))))
            .filter(Q(is_verified=True) & Q(is_purchased=False))
        )

        total_count = queryset.count()

        candidates = (queryset
            .annotate(ids=Count('favouritecandidates_candidate'))
            .order_by('-ids')[offset:offset + per_page]
        )

        if not candidates.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        results = []
        for candidate in candidates:
            result = {}
            result['id'] = candidate.id
            result['first_name'] = candidate.first_name
            result['last_name'] = candidate.last_name
            result['slug'] = candidate.slug
            result['favourite'] = candidate.favouritecandidates_candidate.exists()
            result['abilities'] = [ability.ability.name for ability in candidate.candidateabilities_candidate.all()]
            result['role'] = candidate.candidateroles_candidate.role.name
            results.append(result)

        return Response({'count': total_count, 'results': results})


class SearchCandidateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        q = self.request.GET.get('q')
        abilities = self.request.GET.get('a')
        roles = self.request.GET.get('r')
        user = self.request.GET.get('u')
        page = self.request.GET.get('page', 1)

        per_page = 10
        offset = (int(page) - 1) * per_page

        queries = Q(is_verified=True)
        
        if q:
            query=Q()
            for x in q.split():
                query &= Q(slug__icontains=x)
            queries.add(Q(query), Q.AND)

        if abilities:     
            abilities_list = abilities.split(',')
            queries.add(Q(candidateabilities_candidate__ability__name__in=abilities_list), Q.AND)
        
        if roles:
            roles = roles.split(',')
            queries.add(Q(candidateroles_candidate__role__name__in=roles), Q.AND)

        queryset = (Candidates.objects
            .only('id', 'first_name', 'last_name', 'slug')
            .select_related('candidateroles_candidate__role')
            .prefetch_related('candidateabilities_candidate__ability')
            .prefetch_related('favouritecandidates_candidate')
            .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=user, candidate_id=OuterRef('pk'))))
            .filter(Q(queries) & Q(is_purchased=False))
            .annotate(ids=Count('favouritecandidates_candidate__id'))
            .order_by('-ids'))

        total_count = len(queryset)

        results = []
        for candidate in queryset:
            result = {}
            result['id'] = candidate.id
            result['first_name'] = candidate.first_name
            result['last_name'] = candidate.last_name
            result['slug'] = candidate.slug
            result['favourite'] = candidate.favouritecandidates_candidate.exists()
            result['abilities'] = [ability.ability.name for ability in candidate.candidateabilities_candidate.all()]
            result['role'] = candidate.candidateroles_candidate.role.name

            matching_abilities_count = 0

            if abilities:
                for ability in result['abilities']:
                    if ability in abilities_list:
                        matching_abilities_count += 1

            result['matching_abilities_count'] = matching_abilities_count
            results.append(result)
        
        results = sorted(results, key=lambda x: x['matching_abilities_count'], reverse=True)
        results = results[offset:offset + per_page]

        if not results:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({'count': total_count, 'results': results})


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
        