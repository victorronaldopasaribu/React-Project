import React, { useState, useEffect, useRef } from 'react';
import { FaSignOutAlt, FaCamera  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import noImage from '../assets/no-image.png';

function ClockIn() {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(''); // State untuk current location
  const [workLocation, setWorkLocation] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);
  const imgRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSave = () => {
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      navigate('/home');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/home');
  };

  useEffect(() => {
    // Mengambil current location saat komponen dimuat
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=400x400&markers=color:red|${latitude},${longitude}&key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao`}
              alt="Map"
            />
          );
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('Failed to retrieve location');
        }
      );
    } else {
      setLocation('Geolocation is not supported by your browser');
    }
  }, []); // Membuatnya hanya dijalankan sekali saat komponen dimuat

  const handleCapturePhoto = async () => {
    setIsCapturing(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'image/webp' });
        setPhoto(URL.createObjectURL(blob));
      };

      setTimeout(() => {
        mediaRecorder.stop();
        if (videoRef.current) {
          videoRef.current.srcObject = null; // Stop the video stream.
        }
        setIsCapturing(false);
      }, 2000);

      mediaRecorder.start();
    } catch (error) {
      console.error('Error capturing photo:', error);
      setIsCapturing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoStream]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 m-4 bg-red-500 text-white hover:bg-red-400 px-4 py-2 rounded"
        >
          <FaSignOutAlt />
        </button>
        <h2 className="text-2xl font-bold" style={{ marginBottom: '20px' }}>
          Clock In
        </h2>

        <div
          className="mb-4"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {photo ? (
            <img ref={imgRef} src={photo} alt="Captured" style={{ width: '100%' }} />
          ) : (
            <img src={noImage} alt="No Image" style={{ width: '200px', height: '200px' }} /> // Sesuaikan ukuran gambar placeholder di sini
          )}
          <button
            onClick={isCapturing ? null : handleCapturePhoto}
            className={`bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded ${
              isCapturing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isCapturing ? 'Capturing...' :  <FaCamera />}
          </button>
        </div>

        <div className="mb-4">
          {location ? (
            <div>{location}</div>
          ) : (
            <button
              onClick={() => {
                setLocation('Fetching location...');
              }}
              className="bg-blue-500 text-white hover-bg-blue-400 px-4 py-2 rounded"
            >
              Get Current Location
            </button>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="workLocation" className="block">
            Work Location:
          </label>
          <select
            id="workLocation"
            value={workLocation}
            onChange={(e) => setWorkLocation(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select an option</option>
            <option value="Office">Office</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded mr-2"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white hover:bg-red-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClockIn;
