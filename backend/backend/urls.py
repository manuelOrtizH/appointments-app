"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from reservame import views
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register(r'pymes', views.PymeView, 'pyme')
router.register(r'appointments', views.AppointmentView, 'appointment')
router.register(r'user_accounts', views.UserAccountView, 'user_account')
router.register(r'users_clients', views.UserClientView, 'user_client')
router.register(r'business_lines', views.BusinessLineView, 'business_line')
router.register(r'professionists', views.ProfessionistView, 'professionist')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]


