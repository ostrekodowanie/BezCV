from django.db.models import Q, Exists, OuterRef, Count

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .models import Candidates, Abilities, PurchasedOffers, Professions
from .utils import get_candidate, get_similar_candidates


class CandidateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        candidate_id = self.kwargs['pk']

        candidate = get_candidate(self.request.user, candidate_id)
        abilities = [{'name': ability.ability.name, 'percentage': ability.percentage} for ability in candidate.candidateabilities_candidate.all()]
        professions = [profession.profession.name for profession in candidate.candidateprofession_candidate.all()]

        data = {
            'id': candidate.id,
            'first_name': candidate.first_name,
            'last_name': candidate.last_name,
            'email': candidate.email,
            'phone': candidate.phone,
            'salary_expectation': candidate.salary_expectation,
            'is_purchased': candidate.is_purchased,
            'abilities': abilities,
            'professions': professions
        }

        similar_candidates = get_similar_candidates(self.request.user, professions, [ability.ability.name for ability in candidate.candidateabilities_candidate.all()], candidate_id)

        similar_candidate_data = []
        for similar_candidate in similar_candidates:
            similar_candidate_dict = {
                'id': similar_candidate.id,
                'first_name': similar_candidate.first_name[0] + '*' * (len(similar_candidate.first_name) - 1),
                'last_name': similar_candidate.last_name[0] + '*' * (len(similar_candidate.last_name) - 1),
                'abilities': sorted([{'name': ability.ability.name, 'percentage': ability.percentage} for ability in similar_candidate.candidateabilities_candidate.all()],
                   key=lambda x: x['percentage'], reverse=True)[:3],
                'professions': [profession.profession.name for profession in similar_candidate.candidateprofession_candidate.all()]
            }

            #adv order by
            #original_candidate_users = FavouriteCandidates.objects.filter(candidate_id=candidate_id).values_list('employer', flat=True)
            #similar_candidate_users = FavouriteCandidates.objects.filter(candidate_id=similar_candidate.id).values_list('employer', flat=True)
            #num_users = len(set(original_candidate_users).intersection(similar_candidate_users))
                
            similar_candidate_data.append(similar_candidate_dict)

            data.update({'similar_candidates': similar_candidate_data})

        if candidate.is_purchased:
            return Response(data)

        email_parts = candidate.email.split('@')
        hidden_email = email_parts[0][0] + '*' * (len(email_parts[0]) - 1) + '@' + email_parts[1]
        hidden_first_name = candidate.first_name[0] + '*' * (len(candidate.first_name) - 1)
        hidden_last_name = candidate.last_name[0] + '*' * (len(candidate.last_name) - 1)
        
        data.update({
            'email': hidden_email,
            'phone': '*********',
            'first_name': hidden_first_name,
            'last_name': hidden_last_name,
        })

        return Response(data)

class CandidateAddView(generics.CreateAPIView):
    serializer_class = serializers.CandidateAddSerializer

    def perform_create(self, serializer):
        email = serializer.validated_data.get('email')
        phone = serializer.validated_data.get('phone')
        if Candidates.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email jest już przypisany do istniejącego konta')
        if Candidates.objects.filter(phone=phone).exists():
            raise serializers.ValidationError('Numer telefonu jest już przypisany do kandydata')
        serializer.save()


class OffersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        page = self.request.GET.get('page', 1)

        per_page = 5
        offset = (int(page) - 1) * per_page

        queryset = (Candidates.objects
            .only('id', 'first_name', 'last_name')
            .prefetch_related('candidateprofessions_candidate__profession')
            .prefetch_related('candidateabilities_candidate__ability')
            .prefetch_related('favouritecandidates_candidate')
            .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=self.request.user, candidate_id=OuterRef('pk'))))
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
            result['first_name'] = candidate.first_name[0] + '*' * (len(candidate.first_name) - 1)
            result['last_name'] = candidate.last_name[0] + '*' * (len(candidate.last_name) - 1)

            email_parts = candidate.email.split('@')
            hidden_email = email_parts[0][0] + '*' * (len(email_parts[0]) - 1) + '@' + email_parts[1]
            result['email'] = hidden_email

            result['phone'] = '*********'
            result['favourite'] = candidate.favouritecandidates_candidate.exists()
            result['abilities'] = sorted([{'name': ability.ability.name, 'percentage': ability.percentage} for ability in candidate.candidateabilities_candidate.all()],
                   key=lambda x: x['percentage'], reverse=True)[:3]
            result['professions'] = [profession.profession.name for profession in candidate.candidateprofessions_candidate.all()]
            results.append(result)

        return Response({'count': total_count, 'results': results})


class SearchCandidateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        abilities = self.request.GET.get('a')
        professions = self.request.GET.get('p')
        page = self.request.GET.get('page', 1)

        per_page = 10
        offset = (int(page) - 1) * per_page

        queries = Q(is_verified=True)

        if abilities:     
            abilities_list = abilities.split(',')
            queries.add(Q(candidateabilities_candidate__ability__name__in=abilities_list), Q.AND)
        
        if professions:
            professions_list = professions.split(',')
            queries.add(Q(candidateprofessions_candidate__profession__name__in=professions_list), Q.AND)

        queryset = (Candidates.objects
            .only('id', 'first_name', 'last_name')
            .select_related('candidateprofessions_candidate__profession')
            .prefetch_related('candidateabilities_candidate__ability')
            .prefetch_related('favouritecandidates_candidate')
            .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=self.request.user, candidate_id=OuterRef('pk'))))
            .filter(Q(queries) & Q(is_purchased=False))
            .annotate(ids=Count('favouritecandidates_candidate__id'))
            .order_by('-ids'))

        total_count = len(queryset)

        results = []
        for candidate in queryset:
            result = {}
            result['id'] = candidate.id
            result['first_name'] = candidate.first_name[0] + '*' * (len(candidate.first_name) - 1)
            result['last_name'] = candidate.last_name[0] + '*' * (len(candidate.last_name) - 1)
            
            email_parts = candidate.email.split('@')
            hidden_email = email_parts[0][0] + '*' * (len(email_parts[0]) - 1) + '@' + email_parts[1]
            result['email'] = hidden_email

            result['phone'] = '*********'
            result['abilities'] = sorted([{'name': ability.ability.name, 'percentage': ability.percentage} for ability in candidate.candidateabilities_candidate.all()],
                   key=lambda x: x['percentage'], reverse=True)[:3]
            result['professions'] = candidate.candidateprofessions_candidate.role.name

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
        abilities = Abilities.objects.values_list('name', flat=True).annotate(ability_count=Count('name')).order_by('ability_count')
        professions = Professions.objects.values_list('name', flat=True).annotate(profession_count=Count('name')).order_by('profession_count')

        data = {
            'abilities': abilities,
            'professions': professions,
        }

        return Response(data)

class PurchaseOfferView(generics.CreateAPIView):
    serializer_class = serializers.PurchaseOfferSerializer

class PurchasedOffersListView(generics.ListAPIView):
    serializer_class = serializers.PurchasedOffersSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Candidates.objects.filter(purchasedoffers_candidate__employer_id=self.request.user)
        