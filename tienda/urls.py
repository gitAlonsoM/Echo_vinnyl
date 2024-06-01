from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'), #Al dejar comillas vacias, se establece como ruta por defecto
    path('acerca/', views.acerca, name='acerca'),
    path('carrito/', views.carrito, name='carrito'),
    path('contacto/', views.contacto, name='contacto'),
    path('nuevos/', views.nuevos, name='nuevos'),
    path('usados/', views.usados, name='usados'),
]
