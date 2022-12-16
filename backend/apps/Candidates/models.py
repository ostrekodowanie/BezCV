from django.db import models
from django.template.defaultfilters import slugify, stringformat

from apps.Auth.models import User

class Candidates(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=255, unique=True)
    is_verified = models.BooleanField(default=False)
    slug = models.SlugField(unique=True, blank=True)
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
        super(Candidates, self).save(*args, **kwargs)
        
        self.slug = '-'.join((slugify(self.first_name), slugify(self.last_name), slugify(self.pk)))
        super().save(*args, **kwargs)

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

class FavouriteCandidates(models.Model):
    employer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='favouritecandidates_employer')
    candidate = models.ForeignKey(
        Candidates, on_delete=models.CASCADE, related_name='favouritecandidates_candidate')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Favourite Candidates'
        unique_together = [['employer', 'candidate']]

    def __str__(self):
        return '{}'.format(
            self.pk,
        )
        


    