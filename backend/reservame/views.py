from django.shortcuts import render
from rest_framework import viewsets
from reservame.serializers import AppointmentSerializer, PymeSerializer, ProfessionistSerializer, UserSerializer, BeautyShopSerializer, VeterinarySerializer
from reservame.models import Appointment, Pyme, Professionist, User, Veterinary, BeautyShop
# Create your views here.
class AppointmentView(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

class PymeView(viewsets.ModelViewSet):
    serializer_class = PymeSerializer
    queryset = Pyme.objects.all()

class ProfessionistView(viewsets.ModelViewSet):
    serializer_class = ProfessionistSerializer
    queryset = Professionist.objects.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class BeautyShopView(viewsets.ModelViewSet):
    serializer_class = BeautyShopSerializer
    queryset = BeautyShop.objects.all() 

class VeterinaryView(viewsets.ModelViewSet):
    serializer_class = VeterinarySerializer
    queryset = Veterinary.objects.all()