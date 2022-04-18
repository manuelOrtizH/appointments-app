from django.shortcuts import render
from rest_framework_mongoengine import viewsets
from reservame.serializers import PymeSerializer, AppointmentSerializer, UserCreateSerializer, UserClientSerializer
from reservame.models import Pyme, Appointment, UserAccount, UserClient
# Create your views here.

class UserAccountView(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = UserCreateSerializer

    def get_queryset(self):
        return UserAccount.objects.all()
class PymeView(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = PymeSerializer
    
    def get_queryset(self):
        return Pyme.objects.all()

class AppointmentView(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):
        return Appointment.objects.all()

class UserClientView(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = UserClientSerializer

    def get_queryset(self):
        return UserClient.objects.all()