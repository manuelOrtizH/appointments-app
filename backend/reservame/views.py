from django.shortcuts import render
from rest_framework_mongoengine import viewsets
from reservame.serializers import *
from reservame.models import *
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

class BusinessLineView(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = BusinessLineSerializer

    def get_queryset(self):
        return BusinessLine.objects.all()

class ProfessionistView(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = ProfessionistSerializer

    def get_queryset(self):
        return Professionist.objects.all()