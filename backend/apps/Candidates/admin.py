from django.contrib import admin

from .models import Candidates, Abilities, CandidateAbilities, PurchasedOffers, Industries, CandidateIndustries

admin.site.register(Candidates)
admin.site.register(Abilities)
admin.site.register(PurchasedOffers)
admin.site.register(CandidateAbilities)
admin.site.register(Industries)
admin.site.register(CandidateIndustries)
