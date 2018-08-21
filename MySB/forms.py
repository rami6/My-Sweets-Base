from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='', required=False)

    def clean_email(self):
        email = self.cleaned_data['email']
        if email is not '' and email is not None and User.objects.filter(email=email).exists():
            raise ValidationError("Email already exists.")
        return email

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'email')


class AccountEditForm(UserChangeForm):
    email = forms.EmailField(max_length=254, help_text='', required=False)

    def clean_email(self):
        email = self.cleaned_data['email']
        if email is not '' and email is not None and User.objects.filter(email=email).exists() and User.objects.get(email=email).id != self.instance.id:
            raise ValidationError("Email already exists.")
        return email

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
