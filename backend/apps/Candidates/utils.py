from django.db.models import Q, Exists, OuterRef

from .models import Candidates, PurchasedOffers

from itertools import chain

def get_candidate(user, candidate_slug, candidate_id):
    return (Candidates.objects
        .only('id', 'first_name', 'last_name', 'email', 'phone')
        .select_related('candidateroles_candidate__role')
        .prefetch_related('candidateabilities_candidate__ability')
        .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=user, candidate_id=OuterRef('pk'))))
        .get(Q(is_verified=True) & Q(slug=candidate_slug) & Q(id=candidate_id)))
    
def get_similar_candidates(user, role, abilities, candidate_id):
    similar_candidates = (Candidates.objects
        .only('id', 'slug', 'first_name', 'last_name')
        .select_related('candidateroles_candidate__role')
        .prefetch_related('candidateabilities_candidate__ability')
        .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=user, candidate_id=OuterRef('pk'))))
        .distinct()
        .filter(Q(is_verified=True) 
            & Q(is_purchased=False) 
            & Q(candidateroles_candidate__role__name=role) 
            & Q(candidateabilities_candidate__ability__name__in=abilities) 
            & ~Q(id=candidate_id))
        )[:5]

    if len(similar_candidates) < 5:
            remaining_count = 5 - len(similar_candidates)
            remaining_candidates = (Candidates.objects
                .only('id', 'slug', 'first_name', 'last_name')
                .select_related('candidateroles_candidate__role')
                .prefetch_related('candidateabilities_candidate__ability')
                .annotate(is_purchased=Exists(PurchasedOffers.objects.filter(employer=user, candidate_id=OuterRef('pk'))))
                .distinct()
                .filter(Q(is_verified=True) 
                    & Q(is_purchased=False) 
                    & ~Q(candidateroles_candidate__role__name=role) 
                    & Q(candidateabilities_candidate__ability__name__in=abilities) 
                    & ~Q(id=candidate_id))
                )[:remaining_count]
            similar_candidates = list(chain(similar_candidates, remaining_candidates))

    return similar_candidates