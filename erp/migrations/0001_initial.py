# Generated by Django 5.0.7 on 2024-08-15 11:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ModuleModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('module', models.CharField(max_length=25, unique=True)),
                ('get', models.BooleanField(default=True)),
                ('put', models.BooleanField(default=False)),
                ('post', models.BooleanField(default=False)),
                ('delete', models.BooleanField(default=False)),
                ('register', models.DateField(auto_now_add=True)),
            ],
            options={
                'db_table': 'erp_Modules',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='AgentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current_ip', models.CharField(default='0.0.0.0', max_length=15, null=True)),
                ('last_connection', models.DateTimeField(auto_now_add=True)),
                ('dni', models.CharField(blank=True, max_length=16, null=True)),
                ('address', models.CharField(blank=True, default='NoneAddress', max_length=50, null=True)),
                ('inactive', models.BooleanField(default=False)),
                ('secretKey', models.CharField(default='0x1.f71748e450e64p-23728', max_length=50, unique=True)),
                ('agent', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='recursiveAgentModel', to=settings.AUTH_USER_MODEL)),
                ('group', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recursiveGroupModel', to='erp.modulemodel')),
            ],
            options={
                'db_table': 'erp_Agents',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='CodeFree',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=50, unique=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('agentnumber', models.ForeignKey(default='NoneAgent', on_delete=django.db.models.deletion.CASCADE, related_name='agentCode', to='erp.agentmodel')),
            ],
            options={
                'db_table': 'erp_Codefree',
                'managed': True,
            },
        ),
    ]
