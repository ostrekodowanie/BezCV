# Generated by Django 4.1.4 on 2023-02-07 00:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Candidates', '0007_alter_candidates_education_and_more'),
        ('Survey', '0007_generatedcodes_abilityquestions'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='abilityquestions',
            unique_together={('question', 'ability')},
        ),
    ]
