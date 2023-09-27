from django.db import models

from apps.Auth.models import User


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


class Candidates(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=255, unique=True)
    birth_date = models.DateField()
    province = models.CharField(max_length=255)
    profession = models.CharField(max_length=100, null=True, choices=[
        ('sales', 'sales'),
        ('office_administration',
         'office_administration'),
        ('customer_service', 'customer_service')])
    abilities = models.ManyToManyField(Abilities, through='CandidateAbilities')
    salary_expectation = models.CharField(max_length=100, choices=[
        ('poniżej 3500 zł', 'poniżej 3500 zł'),
        ('od 3500 do 4500 zł', 'od 3500 do 4500 zł'),
        ('od 4501 do 5500 zł', 'od 4501 do 5500 zł'),
        ('od 5501 do 6500 zł', 'od 5501 do 6500 zł'),
        ('od 6501 do 10000 zł', 'od 6501 do 10000 zł'),
        ('powyżej 10000 zł', 'powyżej 10000 zł')])
    availability = models.CharField(max_length=255)
    job_position = models.CharField(max_length=100)
    experience_sales = models.IntegerField(default=0)
    experience_customer_service = models.IntegerField(default=0)
    experience_office_administration = models.IntegerField(default=0)
    education = models.CharField(max_length=255, choices=[
        ('wykształcenie średnie (posiadają osoby, które ukończyły liceum lub pokrewne)',
         'wykształcenie średnie (posiadają osoby, które ukończyły liceum lub pokrewne)'),
        ('wykształcenie wyższe (posiadają osoby, które uzyskały tytuł zawodowy licencjata, inżyniera, magistra lub magistra inżyniera, lub uzyskały stopień naukowy doktora)', 'wykształcenie wyższe (posiadają osoby, które uzyskały tytuł zawodowy licencjata, inżyniera, magistra lub magistra inżyniera, lub uzyskały stopień naukowy doktora)')])
    driving_license = models.BooleanField(default=False)
    has_job = models.BooleanField(default=False)
    is_visible = models.BooleanField(default=True)
    desc = models.TextField(null=True, blank=True)
    completed_surveys = models.JSONField(blank=True, null=True)
    contract_type = models.CharField(max_length=255, null=True, choices=[
        ('Umowa zlecenie / Umowa o dzieło)', 'Umowa zlecenie / Umowa o dzieło'),
        ('Umowa o pracę', 'Umowa o pracę'),
        ('Kontrakt B2B', 'Kontrakt B2B')])
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
        return '{} | {}% | {}'.format(
            self.pk,
            self.percentage,
            self.candidate.email
        )


class PurchasedOffers(models.Model):
    employer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='purchasedoffers_employer')
    candidate = models.ForeignKey(
        Candidates, on_delete=models.CASCADE, related_name='purchasedoffers_candidate')
    points = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Purchased offers'
        unique_together = [['employer', 'candidate']]

    def __str__(self):
        return '{} | {} | {}'.format(
            self.pk,
            self.created_at,
            self.points
        )


class Reports(models.Model):
    employer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='reports')
    candidate = models.ForeignKey(
        Candidates, on_delete=models.CASCADE, related_name='reports')
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Reports'

    def __str__(self):
        return '{} | {} | {}'.format(
            self.employer.email,
            self.candidate.email,
            self.created_at
        )


class Industries(models.Model):
    name = models.TextField()
    profession = models.CharField(max_length=100, null=True, choices=[
        ('sales', 'sales'),
        ('office_administration',
         'office_administration'),
        ('customer_service', 'customer_service')])


class CandidateIndustries(models.Model):
    candidate = models.ForeignKey(
        Candidates, on_delete=models.CASCADE, related_name='candidateindustries_candidate')
    industry = models.ForeignKey(
        Industries, on_delete=models.CASCADE, related_name='candidateindustries_industry')
