#tienda\forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Usuario

#formulario y validacion para el registro de usuarios. Reestriccion email 
class RegistroForm(UserCreationForm): #Esta clase hereda de UserCreationForm, que ya incluye campos y validaciones basicas para el registro de usuarios.
    email = forms.EmailField(required=True)

    class Meta: #La clase Meta vincula el formulario con el modelo Usuario
        model = Usuario
        fields = ['username', 'email', 'password1', 'password2']

    def clean_email(self): #Validar el campo de email
        email = self.cleaned_data.get('email')
        if Usuario.objects.filter(email=email).exists():
            raise forms.ValidationError("El email ya está registrado.")
        return email




