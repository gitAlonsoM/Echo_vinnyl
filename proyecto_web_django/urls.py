
#proyecto_web_django\urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls), #Poder acceder al panel de adm desde el navegador
    path('', include('tienda.urls')), #Incluyendo la aplicacion tienda, al estar vacia la cadena, sera la aplicacion raiz
]


