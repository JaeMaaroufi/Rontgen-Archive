import requests

from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from .tciaclient import TCIAClient


tcia_client = TCIAClient(baseUrl=settings.TCIA_API_BASE_URL, resource="TCIA")

def get_modality_values(request):
    collection = request.GET.get('collection')
    body_part_examined = request.GET.get('bodyPartExamined')
    modality = request.GET.get('modality')

    try:
        response = tcia_client.get_modality_values(collection, body_part_examined, modality)
        return JsonResponse(response.read(), safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def get_series_size(request):
    series_instance_uid = request.GET.get('seriesInstanceUID')


    try:
        response = tcia_client.get_series_size(series_instance_uid)
        return JsonResponse(response.read(), safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def download_image(request):
    series_instance_uid = request.GET.get('seriesInstanceUID')
    download_path = request.GET.get('./images')  
    zip_file_name = request.GET.get('image1', 'downloaded_image.zip') 

    try:
        success = tcia_client.get_image(series_instance_uid, download_path, zip_file_name)
        if success:
            return JsonResponse({'message': 'Image downloaded successfully'}, status=200)
        else:
            return JsonResponse({'error': 'Failed to download image'}, status=500)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)