
#------------- FINALLY LOGIC OF BACKEND ----------------#
#             -           VIEWS        -                #
#-------------------------------------------------------#
import os
from dotenv import load_dotenv
import jwt
import requests

#IMPORT SERIALIZERS METHOS AND MODELS FROM DOCUMENT FOR NOT REPEAT
from erp.serializers import ( AgentModel, ModuleModel,
PrincipalAgentSerializer, PrincipalModuleSerializer, PrincipalUserSerializer, MyTokenObtainPairSerializer, PrincipalCodeSerializer, CodeFree)
from django.contrib.auth.models import User

#IMPORT PERMISSION OR AUTHENTICATION VERIFY
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated


#IMPORT UTILS FOR GETTING AND  GIVE DATA
from rest_framework import response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes

load_dotenv()

RES = response.Response

def getInformation(func_ext):
    def func_intern(self, request):
            payload = jwt.decode(request.META.get('HTTP_AUTHORIZATION').split(" ")[1], key= os.getenv('SECRET_KEY'), algorithms=["HS256"])
            if payload["conditions"]["get"] or payload["staff"] or payload["superuser"] or payload["active"]:
                agentip = AgentModel.objects.filter(id = payload["user_id"]).first()
                if agentip.current_ip == requests.get('https://api.ipify.org?format=json').json()["ip"]:
                    return_function = func_ext(self, request)
                    if return_function:
                        return RES(return_function, status= status.HTTP_200_OK)
                    return RES({"message": "Bad data request"}, status= status.HTTP_400_BAD_REQUEST)
                return RES({"message": "unauthorized", "errorchangeip": "changed"}, status= status.HTTP_401_UNAUTHORIZED)
            return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
        
    return func_intern


def postInformation(func_ext):
    def func_intern(self, request):
                payload = jwt.decode(request.META.get('HTTP_AUTHORIZATION').split(" ")[1], key= os.getenv('SECRET_KEY'), algorithms=["HS256"])
                if payload["active"]:
                    agentip = AgentModel.objects.filter(id = payload["user_id"]).first()
                    if agentip.current_ip == requests.get('https://api.ipify.org?format=json').json()["ip"]:
                        if payload["conditions"]["post"] and payload["staff"] or payload["superuser"]:
                            return_function = func_ext(self, request)
                            if return_function["success"]:
                                return RES(return_function, status= status.HTTP_200_OK)
                            return RES(return_function, status= status.HTTP_400_BAD_REQUEST)
                        return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
                    return RES({"message": "unauthorized", "errorchangeip": "changed"}, status= status.HTTP_401_UNAUTHORIZED)
                return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
        
    return func_intern


def putInformation(func_ext):
    def func_intern(self, request, pk):
            payload = jwt.decode(request.META.get('HTTP_AUTHORIZATION').split(" ")[1], key= os.getenv('SECRET_KEY'), algorithms=["HS256"])
            if payload["active"]:
                agentip = AgentModel.objects.filter(id = payload["user_id"]).first()
                if agentip.current_ip == requests.get('https://api.ipify.org?format=json').json()["ip"]:
                    if payload["conditions"]["put"] and payload["staff"] or payload["superuser"]:
                        return_function = func_ext(self, request, pk)
                        if return_function["success"]:
                            return RES(return_function, status= status.HTTP_200_OK)
                        return RES(return_function, status= status.HTTP_400_BAD_REQUEST)
                    return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
                return RES({"message": "unauthorized", "errorchangeip": "changed"}, status= status.HTTP_401_UNAUTHORIZED)
            return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
    return func_intern

def deleteInformationClass(func_ext):
    def func_intern(self,  request, pk):
            payload = jwt.decode(request.META.get('HTTP_AUTHORIZATION').split(" ")[1], key= os.getenv('SECRET_KEY'), algorithms=["HS256"])
            if payload["active"]:
                agentip = AgentModel.objects.filter(id = payload["user_id"]).first()
                if agentip.current_ip == requests.get('https://api.ipify.org?format=json').json()["ip"]:
                    if payload["conditions"]["delete"] and payload["staff"] or payload["superuser"]:
                        return_function = func_ext(self, request, pk)   
                        if return_function["success"]:
                            return RES(return_function, status= status.HTTP_200_OK)
                        return RES(return_function, status= status.HTTP_400_BAD_REQUEST)
                    return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
                return RES({"message": "unauthorized", "errorchangeip": "changed"}, status= status.HTTP_401_UNAUTHORIZED)
            return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
    return func_intern

