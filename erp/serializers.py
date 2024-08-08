from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from erp.models import AgentModel, ModuleModel, CodeFree
from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer): #Change the information Json WEB Token
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print()
        group = str(AgentModel.objects.filter(agent = user.id).first().group)
        allow = ModuleModel.objects.filter(module = group).first()
        # Add custom claims
        token['username'] = user.username
        token["email"] = user.email
        token["group"] = group
        token["staff"] = user.is_staff
        token["active"] = user.is_active
        token["superuser"] = user.is_superuser
        token["conditions"] = {"get" : allow.get, "put": allow.put, "post": allow.post, "delete": allow.delete}
        # ...

        return token


class PrincipalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    
    def create(self, data): #Generate a password encrypt to data
        _password = User(**data)
        _password.set_password(data["password"])
        _password.save()
        return _password
    
    def update(self, instance, data): #Generate a password encrypt from data
        _password = super().update(instance, data)
        _password.set_password(data["password"])
        _password.save()
        return _password


class PrincipalAgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentModel
        fields = "__all__"

    def to_representation(self, instance): #change the way of presentation data into Json
        return {
            "id": instance.id,
            "current_ip": instance.current_ip,
            "last_connection": instance.last_connection,
            "dni": instance.dni,
            "address": instance.address,
            "inactive": instance.inactive,
            "secretKey": instance.secretKey,
            "agent": instance.agent.username,
            "group": None if not instance.group else instance.group.module
        }


class PrincipalModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleModel
        fields = "__all__"


class PrincipalCodeSerializer(serializers.ModelField):
    class Meta:
        Model = CodeFree
        fields = "__all__"