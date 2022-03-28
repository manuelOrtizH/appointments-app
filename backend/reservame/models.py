from django.db import models
# from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Pyme(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=255)
    # phone_number = PhoneNumber.from_string(phone_number = raw_phone, region='MX').as_e164
    employees = models.IntegerField()
    business_line = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name}'
class Professionist(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField()
    company = models.ForeignKey(Pyme, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class User(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField()
    # phone_number = PhoneNumber.from_string(phone_number = raw_phone, region='MX').as_e164

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Appointment(models.Model):    
    date = models.DateTimeField(auto_now=True) 
    reason = models.CharField(max_length=255)
    company = models.ForeignKey(Pyme, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    professionist = models.ForeignKey(Professionist, on_delete=models.CASCADE)
    completed = models.BooleanField(default = False)

    def __str__(self):
        return f'Fecha: {self.date} \n Razon: {self.reason} \n Paciente: {self.user.first_name} {self.user.last_name}'

class BeautyShop(models.Model):
    style_type = models.CharField(max_length=20)
    hair_type = models.CharField(max_length=20)
    hair_treatment = models.CharField(max_length=20)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)

    def __str__(self):
        return f'''Cita de estetica con siguientes atributos: \n
                   Tipo de estilo: {self.style_type} \n Tipo de pelo: {self.hair_type} \n
                   Tratamiento: {self.hair_treatment}'''


class Veterinary(models.Model):
    pet_name = models.CharField(max_length=20)
    animal = models.CharField(max_length=20)
    pet_age = models.IntegerField()
    #Should be a file update
    pet_medical_history = models.CharField(max_length=10)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)

    def __str__(self):
        return f'''Cita de veterinaria con siguientes atributos: \n
                   Mascota: {self.pet_name} \n Edad: {self.pet_age}'''


