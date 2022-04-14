from django.shortcuts import render
from rest_framework_mongoengine import viewsets
# from reservame.serializers import PymeSerializer, AppointmentSerializer
# from reservame.models import Pyme, Appointment
# Create your views here.
# class PymeView(viewsets.ModelViewSet):
#     lookup_field = 'id'
#     serializer_class = PymeSerializer
    
#     def get_queryset(self):
#         return Pyme.objects.all()

# class AppointmentView(viewsets.ModelViewSet):
#     lookup_field = 'id'
#     serializer_class = AppointmentSerializer
    
#     def get_queryset(self):
#         return Appointment.objects.all()