import pydicom
import requests
import json
import os
import zipfile
import matplotlib as plt
from PIL import Image
import io

from rest_framework.decorators import api_view
from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from .tciaclient import TCIAClient


tcia_client = TCIAClient(baseUrl=settings.TCIA_API_BASE_URL, resource="TCIA")



class ModalityValuesView(View):
    def get(self, request):
        # Extract parameters from the request
        print("Incoming GET parameters:", request.GET)

        # Extract parameters from the request
        collection = request.GET.get('collection')
        body_part_examined = request.GET.get('bodyPartExamined')

        # Check if parameters are present
        if not collection or not body_part_examined:
            return JsonResponse({'error': 'Missing required parameters: collection and bodyPartExamined'}, status=400)

        try:
            # Call the TCIA client to get modality values
            response = tcia_client.get_modality_values(collection, body_part_examined)

            # Log the raw response data
            response_data = response.read().decode('utf-8')
            print("Raw response from TCIA API:", response_data)  # Log the response for debugging

            # Attempt to decode JSON data
            json_data = json.loads(response_data)

            if not json_data or json_data == []:
                return JsonResponse({'message': 'No modality values found for the given parameters.'}, status=404)

            return JsonResponse(json_data, safe=False)
        except json.JSONDecodeError as e:
            print(f"JSON decoding error: {str(e)}")
            return JsonResponse({'error': 'Failed to decode response from TCIA API.'}, status=500)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal error occurred. Please try again later.'}, status=500)
        


from django.shortcuts import render

TEMP_DIR = os.path.join(settings.BASE_DIR, 'temp_dicom')
CACHE_DIR = os.path.join(settings.BASE_DIR, 'cached_images')


for directory in [TEMP_DIR, CACHE_DIR]:
    if not os.path.exists(directory):
        os.makedirs(directory)


def fetch_and_convert_dicom(request):
    series_instance_uid = request.GET.get('seriesInstanceUID')

    if not series_instance_uid:
        return JsonResponse({'error': 'Missing required parameter: seriesInstanceUID'}, status=400)

    try:
        # Fetch DICOM images from TCIA API
        response = requests.get(f'https://services.cancerimagingarchive.net/services/v4/TCIA/query/getImage?SeriesInstanceUID={series_instance_uid}')

        if response.status_code != 200:
            return JsonResponse({'error': 'Failed to fetch images from TCIA API'}, status=response.status_code)

        # Save the zip file temporarily
        zip_file_path = os.path.join(TEMP_DIR, f'{series_instance_uid}.zip')
        with open(zip_file_path, 'wb') as f:
            f.write(response.content)

        # Get series metadata
        metadata_response = requests.get(f'https://services.cancerimagingarchive.net/services/v4/TCIA/query/getSeries?SeriesInstanceUID={series_instance_uid}')
        if metadata_response.status_code != 200:
            return JsonResponse({'error': 'Failed to fetch metadata from TCIA API'}, status=metadata_response.status_code)

        metadata = json.loads(metadata_response.text)  # Parse metadata JSON string

        # Extract PatientID and other required fields from metadata
        patient_id = metadata[0]["PatientID"]
        collection = metadata[0]["Collection"]
        study_instance_uid = metadata[0]["StudyInstanceUID"]

        # Fetch patient study information
        patient_study_response = requests.get(f'https://services.cancerimagingarchive.net/services/v4/TCIA/query/getPatientStudy?Collection={collection}&PatientID={patient_id}&StudyInstanceUID={study_instance_uid}')
        if patient_study_response.status_code != 200:
            return JsonResponse({'error': 'Failed to fetch patient study information from TCIA API'}, status=patient_study_response.status_code)

        patient_study_info = json.loads(patient_study_response.text)  # Parse patient study info JSON

        # Extract patient gender (PatientSex) from the patient study info
        patient_gender = None
        if patient_study_info and isinstance(patient_study_info, list):
            patient_gender = patient_study_info[0].get("PatientSex", None)

        # Get converted images from the zip file
        converted_images = get_images_from_zip(zip_file_path, metadata)

        # Optionally cleanup the temp files
        cleanup_temp_files()

        # Include patient study information in the response
        return JsonResponse({
            'images': converted_images,
            'patient_study_info': patient_study_info,  # Add patient study information to the response
            'patient_gender': patient_gender  # Include patient's gender in the response
        }, status=200)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def convert_dicom_to_png(dicom_path):
    """Converts a DICOM file to PNG format and caches it."""
    ds = pydicom.dcmread(dicom_path)  # Read DICOM file
    image = ds.pixel_array  # Extract pixel array
    image = Image.fromarray(image)  # Convert to PIL Image

    # Ensure image is in a format suitable for saving
    if ds.PhotometricInterpretation == "MONOCHROME1":
        image = Image.eval(image, lambda x: 255 - x)  # Invert if necessary

    png_image_path = os.path.join(CACHE_DIR, os.path.basename(dicom_path).replace('.dcm', '.png'))
    image.save(png_image_path)  # Save as PNG
    return png_image_path  # Return the path to the saved PNG

