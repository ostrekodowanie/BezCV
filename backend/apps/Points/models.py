from django.db import models

from apps.Auth.models import User

class PaymentDetails(models.Model):
    employer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='purchasedpoints_employer')
    amount = models.DecimalField(max_digits=3, decimal_places=0)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    currency = models.CharField(max_length=3, default='PLN')
    payu_order_id = models.CharField(max_length=100, blank=True)
    payu_status = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Payment Details'

    def __str__(self):
        return f'{self.employer.email}, {self.employer.phone} | {self.amount} | {self.price} {self.currency}'
