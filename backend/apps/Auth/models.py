from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField


class User(AbstractUser):
    company_name = models.CharField(max_length=255, blank=True, null=True)
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(max_length=255, unique=True)
    desc = models.CharField(max_length=255, blank=True, null=True)
    form = models.JSONField(blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    nip = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)
    
    points = models.IntegerField(default=10000)

    username = models.CharField(max_length=255, null=True, blank=True, unique=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name_plural = 'Employers'

    def __str__(self):
        return '{} - {} - {}'.format(
            self.pk,
            self.company_name,
            self.email,
        )