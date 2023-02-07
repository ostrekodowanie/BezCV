from django.db import models
from slugify import slugify

from apps.Auth.models import User


class Professions(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'Professions'

    def __str__(self):
        return '{} | {}'.format(
            self.pk,
            self.name
        )


class Candidates(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=255, unique=True)
    preferred_professions = models.ManyToManyField(Professions)
    salary_expectation = models.CharField(max_length=100, choices=[
                                                        ('mniej niż 2999 zł', 'mniej niż 2999 zł'), 
                                                        ('od 3000 zł do 3499 zł', 'od 3000 zł do 3499 zł'), 
                                                        ('od 3500 zł do 3999 zł', 'od 3500 zł do 3999 zł'), 
                                                        ('od 4000 zł do 4499 zł', 'od 4000 zł do 4499 zł'), 
                                                        ('od 4500 zł do 4999 zł', 'od 4500 zł do 4999 zł'), 
                                                        ('od 5000 zł do 5999 zł', 'od 5000 zł do 5999 zł'), 
                                                        ('powyżej 6000 zł', 'powyżej 6000 zł')])
    availability = models.CharField(max_length=255)
    job_position = models.CharField(max_length=100)
    experience_sales = models.IntegerField(default=0)
    experience_customer_service = models.IntegerField(default=0)
    experience_administration = models.IntegerField(default=0)
    education = models.CharField(max_length=100, choices=[
                                                ('Wykształcenie podstawowe', 'Wykształcenie podstawowe'), 
                                                ('Wykształcenie średnie', 'Wykształcenie średnie'), 
                                                ('Wykształcenie wyższe', 'Wykształcenie wyższe')])
    driving_license = models.BooleanField(default=False)
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
    percentage = models.DecimalField(max_digits=3, decimal_places=0, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Candidate abilities'
        unique_together = [['candidate', 'ability']]

    def __str__(self):
        return '{} | {}'.format(
            self.pk,
            self.percentage,
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



    