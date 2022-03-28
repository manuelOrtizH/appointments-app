from django.contrib import admin
from reservame.models import Appointment, Pyme, Professionist, User, Appointment_info, Veterinary, BeautyShop

# Register your models here.
admin.site.register(Appointment)
admin.site.register(Pyme)
admin.site.register(Professionist)
admin.site.register(User)
admin.site.register(Appointment_info)
admin.site.register(Veterinary)
admin.site.register(BeautyShop)