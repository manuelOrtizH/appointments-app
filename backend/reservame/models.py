from django.db import models
# from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Professionist(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return f'{first_name} {last_name}'
class Appointment(models.Model):    
    date = models.DateTimeField(auto_now=True) 
    reason = models.CharField(max_length=255)
class User(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField()
    # phone_number = PhoneNumber.from_string(phone_number = raw_phone, region='MX').as_e164
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)

    def __str__(self):
        return f'{first_name} {last_name}'

class Pyme(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=255)
    # phone_number = PhoneNumber.from_string(phone_number = raw_phone, region='MX').as_e164
    employees = models.IntegerField()
    business_line = models.CharField(max_length=50)
    professionist = models.ForeignKey(Professionist, on_delete=models.CASCADE)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)

    def __str__(self):
        return f'{name}'




