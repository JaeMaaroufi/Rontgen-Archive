import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageResults = ({ searchParams }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/api/search_images`, { params: searchParams });
        if (response.data.images) {
          setImages(response.data.images);
        } else {
          setError('No images found');
        }
      } catch (err) {
        setError('Error fetching images: ' + err.message);
      }
    };

    fetchImages();
  }, [searchParams]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {images.map((img) => (
        <div key={img.metadata.SeriesInstanceUID}>
          <img src={img.image_url} alt="Medical scan" />
          <div>
            <p>Patient ID: {img.metadata.PatientID}</p>
            <p>Body Part Examined: {img.metadata.BodyPartExamined}</p>
            <p>Modality: {img.metadata.Modality}</p>
            {/* Add more metadata as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageResults;