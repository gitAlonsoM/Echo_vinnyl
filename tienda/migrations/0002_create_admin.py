#tienda\migrations\0002_create_admin.py



#CREACION DEL ADMINISTRADOR CON CODIGO, EN VEZ DE USAR "createsuperuser"
from django.db import migrations

def create_admin_user(apps, schema_editor):
    Usuario = apps.get_model('tienda', 'Usuario')
    admin_user = Usuario.objects.create_superuser(
        username='administrador',
        email='alon.miranda@duocuc.cl',
        password='Administrador2024'
    )
    admin_user.save()

class Migration(migrations.Migration):
    dependencies = [
        ('tienda', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_admin_user),
    ]

    
    
