#tienda\apps.py
from django.apps import AppConfig




#CLASE QUE CONFIGURA COMPORTAMIENTO INCIAL DE LA APLICACION
class TiendaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField' #Especifica el tipo de campo automático predeterminado (BigAutoField) para las claves primarias.
    name = 'tienda' #Define el nombre de la aplicación 
