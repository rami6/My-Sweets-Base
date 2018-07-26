from django.shortcuts import render, redirect
from .forms import SignUpForm, AccountEditForm
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth import views


def custom_login(request):
    if request.user.is_authenticated:
        return redirect('/home')
    else:
        return views.login(request, template_name='landing.html')


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(request, username=username, password=raw_password)
            login(request, user)
            return redirect('/home')
    else:
        form = SignUpForm()
        args = {'form': form}
        return render(request, 'accounts/signup.html', args)


def edit_account(request):
    if request.method == 'POST':
        form = AccountEditForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('/settings/success/')
    else:
        form = AccountEditForm(instance=request.user)
        args = {'form': form}
        return render(request, 'accounts/account_edit.html', args)


def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(data=request.POST, user=request.user)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return redirect('/settings/success/')
        else:
            return redirect('/change-password/')
    else:
        form = PasswordChangeForm(user=request.user)
        args = {'form': form}
        return render(request, 'accounts/change_password.html', args)


def delete_account(request):
    user = request.user
    user.is_active = False
    user.email = ""
    user.save()

    return render(request, 'accounts/delete_account.html')
