from django.contrib import admin

from .models import Codes, UsedCodes

admin.site.register(Codes)
admin.site.register(UsedCodes)