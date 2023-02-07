# Generated by Django 4.1.4 on 2023-02-05 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Candidates', '0004_professions_remove_candidates_salary_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidates',
            name='education',
            field=models.IntegerField(choices=[('Wykształcenie podstawowe', 'Wykształcenie podstawowe'), ('Wykształcenie średnie', 'Wykształcenie średnie'), ('Wykształcenie wyższe', 'Wykształcenie wyższe')]),
        ),
        migrations.AlterField(
            model_name='candidates',
            name='salary_expectation',
            field=models.IntegerField(choices=[('mniej niż 2999 zł', 'mniej niż 2999 zł'), ('od 3000 zł do 3499 zł', 'od 3000 zł do 3499 zł'), ('od 3500 zł do 3999 zł', 'od 3500 zł do 3999 zł'), ('od 4000 zł do 4499 zł', 'od 4000 zł do 4499 zł'), ('od 4500 zł do 4999 zł', 'od 4500 zł do 4999 zł'), ('od 5000 zł do 5999 zł', 'od 5000 zł do 5999 zł'), ('powyżej 6000 zł', 'powyżej 6000 zł')]),
        ),
    ]
