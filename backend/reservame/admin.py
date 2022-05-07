from django.contrib import admin
from reservame.models import *

# Register your models here.

admin.register(Pyme)
# class PymeAdmin(admin.ModelAdmin):
#     pass

admin.register(Appointment)
# class AppointmentAdmin(admin.ModelAdmin):
#     pass

admin.register(Professionist)
# class ProfessionistAdmin(admin.ModelAdmin):
#     pass

admin.register(BusinessLine)
# class BusinessLineAdmin(admin.ModelAdmin):
#     pass

admin.register(UserClient)
# class UserClientAdmin(admin.ModelAdmin):
#     pass

admin.register(UserAccount)
# class UserAccountAdmin(admin.ModelAdmin):
#     pass