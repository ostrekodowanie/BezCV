# Generated by Django 4.1.7 on 2023-06-07 13:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Survey', '0009_remove_generatedcodes_candidate_generatedcodes_phone'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='GeneratedCodes',
            new_name='VerifyCodes',
        ),
        migrations.AlterModelOptions(
            name='verifycodes',
            options={'verbose_name_plural': 'Verify codes'},
        ),
    ]
