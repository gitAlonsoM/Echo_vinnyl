
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Usuario


#Form creacion de cuenta. Reestriccion, email no registrado
class RegistroForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if Usuario.objects.filter(email=email).exists():
            raise forms.ValidationError("El email ya está registrado.")
        return email
