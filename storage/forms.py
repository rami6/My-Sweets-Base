from django import forms
from django.forms import SelectDateWidget
from .models import Ingredient


class IngredientCreateForm(forms.ModelForm):
	class Meta:
		model = Ingredient
		fields = [
			'name',
			'expiration_date',
		]
		widgets = {
			'expiration_date': SelectDateWidget,
		}
