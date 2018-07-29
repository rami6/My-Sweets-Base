from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib.auth.views import logout, password_reset, password_reset_done, password_reset_confirm, password_reset_complete
from .routers import router
from .apiviews import StorageSearchAPIView_expirationA, StorageSearchAPIView_expirationD, StorageSearchAPIView_nameA, StorageSearchAPIView_nameD, RecipeListAPIView, WorksSearchAPIView_titleA, WorksSearchAPIView_titleD, WorksSearchAPIView_dateA, WorksSearchAPIView_dateD, WishRecipeListAPIView, WishlistSearchAPIView_titleA, WishlistSearchAPIView_titleD, WishlistSearchAPIView_dateA, WishlistSearchAPIView_dateD
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.custom_login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', logout, {'template_name': 'accounts/logout.html'}),
    path('settings/', views.edit_account, name='settings'),
    path('settings/success/', TemplateView.as_view(template_name='accounts/account_edit_success.html'), name='settings_success'),
    path('change-password/', views.change_password, name='change_password'),
    path('reset-password/', password_reset, name='reset_password'),
    path('reset-password/done/', password_reset_done, name='password_reset_done'),
    url(r'reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$', password_reset_confirm , name='password_reset_confirm'),
    path('reset-password/complete/', password_reset_complete, name='password_reset_complete'),
    path('delete-account/', views.delete_account, name='delete_account'),
    path('home/', TemplateView.as_view(template_name='home.html'), name='home'),
    path('home/util-view', TemplateView.as_view(template_name='util_view.html'), name='util'),
    path('works/', include('works.urls')),
    path('storage/', include('storage.urls')),
    path('wish-list/', include('wishlist.urls')),
    path('api/storage/e-a/', StorageSearchAPIView_expirationA.as_view()),
    path('api/storage/e-d/', StorageSearchAPIView_expirationD.as_view()),
    path('api/storage/n-a/', StorageSearchAPIView_nameA.as_view()),
    path('api/storage/n-d/', StorageSearchAPIView_nameD.as_view()),
    path('api/works/t-a/', WorksSearchAPIView_titleA.as_view()),
    path('api/works/t-d/', WorksSearchAPIView_titleD.as_view()),
    path('api/works/d-a/', WorksSearchAPIView_dateA.as_view()),
    path('api/works/d-d/', WorksSearchAPIView_dateD.as_view()),
    path('api/works/recipe-by-work/<int:work_id>', RecipeListAPIView.as_view()),
    path('api/wish-list/t-a/', WishlistSearchAPIView_titleA.as_view()),
    path('api/wish-list/t-d/', WishlistSearchAPIView_titleD.as_view()),
    path('api/wish-list/d-a/', WishlistSearchAPIView_dateA.as_view()),
    path('api/wish-list/d-d/', WishlistSearchAPIView_dateD.as_view()),
    path('api/wish-list/recipe-by-wish/<int:wish_id>', WishRecipeListAPIView.as_view()),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
