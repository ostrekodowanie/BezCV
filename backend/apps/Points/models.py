from django.db import models

from apps.Auth.models import User

class PaymentDetails(models.Model):
    employer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='purchasedpoints_employer')
    amount = models.DecimalField(max_digits=3, decimal_places=0)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Payment Details'

    def __str__(self):
        return '{} | {} | {}'.format(
            self.pk,
            self.amount,
            self.price,
        )
