from rest_framework_simplejwt.views import (TokenRefreshView,)
from django.urls import path
from erp.views import (AgentsViewAdmin, 
                       ModuleViewsAdmin, 
                       UserViewsAdmin,
                       UserViewSpecificAdmin,
                       AgentViewSpecificAdmin,
                       ModuleViewSpecificAdmin,
                       TokenPeronalizedView,
                       delete_view,)

urlpatterns = [

    #Authentication and Authorization logic
    path('t/', TokenPeronalizedView.as_view(), name='token_obtain_pair'), #login
    path('t/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # refresh token


    # VIEWS

    # ----- > USERS
    path("ua", UserViewsAdmin.as_view(), name="AllUsers"),
    path("ua/<int:pk>", UserViewSpecificAdmin.as_view(), name="SpecificUser"),

    # ------ > AGENTS
    path("agents", AgentsViewAdmin.as_view(), name="AllAgents"),
    path("agents/<int:pk>", AgentViewSpecificAdmin.as_view(), name="SpecificAgent"),

    #M------- > MODULES
    path("modules", ModuleViewsAdmin.as_view(), name="AllModules"),
    path("modules/del/<int:pk>",delete_view, name="SpecificModules"),
    path("modules/<int:pk>", ModuleViewSpecificAdmin.as_view(), name="SpecificModulesRouter"),
]