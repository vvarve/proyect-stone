# Generated by Django 5.0.7 on 2024-08-04 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('erp', '0009_alter_agentmodel_last_connection_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agentmodel',
            name='current_ip',
            field=models.CharField(default='0.0.0.0', max_length=15),
        ),
        migrations.AlterField(
            model_name='agentmodel',
            name='secretKey',
            field=models.CharField(default='0x1.7b9d66d1c8422p-25931', max_length=50, unique=True),
        ),
    ]
