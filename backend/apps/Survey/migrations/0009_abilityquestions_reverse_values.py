# Generated by Django 4.1.4 on 2023-02-07 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Survey', '0008_alter_abilityquestions_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='abilityquestions',
            name='reverse_values',
            field=models.BooleanField(default=False),
        ),
    ]
