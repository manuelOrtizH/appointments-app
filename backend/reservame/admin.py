from django.contrib import admin
from reservame.models import Appointment, Pyme, Professionist, User

# Register your models here.
admin.site.register(Appointment)
admin.site.register(Pyme)
admin.site.register(Professionist)
admin.site.register(User)