def deleteInformationFunction(func_ext):
    def func_intern(request, pk):
            payload = jwt.decode(request.META.get('HTTP_AUTHORIZATION').split(" ")[1], key= os.getenv('SECRET_KEY'), algorithms=["HS256"])
            if payload["active"]:
                agentip = AgentModel.objects.filter(id = payload["user_id"]).first() 
                if agentip.current_ip == requests.get('https://api.ipify.org?format=json').json()["ip"]:             
                    if payload["conditions"]["delete"] and payload["staff"] or payload["superuser"]:
                        return_function = func_ext(request, pk)   
                        if return_function["success"]:
                            return RES(return_function, status= status.HTTP_200_OK)
                        return RES(return_function, status= status.HTTP_400_BAD_REQUEST)
                    return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
                return RES({"message": "unauthorized", "errorchangeip": "changed"}, status= status.HTTP_401_UNAUTHORIZED)
            return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
    return func_intern


def getInformationId(func_ext):
    def func_intern(self, request, pk):
            payload = jwt.decode(request.META.get('HTTP_AUTHORIZATION').split(" ")[1], key= os.getenv('SECRET_KEY'), algorithms=["HS256"])
            if payload["active"]:
                agentip = AgentModel.objects.filter(id = payload["user_id"]).first()
                if agentip.current_ip == requests.get('https://api.ipify.org?format=json').json()["ip"]:
                    if payload["conditions"]["delete"] or payload["staff"] or payload["superuser"] or payload["active"]:
                        return_function = func_ext(self, request, pk)
                        if return_function:
                            return RES(return_function, status= status.HTTP_200_OK)
                        return RES(return_function, status= status.HTTP_400_BAD_REQUEST)
                    return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
                return RES({"message": "unauthorized", "errorchangeip": "changed"}, status= status.HTTP_401_UNAUTHORIZED)
            return RES({"message": "unauthorized"}, status= status.HTTP_401_UNAUTHORIZED)
    return func_intern




class TokenPeronalizedView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserViewsAdmin(APIView):
    # permission_classes = (IsAuthenticated,)

    @getInformation
    def get(self, request):
        user_orm_get = User.objects.all()
        if user_orm_get:
            self.user_orm_serializer = PrincipalUserSerializer(user_orm_get, many = True)
            return self.user_orm_serializer.data
    
    @postInformation
    def post(self, request):
        if request.data:
            data_serializer = PrincipalUserSerializer(data= request.data)
            if data_serializer.is_valid():
                data_serializer.save()
                data = {"success": "user created!"}
                return data
            return data_serializer.errors

class UserViewSpecificAdmin(APIView):
    permission_classes = (IsAuthenticated,) 

    @getInformationId
    def get(self, request, pk):
        get_one_user = User.objects.filter(id = pk).first()
        if get_one_user:
            self.return_user = PrincipalUserSerializer(get_one_user)
            return self.return_user.data
    
    @putInformation
    def put(self, request, id):
        if request.data and id > 0:
            get_one_user = User.objects.filter(id = id).first()
            data_serializer = PrincipalUserSerializer(get_one_user, request.data)
            if data_serializer.is_valid():
                data_serializer.save()
                data = {"success": "User Modified!"}
                return data
            return data_serializer.errors
    

    @deleteInformationClass
    def delete(self, request, pk):
        if pk > 0:
            delete_user = User.objects.filter(id = pk).first()
            delete_errors = {"message": "error"}
            if delete_user:
                delete_user.delete() ### ISUE WITH MODEL DELETE OR DEF(DELETE) WITH TYPERROR
                deleted = {"success": "Agent deleted!"}
                return deleted
            return delete_errors
    
