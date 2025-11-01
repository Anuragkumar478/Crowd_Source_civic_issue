import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import context

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use login() from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);

      // ✅ Update AuthContext immediately
      login(data.user);

      // ✅ (Optional) store in localStorage (useful for refresh persistence)
      localStorage.setItem("user", JSON.stringify(data.user));

      setMsg(data.message);

      // ✅ Redirect instantly based on role
      if (data.user.role === "admin") navigate("/admin-dashboard");
      else navigate("/profile");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      {msg && <p className="text-center text-sm mt-3">{msg}</p>}
    </div>
  );
}
