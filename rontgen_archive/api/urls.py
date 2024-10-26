from django.urls import path
import os
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .views import get_modality_values, get_series, get_image, ModalityValuesView, display_image, fetch_and_convert_dicom

urlpatterns = [
    path('modality-values/', ModalityValuesView.as_view(), name='get_modality_values'),
    path('get-series/', get_series, name='get_series'),
    path('get-image/', get_image, name='download_image'),
    path('display-image/<str:file_name>/', display_image, name='display_image'),
    path('api/fetch-dicom/', fetch_and_convert_dicom, name='fetch_dicom'),
    path('search-images', views.search_images, name='search-images'),
]