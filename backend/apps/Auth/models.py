from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(max_length=255, unique=True)
    nip = models.CharField(max_length=255, unique=True)
    points = models.DecimalField(decimal_places=0, max_digits=100, default=10)
    password = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)

    username = models.CharField(max_length=255, null=True, blank=True, unique=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name_plural = 'Employers'

    def __str__(self):
        return '{} - {}'.format(
            self.pk,
            self.email,
        )