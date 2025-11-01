import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function AddComplaint() {
  const [form, setForm] = useState({
    category: "",
    city: "",
    state: "",
    address: "",
    locationType: "manual",
    latitude: "",
    longitude: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Auto-detect location
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm({
          ...form,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          locationType: "auto",
        });
        setLoadingLocation(false);
      },
      () => {
        alert("Failed to get your location.");
        setLoadingLocation(false);
      }
    );
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });
      if (image) formData.append("image", image);

      const { data } = await api.post("/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(data.message);
      setTimeout(() => navigate("/my-complaints"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit complaint.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Submit Complaint</h2>
      {message && <p className="text-center text-sm text-green-600 mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 🟣 Category Selection */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Select Category</option>
          <option value="Road">Road Issue</option>
          <option value="Water">Water Problem</option>
          <option value="Waste">Waste Management</option>
          <option value="Electricity">Electricity</option>
          <option value="Other">Other</option>
        </select>

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        {/* State */}
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        {/* 📍 Location Tagging */}
        <div className="space-y-2">
          <label className="block font-medium">📍 Location Tagging</label>
          <select
            name="locationType"
            value={form.locationType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="manual">Manual Entry</option>
            <option value="auto">Auto Detect</option>
          </select>

          {form.locationType === "auto" ? (
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={loadingLocation}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              {loadingLocation ? "Detecting..." : "Detect My Location"}
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="number"
                name="latitude"
                placeholder="Latitude"
                value={form.latitude}
                onChange={handleChange}
                className="w-1/2 border rounded p-2"
              />
              <input
                type="number"
                name="longitude"
                placeholder="Longitude"
                value={form.longitude}
                onChange={handleChange}
                className="w-1/2 border rounded p-2"
              />
            </div>
          )}
        </div>

        {/* 🗺️ Map Preview */}
        {form.latitude && form.longitude && (
          <div className="mt-4 h-64 w-full rounded overflow-hidden">
            <MapContainer
              center={[form.latitude, form.longitude]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              />
              <Marker position={[form.latitude, form.longitude]}>
                <Popup>Your reported location</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {/* 🖼️ Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded p-2"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded mt-2"
          />
        )}

        {/* 🚀 Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
