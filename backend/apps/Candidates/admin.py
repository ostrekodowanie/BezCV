from django.contrib import admin

from .models import Candidates, Abilities, CandidateAbilities

admin.site.register(Candidates)
admin.site.register(Abilities)
admin.site.register(CandidateAbilities)