class ModuleViewsAdmin(APIView):
    permission_classes = (IsAuthenticated,)

    @getInformation
    def get(self, request):
        module_orm_get = ModuleModel.objects.all()
        if module_orm_get:
            self.module_orm_serializer = PrincipalModuleSerializer(module_orm_get, many = True)
            return self.module_orm_serializer.data
        
    @postInformation
    def post(self, request):
        if request.data:
            data_serializer = PrincipalModuleSerializer(data= request.data)
            if data_serializer.is_valid():
                data_serializer.save()
                data = {"success": "Module created!"}
                return data
            return data_serializer.errors
        
class ModuleViewSpecificAdmin(APIView):
    permission_classes = (IsAuthenticated,)

    @getInformationId
    def get(self, request, pk):
        get_one_user = ModuleModel.objects.filter(id = pk).first()
        if get_one_user:
            get_module_serializer = PrincipalModuleSerializer(get_one_user)
            return get_module_serializer.data


    @putInformation
    def put(self, request, pk):
        if pk > 0:
            get_one_module = ModuleModel.objects.filter(id = pk).first()
            data_serializer = PrincipalModuleSerializer(get_one_module, request.data)
            if data_serializer.is_valid():
                data_serializer.save()
                data = {"success": "Module Modified!"}
                return data
            return data_serializer.errors
        
    @deleteInformationClass # ISSUE Module Model field interference with Object.delete() and return Typerror Boolean
    def delete(self, request, pk):
            delete_user = ModuleModel.objects.get(id = pk)
            deleted_error = {"message": "error"}
            if delete_user:
                delete_user.delete()
                deleted = {"success" : "complete!"}
                return deleted
            return deleted_error


@api_view(["DELETE"])
@deleteInformationFunction
@permission_classes([IsAuthenticated])
def delete_view(request, pk=None):
        
        if request.method == "DELETE":
            delete_user = ModuleModel.objects.filter(id = pk)
            deleted_error = {"message": "error"}
            if delete_user:
                delete_user.delete()
                deleted_succefully = {"success" : "complete!"}
                return deleted_succefully
            return deleted_error
           
class AgentsViewAdmin(APIView):
    permission_classes = (IsAuthenticated,)

    @getInformation
    def get(self, request):
        agent_orm_get = AgentModel.objects.all()
        if agent_orm_get:
            self.agent_orm_serializers = PrincipalAgentSerializer(agent_orm_get, many = True)
            return self.agent_orm_serializers.data
        
    @postInformation  
    def post(self, request):
        if request.data:
            data_serializer = PrincipalAgentSerializer(data= request.data)
            if data_serializer.is_valid():
                data_serializer.save()
                data = {"success": "user created!"}
                return data
            return data_serializer.errors

class AgentViewSpecificAdmin(APIView):
    permission_classes = (IsAuthenticated,) 
    
    @getInformationId
    def get(self, request, pk):
        get_one_user = AgentModel.objects.filter(id = pk).first()
        if get_one_user:
            return_user = PrincipalAgentSerializer(get_one_user)
            return return_user.data


    @putInformation
    def put(self, request, pk):
        if pk > 0:
            get_one_module = AgentModel.objects.filter(id = pk).first()
            data_serializer = PrincipalAgentSerializer(get_one_module, request.data)
            if data_serializer.is_valid():
                data_serializer.save()
                data = {"success": "Agent Modified!"}
                return data
            return data_serializer.errors
    

    @deleteInformationClass
    def delete(self, request, pk):
        if pk > 0:
            delete_user = AgentModel.objects.filter(id = pk).first()
            delete = {"message": "error"}
            if delete_user:
                delete_user.delete()
                delete = {"success": "Agent deleted!"}
                return delete
            return delete

class PrincipalCodeSerializer(APIView):
    permission_classes = (IsAuthenticated,)

    @postInformation
    def post(self, request):
        if request.data:
            data_serializer = PrincipalCodeSerializer(data= request.data)
            if data_serializer.is_valid():
                data_serializer.save()
                data = {"success": "user created!"}
                return data
            return data_serializer.errors