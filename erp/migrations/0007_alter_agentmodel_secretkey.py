# Generated by Django 5.0.7 on 2024-08-03 08:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0006_agentmodel_secretkey'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agentmodel',
            name='secretKey',
            field=models.CharField(default='0x1.642e9e879dde8p-49479', max_length=50, unique=True),
        ),
    ]
