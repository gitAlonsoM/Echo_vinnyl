#tienda\models.py
from django.db import models
from django.contrib.auth.models import AbstractUser


#campos, tipos de datos, validaciones, valores predeterminados, etc


#tienda\models.py
#Modelo formulario de contacto
class Contacto(models.Model):  
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15)
    asunto = models.CharField(max_length=100, default='Sin asunto')
    mensaje = models.TextField(default='Sin mensaje')

    def __str__(self): 
        return self.nombre  #devuelve el nombre del contacto
#================================


#Modelo usuarios, creacion de cuentas
class Usuario(AbstractUser):
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='tienda_usuario_set',  
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='tienda_usuario_set',  
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )


