import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import WelcomeSection from "../components/WelcomeSection";
import "../styles/dashboard.css";

function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosWithAuth().get("/api/dashboard");
        setMessage(response.data.message);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <WelcomeSection />
      <div className="dashboard-content">
        <h2>Dashboard Overview</h2>
        <p>{message}</p>
        <p>Here you can manage your credentials, track CPE credits, and more.</p>
      </div>
    </div>
  );
}

export default Dashboard;
