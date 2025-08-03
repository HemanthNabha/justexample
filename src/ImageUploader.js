// src/ImageUploader.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setImageUrl(fileUrl);
    detectElements(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.png,.jpg,.jpeg',
  });

  const detectElements = async (file) => {
    setLoading(true);
    
    // Roboflow API endpoint - replace this with your actual Roboflow endpoint
    // https://detect.roboflow.com/ui-element-detect-kgqds/1?api_key=xj4Kh9xQWNwfZJosjaeU"
    const API_URL = 'https://detect.roboflow.com/ui-element-detect-kgqds/1'; // Replace with your Roboflow API URL
    const API_KEY = 'xj4Kh9xQWNwfZJosjaeU'; // Replace with your API key
    const modelId = 'ui-element-detect-kgqds/1'; // Replace with your model ID

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `${API_URL}?api_key=${API_KEY}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const { predictions } = response.data;
      console.log(response.data,'predictions>')
      setDetections(predictions);
    } catch (error) {
      console.error("Error detecting elements:", error);
    } finally {
      setLoading(false);
    }
  };

  const drawDetections = () => {
    if (!imageUrl || detections?.length === 0) return null;

    const image = new Image();
    image.src = imageUrl;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      detections?.forEach((detection) => {
        const { x, y, width, height, class: className } = detection;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        ctx.font = '18px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText(className, x, y > 20 ? y - 5 : 20); // Avoid text overlap
      });

      const imageWithDetections = canvas.toDataURL();
      document.getElementById('image-with-detections').src = imageWithDetections;
    };
  };

  React.useEffect(() => {
    drawDetections();
  }, [imageUrl, detections]);

  return (
    <div className="container">
      <h1>UI Element Detectors</h1>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select an imagessss</p>
      </div>

      {loading && <p>Loadingggggs....</p>}

      {imageUrl && (
        <div>
          <h4>Uploaded Image</h4>
          <img
            id="image-with-detections"
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: '100%', marginTop: '20px' }}
          />
        </div>
      )}

      {detections?.length > 0 && (
        <div>
          <h3>Detected Elements:</h3>
          <ul>
            {detections.map((detection, index) => (
              <li key={index}>
                {detection.class} at {detection.x},{detection.y}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

