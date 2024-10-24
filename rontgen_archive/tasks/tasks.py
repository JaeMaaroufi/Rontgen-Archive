from celery import shared_task
import os
from rontgen_archive.rontgen_archive import settings

@shared_task
def cleanup_temp_files():
    TEMP_DIR = os.path.join(settings.BASE_DIR, 'temp_dicom')
    for filename in os.listdir(TEMP_DIR):
        file_path = os.path.join(TEMP_DIR, filename)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)  # Remove file
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")