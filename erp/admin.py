from django.contrib import admin
from .models import AgentModel, ModuleModel, CodeFree

# Register your models here.

@admin.register(AgentModel)
class AgentAdmin(admin.ModelAdmin):
    pass


@admin.register(ModuleModel)
class Module(admin.ModelAdmin):
    pass

@admin.register(CodeFree)
class Module(admin.ModelAdmin):
    pass
