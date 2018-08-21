from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='', required=False)

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'email')


class AccountEditForm(UserChangeForm):
    email = forms.EmailField(max_length=254, help_text='', required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
