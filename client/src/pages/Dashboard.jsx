import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // To manage loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosWithAuth().get("/dashboard");
        setMessage(response.data.message);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        navigate("/login");
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>; // Show this while fetching data
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
