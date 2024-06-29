from django.urls import path
from . import views

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




