
// src/pages/AdminAnalytics.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../api";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A66BFF", "#FF6B6B"];

export default function AdminAnalytics() {
  const [byCategory, setByCategory] = useState([]);
  const [byCity, setByCity] = useState([]);
  const [byState, setByState] = useState([]);
  const [byStatus, setByStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cat = await api.get("/analytics/by-category");
      const city = await api.get("/analytics/by-city");
      const state = await api.get("/analytics/by-state");
      const status = await api.get("/analytics/by-status");
      setByCategory(cat.data);
      setByCity(city.data);
      setByState(state.data);
      setByStatus(status.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-center">📊 Admin Analytics Dashboard</h1>

      {/* Categories */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Complaints by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={byCategory}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* City */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Complaints by City</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={byCity}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* State */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Complaints by State</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={byState} dataKey="count" nameKey="_id" outerRadius={100} label>
              {byState.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Status */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Complaints by Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={byStatus} dataKey="count" nameKey="_id" outerRadius={100} label>
              {byStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
