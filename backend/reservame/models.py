from django.db import models
from mongoengine import Document, EmbeddedDocument, fields, CASCADE
import datetime
from django.contrib.auth.models import User
from bson.objectid import ObjectId

# BUSINESS_LINE = (
#     ('beautyshop','Estética'),
#     ('veterinary', 'Veterinaria'),
#     ('fastfood','Comida rápida'),
#     ('restaurant','Restaurante'),
# )
# # Create your models here.
# class Pyme(Document):
#     name = fields.StringField(max_length=50, required=True)
#     address = fields.StringField(max_length=255)
#     employees = fields.IntField()
#     business_line = fields.StringField(max_length=50, choices=BUSINESS_LINE)

#     def __str__(self):
#         return f'{self.name}'

# class Appointment(Document):    
#     date = fields.DateTimeField(default=datetime.datetime.utcnow) 
#     reason = fields.StringField(max_length=255)
#     pyme = fields.ReferenceField(Pyme, reverse_delete_rule=CASCADE)
#     completed = fields.BooleanField(default = False)
#     owner = fields.ReferenceField('User', reverse_delete_rule=CASCADE)
    
#     def __str__(self):
#         return f'Fecha: {self.date} \n Razon: {self.reason}'

