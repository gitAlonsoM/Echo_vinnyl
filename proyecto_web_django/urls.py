

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tienda.urls')), #Incluyendo la aplicacion creada al directorio del proyecto
]


