import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setUser(data);
      } catch (err) {
        navigate("/");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout"); // optional route
    navigate("/");
  };

  return (
    <div className="text-center">
      {user ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Welcome, {user.name}</h2>
          <p className="mb-4">{user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
