from django.contrib import admin

from .models import Candidates, Abilities, CandidateAbilities, PurchasedOffers

admin.site.register(Candidates)
admin.site.register(Abilities)
admin.site.register(CandidateAbilities)
admin.site.register(PurchasedOffers)