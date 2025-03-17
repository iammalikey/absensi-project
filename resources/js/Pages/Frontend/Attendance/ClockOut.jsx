import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { router } from '@inertiajs/react';
import MainLayout from '@/Layouts/Frontend/MainLayout';

// Fix default icon issues with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ClockOut = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const now = new Date();
    setCurrentDateTime(now.toLocaleString());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Error fetching location:", err);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace("T", " ");

    const data = {
      clock_out: formattedDateTime,
      latitude: position ? position[0] : null,
      longitude: position ? position[1] : null,
    };

    router.post("/attendance/clockout", data);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-lg p-6 mx-auto bg-white rounded shadow">
        <h1 className="mb-4 text-2xl font-bold">Attendance Clock Out</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Date &amp; Time</label>
            <input
              type="text"
              value={currentDateTime}
              disabled
              className="block w-full mt-1 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Clock Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClockOut;

ClockOut.layout = (page) => <MainLayout children={page} title="ClockOut" />;
