from django.contrib import admin

from .models import Candidates, Abilities, CandidateAbilities, PurchasedOffers, Professions

admin.site.register(Candidates)
admin.site.register(Abilities)
admin.site.register(PurchasedOffers)
admin.site.register(Professions)
admin.site.register(CandidateAbilities)
