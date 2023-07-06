from django.db import models

from apps.Auth.models import User


class Orders(models.Model):
    buyer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='purchasedpoints_employer')
    tokens = models.IntegerField()
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    order_id = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expiration_date = models.DateTimeField()
    remaining_tokens = models.IntegerField()

    class Meta:
        verbose_name_plural = 'Orders'
