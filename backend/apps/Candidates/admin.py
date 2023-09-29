from django.contrib import admin

from .models import (
    Abilities,
    CandidateAbilities,
    CandidateIndustries,
    Candidates,
    Industries,
    PurchasedOffers,
)

admin.site.register(Candidates)
admin.site.register(Abilities)
admin.site.register(PurchasedOffers)
admin.site.register(CandidateAbilities)
admin.site.register(Industries)
admin.site.register(CandidateIndustries)
