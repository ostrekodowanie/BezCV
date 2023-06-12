from django.db import models
from apps.Auth.models import User


class Codes(models.Model):
    code = models.CharField(max_length=255, unique=True)
    value = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
        
        
class UsedCodes(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='usedcodes_user')
    code = models.ForeignKey(
        Codes, on_delete=models.CASCADE, related_name='usedcodes_code')
    created_at = models.DateTimeField(auto_now_add=True)