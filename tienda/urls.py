from django.urls import path
from . import views


#Cada ruta es asociadas con funciones de vista que están definidas en views.py

urlpatterns = [
    path('', views.index, name='index'), #Archivo raiz
    path('acerca/', views.acerca, name='acerca'),
    path('carrito/', views.carrito, name='carrito'),
    path('contacto/', views.contacto, name='contacto'),
    path('nuevos/', views.nuevos, name='nuevos'),
    path('usados/', views.usados, name='usados'),
    path('visualizacion/', views.visualizacion, name='visualizacion'),
    path('registro/', views.registro, name='registro'),
    path('iniciar_sesion/', views.iniciar_sesion, name='iniciar_sesion'),
    path('cerrar_sesion/', views.cerrar_sesion, name='cerrar_sesion'),
    path('eliminar_contacto/<int:contacto_id>/', views.eliminar_contacto, name='eliminar_contacto'),

]



""" 
Todas las funciones de vista en "views.py" que necesitan renderizar una página o manejar una solicitud directa
desde el navegador requieren una ruta en urls.py.

Por ejemplo:
    Funciones que renderizan páginas: Cada función de vista que devuelve una página HTML o cualquier otra respuesta al navegador debe tener una URL asociada para que los usuarios puedan acceder a ella.
    Funciones que manejan solicitudes específicas: Esto incluye funciones que procesan formularios, manejan acciones específicas como el inicio y cierre de sesión, o cualquier otra interacción directa con el usuario.

*Funciones de views.py que no requieren una ruta en urls.py son funciones auxiliares que no requieren un reender


"""
