import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosWithAuth().get("/dashboard");
        setMessage(response.data.message);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
