from rest_framework import serializers
from reservame.models import *
from rest_framework_mongoengine import serializers
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = 'id', 'email', 'name', 'password',

class PymeSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Pyme
        fields = 'all'

class AppointmentSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Appointment
        fields = 'all'

class UserClientSerializer(serializers.DocumentSerializer):
    class Meta:
        model = UserClient
        fields = 'all'

class BusinessLineSerializer(serializers.DocumentSerializer):
    class Meta: 
        model = BusinessLine
        fields = 'all'

class ProfessionistSerializer(serializers.DocumentSerializer):
    class Meta: 
        model = Professionist
        fields = 'id','name', 'last_name', 'phone_number', 'profile_image', 'email', 'calendar'


    # name = fields.StringField(max_length=50, required=True)
    # last_name = fields.StringField(max_length=50, default='')
    # phone_number = fields.StringField(max_length=50, default='')
    # profile_image = fields.URLField(default=' ')
    # email = fields.EmailField()
    # calendar = fields.DictField()
