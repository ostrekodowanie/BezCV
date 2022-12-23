from django.db import models
from slugify import slugify

from apps.Auth.models import User

class Candidates(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=255, unique=True)
    salary = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)
    slug = models.SlugField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Candidates'

    def __str__(self):
        return '{} | {} | {}'.format(
            self.pk,
            self.email,
            self.phone,
        )

    def save(self, *args, **kwargs):        
        self.slug = '-'.join((slugify(self.first_name), slugify(self.last_name)))
        super(Candidates, self).save(*args, **kwargs)

class Roles(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Roles'

    def __str__(self):
        return '{} | {}'.format(
            self.pk,
            self.name,
        )

class CandidateRoles(models.Model):
    candidate = models.OneToOneField(
        Candidates, on_delete=models.CASCADE, related_name='candidateroles_candidate', unique=True)
    role = models.ForeignKey(
        Roles, on_delete=models.CASCADE, related_name='candidateroles_ability')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Candidate roles'
        unique_together = [['candidate', 'role']]

    def __str__(self):
        return '{}'.format(
            self.pk,
        )

class Abilities(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Abilities'

    def __str__(self):
        return '{} | {}'.format(
            self.pk,
            self.name,
        )

class CandidateAbilities(models.Model):
    candidate = models.ForeignKey(
        Candidates, on_delete=models.CASCADE, related_name='candidateabilities_candidate')
    ability = models.ForeignKey(
        Abilities, on_delete=models.CASCADE, related_name='candidateabilities_ability')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Candidate abilities'
        unique_together = [['candidate', 'ability']]

    def __str__(self):
        return '{}'.format(
            self.pk,
        )

class PurchasedOffers(models.Model):
    employer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='purchasedoffers_employer')
    candidate = models.ForeignKey(
        Candidates, on_delete=models.CASCADE, related_name='purchasedoffers_candidate')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Purchased offers'
        unique_together = [['employer', 'candidate']]

    def __str__(self):
        return '{}'.format(
            self.pk,
        )
        


    