from django.db import models
from django.contrib.auth.models import User
import datetime
import random


class ModuleModel(models.Model):
    module = models.CharField(unique=True, max_length=25)
    get = models.BooleanField(default=True)
    put = models.BooleanField(default=False)
    post = models.BooleanField(default=False)
    delete = models.BooleanField(default=False)
    register = models.DateField(auto_now_add=datetime.datetime.now())

    def __str__(self):
        return self.module

class AgentModel(models.Model):
    agent = models.ForeignKey(User, unique=True, related_name="recursiveAgentModel", on_delete=models.CASCADE)
    group = models.ForeignKey(ModuleModel, null=True, related_name="recursiveGroupModel",  on_delete=models.CASCADE)
    current_ip = models.CharField(max_length=15, default="0.0.0.0", null=True)
    last_connection = models.DateField(auto_now_add=datetime.datetime.now())
    dni = models.CharField(max_length=16, unique=True, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True, default="NoneAddress")
    inactive = models.BooleanField(default=False)
    secretKey = models.CharField(default=random.random().hex() + str(random.randint(1, 9999)), max_length=50, unique=True, null=False, blank=False)


class CodeFree(models.Model):
    agentnumber = models.ForeignKey(AgentModel, related_name="agentCode", on_delete=models.CASCADE, default="NoneAgent") #here not on delete Cascade
    code = models.CharField(max_length=50, unique=True) 