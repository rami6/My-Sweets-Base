from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from .routers import router
from .apiviews import StorageSearchAPIView_expirationA, StorageSearchAPIView_expirationD, StorageSearchAPIView_nameA, StorageSearchAPIView_nameD, RecipeListAPIView, WorksSearchAPIView_titleA, WorksSearchAPIView_titleD, WorksSearchAPIView_dateA, WorksSearchAPIView_dateD

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('works/', include('works.urls')),
    path('storage/', include('storage.urls')),
    path('api/storage/e-a/', StorageSearchAPIView_expirationA.as_view()),
    path('api/storage/e-d/', StorageSearchAPIView_expirationD.as_view()),
    path('api/storage/n-a/', StorageSearchAPIView_nameA.as_view()),
    path('api/storage/n-d/', StorageSearchAPIView_nameD.as_view()),
    path('api/works/recipe-by-work/<int:work_id>', RecipeListAPIView.as_view()),
    path('api/works/t-a/', WorksSearchAPIView_titleA.as_view()),
    path('api/works/t-d/', WorksSearchAPIView_titleD.as_view()),
    path('api/works/d-a/', WorksSearchAPIView_dateA.as_view()),
    path('api/works/d-d/', WorksSearchAPIView_dateD.as_view()),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
