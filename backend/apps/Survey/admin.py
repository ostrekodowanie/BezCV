from django.contrib import admin

from .models import Questions, CandidateAnswers, GeneratedCodes, AbilityQuestions, Categories

admin.site.register(Categories)
admin.site.register(Questions)
admin.site.register(CandidateAnswers)
admin.site.register(GeneratedCodes)
admin.site.register(AbilityQuestions)