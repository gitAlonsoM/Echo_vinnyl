#tienda\views.py

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from .models import Contacto, Usuario
from .forms import RegistroForm
from django.contrib.auth.decorators import user_passes_test
from django.views.decorators.csrf import ensure_csrf_cookie




#tienda\views.py
#Vistas basadas en funciones (vistas simples)
#cuando el navegador solicita la URL asociada a la función index, se realiza una solicitud GET para renderizar la plantilla index.html.
def index(request):
    return render(request, 'tienda/index.html')

def nuevos(request):
    return render(request, 'tienda/nuevos.html')

def usados(request):
    return render(request, 'tienda/usados.html')

def acerca(request):
    return render(request, 'tienda/acerca.html')

def carrito(request):
    return render(request, 'tienda/carrito.html')




#Vistas basadas en funciones con logica adicional.. 



#Manejar validacion de formulario de contacto.
def contacto(request):
    if request.method == 'POST': #Si el metodo del formulario es post, se extraen los datos del formulario enviados por el usuario
        nombre = request.POST['nombre']
        email = request.POST['email']
        telefono = request.POST['telefono']
        asunto = request.POST['asunto']
        mensaje = request.POST['mensaje']
        
        try: #Se intenta crear un nuevo con objeto en la BD con los datos del formulario
            Contacto.objects.create(
                nombre=nombre,
                email=email,
                telefono=telefono,
                asunto=asunto,
                mensaje=mensaje
            )
            mensaje_exito = "¡Envío exitoso!"
            return render(request, 'tienda/contacto.html', {'mensaje_exito': mensaje_exito})
        
        except IntegrityError:
            mensaje_error = "El email ya está registrado."
            return render(request, 'tienda/contacto.html', {'mensaje_error': mensaje_error})

    return render(request, 'tienda/contacto.html', {'user': request.user})


#Manejar registros de nuevos usuarios
def registro(request):
    if request.method == 'POST': #Si es post se guarda los datos 
        form = RegistroForm(request.POST)  #Crea una instancia del formulario con los datos recibidos
        if form.is_valid():  # Verifica si el formulario es válido
            form.save()# Guarda el nuevo usuario
            mensaje_exito = "¡Cuenta creada exitosamente!"
            return render(request, 'tienda/index.html', {'mensaje_exito': mensaje_exito})
        else:
            mensaje_error = form.errors
            return render(request, 'tienda/index.html', {'mensaje_error': mensaje_error})
    else:
        form = RegistroForm()
    return render(request, 'tienda/index.html', {'form': form})


#Manejar inicio de sesion de usuarios ya creados usando "login"
@ensure_csrf_cookie
def iniciar_sesion(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password) # Autentica al usuario con las credenciales proporcionadas
        if user is not None: # Si la autenticación es exitosa
            login(request, user)
            mensaje_exito = f"Bienvenido: {user.username}"
            return render(request, 'tienda/index.html', {'mensaje_exito': mensaje_exito})
        else:  # Si la autenticación falla
            mensaje_error = "Nombre de usuario o contraseña incorrectos."
            return render(request, 'tienda/index.html', {'mensaje_error': mensaje_error})
    return render(request, 'tienda/index.html')



#cerrar la sesion del usuario actual utilizando la funcion logout
def cerrar_sesion(request):
    logout(request)
    mensaje_exito = "Ha cerrado sesión exitosamente"
    return render(request, 'tienda/index.html', {'mensaje_exito': mensaje_exito})


#======================================
#*ADMIN
#tienda\views.py
# verifica si un usuario tiene privilegios de superusuario.
def es_admin(user):
    return user.is_superuser


#Funcion para mostrar los mensajes del formulario contacto
@login_required  # Decorador: Solo usuario autentificado puede acceder
@user_passes_test(es_admin)  # Verificar si el usuario tiene privilegios de superusuario antes de permitir el acceso a la función.
def visualizacion(request):
    contactos = Contacto.objects.all()  # Obtiene todos los registros del modelo Contacto
    return render(request, 'tienda/visualizacion.html', {'contactos': contactos})  # Renderiza la plantilla 'visualizacion.html' pasando los contactos como contexto


# Eliminar un contacto específico del modelo Contacto y luego redirigir a la página de visualización de contactos.
@login_required  # Este decorador asegura que el usuario debe estar autenticado para acceder a la función.
@user_passes_test(lambda u: u.is_superuser)  # Este decorador verifica que el usuario es un superusuario antes de permitir el acceso a la función.
def eliminar_contacto(request, contacto_id):
    contacto = get_object_or_404(Contacto, id=contacto_id)
    contacto.delete()
    return redirect('visualizacion')




""" 
Todas las funciones de vista (views.py) que requieren renderizar una página o manejar una solicitud directa necesitan aceptar el argumento "request". 
Esto les permite acceder a la información de la solicitud HTTP realizada por el cliente.
La funcion render(), se utiliza para renderizar los templates y devolverlos como respuesta. Por lo tanto, las funciones de 
vista que requieren mostrar contenido en la web, usar render() en su return.


_______________________________________________________________________________
El render() puede tener un "contexto",

Por ejemplo:

def cerrar_sesion(request):
    logout(request)
    mensaje_exito = "Ha cerrado sesión exitosamente"
    return render(request, 'tienda/index.html', {'mensaje_exito': mensaje_exito})
    
El contexto es el diccionario {'mensaje_exito': mensaje_exito}.
Clave: 'mensaje_exito'
Valor: mensaje_exito, que en este caso es la cadena de texto "Ha cerrado sesión exitosamente"

_______________________________________________________________________________


eliminar_contacto:
Django ORM: delete() es un método del ORM (Object-Relational Mapping) de Django. Este método se utiliza para eliminar una instancia de un modelo de la base de datos.
Uso: En este caso, contacto.delete() elimina el objeto contacto de la base de datos

"""

