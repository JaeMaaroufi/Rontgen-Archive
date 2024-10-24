from django.urls import path
from . import views
from .views import get_modality_values, get_series_size, download_image

urlpatterns = [
     path('modality-values/', get_modality_values, name='get_modality_values'),
    path('series-size/', get_series_size, name='get_series_size'),
    path('download-image/', download_image, name='download_image'),
]