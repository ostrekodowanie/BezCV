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
    profession = models.CharField(max_length=100, choices=[
                                                        ('Sales', 'Sales'), 
                                                        ('Office administration', 'Office administration'), 
                                                        ('Customer service', 'Customer service')])
    preferred_profession = models.CharField(max_length=100, choices=[
                                                        ('Sales', 'Sales'), 
                                                        ('Office administration', 'Office administration'), 
                                                        ('Customer service', 'Customer service')])
    abilities = models.ManyToManyField(Abilities, through='CandidateAbilities')
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
    experience_office_administration = models.IntegerField(default=0)
    education = models.CharField(max_length=255, choices=[ 
                                                ('wykształcenie średnie (posiadają osoby, które ukończyły liceum lub pokrewne)', 'wykształcenie średnie (posiadają osoby, które ukończyły liceum lub pokrewne)'), 
                                                ('wykształcenie wyższe (posiadają osoby, które na studiach wyższych (I, II lub III stopnia) uzyskały tytuł zawodowy licencjata, inżyniera, magistra lub magistra inżyniera, lub uzyskały stopień naukowy doktora)', 'wykształcenie wyższe (posiadają osoby, które na studiach wyższych (I, II lub III stopnia) uzyskały tytuł zawodowy licencjata, inżyniera, magistra lub magistra inżyniera, lub uzyskały stopień naukowy doktora)')])
    driving_license = models.BooleanField(default=False)
    is_visible = models.BooleanField(default=False)
    desc = models.TextField(null=True, blank=True)
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
        return '{} | {}'.format(
            self.pk,
            self.created_at
        )



    