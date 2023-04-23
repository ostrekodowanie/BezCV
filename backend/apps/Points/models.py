from django.db import models
from django.urls import reverse

from apps.Auth.models import User

class Orders(models.Model):
    buyer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='purchasedpoints_employer')
    tokens = models.DecimalField(max_digits=3, decimal_places=0)
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    order_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Orders'
