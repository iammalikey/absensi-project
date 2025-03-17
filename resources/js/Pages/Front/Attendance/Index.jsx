import { useState } from "react";
// import { Inertia } from "@inertiajs/inertia";

export default function ClockIn() {
  const [loading, setLoading] = useState(false);

  const handleClockIn = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log("Lokasi berhasil diambil:", position);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
    
            // Kirim data ke Laravel API (sesuaikan dengan endpoint backend kamu)
            fetch('/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,// jika pakai Laravel
                },
                body: JSON.stringify({
                    user_id: user_id,
                    clock_in_lat: latitude,
                    clock_in_long: longitude,
                    clock_in: new Date().toISOString(), // Format waktu yang benar
                    date: new Date().toISOString().split('T')[0]
                })
            })
            .then(response => response.json())
            .then(data => console.log("Response dari server:", data))
            .catch(error => console.error("Error saat mengirim lokasi:", error));
        },
        (error) => {
            console.error("Gagal mendapatkan lokasi:", error.message);
        },
        {
            enableHighAccuracy: true, // Aktifkan akurasi tinggi
            timeout: 10000,           // Maksimal waktu tunggu (10 detik)
            maximumAge: 0             // Tidak gunakan cache lokasi lama
        }
    );
    
  };

  return (
    <button 
      onClick={handleClockIn} 
      disabled={loading} 
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      {loading ? "Loading..." : "Clock In"}
    </button>
  );
}
