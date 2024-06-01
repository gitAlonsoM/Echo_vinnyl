from django.shortcuts import render

def index(request):
    return render(request, 'tienda/index.html')

def acerca(request):
    return render(request, 'tienda/acerca.html')

def carrito(request):
    return render(request, 'tienda/carrito.html')

def contacto(request):
    return render(request, 'tienda/contacto.html')

def nuevos(request):
    return render(request, 'tienda/nuevos.html')

def usados(request):
    return render(request, 'tienda/usados.html')
