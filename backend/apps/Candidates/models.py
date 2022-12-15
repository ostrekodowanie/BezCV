from django.db import models
from django.template.defaultfilters import slugify

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
        if not self.slug:
            self.slug = '-'.join((slugify(self.first_name), slugify(self.last_name), slugify(self.pk)))
            self.save()

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
        Candidates, on_delete=models.CASCADE, related_name='candidates')
    ability = models.ForeignKey(
        Abilities, on_delete=models.CASCADE, related_name='abilities')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'CandidateAbilities'
        unique_together = [['candidate', 'ability']]

    def __str__(self):
        return '{}'.format(
            self.pk,
        )
    