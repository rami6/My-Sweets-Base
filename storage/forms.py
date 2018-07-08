from django import forms
from .models import Ingredient


class IngredientCreateForm(forms.ModelForm):
	class Meta:
		model = Ingredient
		fields = [
			'name',
			'expiration_date',
		]
