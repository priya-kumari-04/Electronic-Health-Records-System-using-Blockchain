# Generated by Django 4.0.2 on 2022-02-21 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_patient'),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('docID', models.CharField(max_length=100)),
                ('patID', models.CharField(max_length=100)),
            ],
        ),
    ]