def get_images_from_zip(zip_file_path, metadata):
    """Extracts DICOM files from a ZIP file and converts them to PNG, caching the results."""
    converted_images = []
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(TEMP_DIR)  # Extract all files to the temp directory

    # Loop through extracted files and convert them to PNG
    for extracted_file in os.listdir(TEMP_DIR):
        if extracted_file.endswith('.dcm'):
            dicom_path = os.path.join(TEMP_DIR, extracted_file)

            # Check if the PNG image already exists in the cache
            png_image_path = os.path.join(CACHE_DIR, extracted_file.replace('.dcm', '.png'))
            if os.path.exists(png_image_path):
                # If cached, just add to the converted_images list
                converted_images.append({
                    'filename': extracted_file,
                    'image_data': png_image_path,  # Store path to cached PNG image
                    'metadata': metadata[0]  # Assuming single metadata for the series
                })
            else:
                # If not cached, convert and cache it
                png_image_path = convert_dicom_to_png(dicom_path)  # Convert to PNG
                converted_images.append({
                    'filename': extracted_file,
                    'image_data': png_image_path,  # Store path to PNG image
                    'metadata': metadata[0]  # Assuming single metadata for the series
                })

    return converted_images  # Return the list of converted images

def cleanup_temp_files():
    """Delete all temporary DICOM files in the TEMP_DIR."""
    for filename in os.listdir(TEMP_DIR):
        file_path = os.path.join(TEMP_DIR, filename)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)  # Remove file
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")


def get_modality_values(request):
    collection = request.GET.get('collection')
    body_part_examined = request.GET.get('bodyPartExamined')
    modality = request.GET.get('modality')

    try:
        response = tcia_client.get_modality_values(collection, body_part_examined, modality)
        return JsonResponse(response.read(), safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def get_series(request):
    collection = request.GET.get('collection')
    modality = request.GET.get('modality')
    study_instance_uid = request.GET.get('studyInstanceUID')

    if not collection:
        return JsonResponse({'error': 'Missing required parameter: collection'}, status=400)

    # Fetch series data using the TCIAClient
    series_data = tcia_client.get_series(collection=collection, modality=modality, studyInstanceUid=study_instance_uid)

    # Check if the response is valid
    if series_data:
        # Decode the byte response to string
        series_json = series_data.read().decode('utf-8')
        return JsonResponse(series_json, safe=False, status=200)
    else:
        return JsonResponse({'error': 'Failed to retrieve series data.'}, status=500)
    

def get_image(request):
    series_instance_uid = request.GET.get('seriesInstanceUID')
    cache_dir = 'cached_images'  # Directory to cache images

    # Validate required parameters
    if not series_instance_uid:
        return JsonResponse({'error': 'Missing required parameter: seriesInstanceUID'}, status=400)

    # Ensure the cache directory exists
    if not os.path.exists(cache_dir):
        os.makedirs(cache_dir)

    # Create a zip file name based on the series_instance_uid
    zip_file_name = f"{series_instance_uid}.zip"
    zip_file_path = os.path.join(cache_dir, zip_file_name)

    # Call the get_image method from your TCIA client
    success = tcia_client.get_image(series_instance_uid, cache_dir, zip_file_name)

    if success:
        # Unzip the downloaded images
        with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
            zip_ref.extractall(cache_dir)

        # Remove the zip file after extraction
        os.remove(zip_file_path)

        # Generate a list of the extracted DICOM files
        dicom_files = [f for f in os.listdir(cache_dir) if f.endswith('.dcm')]
        return JsonResponse({'message': 'Images cached successfully.', 'dicom_files': dicom_files}, status=200)
    else:
        return JsonResponse({'error': 'Failed to download image.'}, status=500)
    

def display_image(request, file_name):
    cache_dir = 'cached_images'
    file_path = os.path.join(cache_dir, file_name)

    # Check if the file exists
    if not os.path.exists(file_path):
        return JsonResponse({'error': 'File not found'}, status=404)

    # Read the DICOM file
    dicom_file = pydicom.dcmread(file_path)
    pixel_array = dicom_file.pixel_array

    # Create a plot and save it to a BytesIO object
    plt.imshow(pixel_array, cmap='gray')
    plt.axis('off')
    response = HttpResponse(content_type='image/png')
    plt.savefig(response, format='png')
    plt.close()

    return response