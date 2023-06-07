from django.contrib import admin

from .models import Questions, CandidateAnswers, VerifyCodes, AbilityQuestions, Categories

admin.site.register(Categories)
admin.site.register(Questions)
admin.site.register(CandidateAnswers)
admin.site.register(VerifyCodes)
admin.site.register(AbilityQuestions)