from django.db import models

from apps.Auth.models import User
from apps.Candidates.models import Candidates

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