
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from .models import Contacto, Usuario
from .forms import RegistroForm
from django.contrib.auth.decorators import user_passes_test



#tienda\views.py
#Vistas basadas en funciones (vistas simples)
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




#Vistas basadas en funciones con logica adicional.. continuar
def contacto(request):
    if request.method == 'POST':
        nombre = request.POST['nombre']
        email = request.POST['email']
        telefono = request.POST['telefono']
        asunto = request.POST['asunto']
        mensaje = request.POST['mensaje']
        
        try:
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

    return render(request, 'tienda/contacto.html')



@login_required
def visualizacion(request):
    contactos = Contacto.objects.all()
    return render(request, 'tienda/visualizacion.html', {'contactos': contactos})

def registro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            mensaje_exito = "¡Cuenta creada exitosamente!"
            return render(request, 'tienda/index.html', {'mensaje_exito': mensaje_exito})
        else:
            mensaje_error = form.errors
            return render(request, 'tienda/index.html', {'mensaje_error': mensaje_error})
    else:
        form = RegistroForm()
    return render(request, 'tienda/index.html', {'form': form})

def iniciar_sesion(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            mensaje_exito = f"Bienvenido: {user.username}"
            return render(request, 'tienda/index.html', {'mensaje_exito': mensaje_exito})
        else:
            mensaje_error = "Nombre de usuario o contraseña incorrectos."
            return render(request, 'tienda/index.html', {'mensaje_error': mensaje_error})
    return render(request, 'tienda/index.html')

def cerrar_sesion(request):
    logout(request)
    mensaje_exito = "Ha cerrado sesión exitosamente"
    return render(request, 'tienda/index.html', {'mensaje_exito': mensaje_exito})


#======================================
#USUARIO ADMINISTRADOR. Solo el tiene acceso a 'tienda/visualizacion.html'
def es_admin(user):
    return user.is_superuser

@user_passes_test(es_admin)
def visualizacion(request):
    contactos = Contacto.objects.all()
    return render(request, 'tienda/visualizacion.html', {'contactos': contactos})


# Vista para eliminar contacto
@login_required
@user_passes_test(lambda u: u.is_superuser)
def eliminar_contacto(request, contacto_id):
    contacto = get_object_or_404(Contacto, id=contacto_id)
    contacto.delete()
    return redirect('visualizacion')


