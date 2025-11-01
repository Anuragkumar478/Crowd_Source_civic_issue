import { useState } from "react";
import api from "../api"; // ✅ make sure api.js handles baseURL + credentials
import { useNavigate } from "react-router-dom";

export default function AddComplaint() {
  const [form, setForm] = useState({
    city: "",
    state: "",
    address: "",
    image: "",
  });
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/complaints", form);
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
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded p-2"
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded mt-2" />
        )}
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
