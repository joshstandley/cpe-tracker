import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import WelcomeSection from "../components/WelcomeSection";
import CredentialsSection from "../components/CredentialsSection";
import CPECreditsSection from "../components/CPECreditsSection";
import "../styles/dashboard.css";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [userCredentials, setUserCredentials] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosWithAuth().get("/api/dashboard");
        setMessage(response.data.message);
      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
        navigate("/login");
      }
    };

    const fetchUserCredentials = async () => {
      try {
        const response = await axiosWithAuth().get("/api/user/credentials");
        setUserCredentials(response.data || []);
      } catch (err) {
        console.error("Error fetching user credentials:", err.message);
      }
    };

    fetchDashboardData();
    fetchUserCredentials();
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev); // Toggle edit mode
  };

  return (
    <div className="dashboard-container">
      <WelcomeSection />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>{message}</p>

        <section className="user-credentials-section">
          <h2>My Credentials</h2>
          {userCredentials?.length > 0 ? (
            <div>
              <div className="user-credentials-container">
                {userCredentials.map((credential) => (
                  <div key={credential.id} className="user-credential-card">
                    {credential.name}
                  </div>
                ))}
              </div>
              <button className="edit-button" onClick={handleEditClick}>
                {isEditing ? "Cancel" : "Edit Credentials"}
              </button>
            </div>
          ) : (
            <p>No credentials added yet.</p>
          )}
        </section>

        {isEditing && <CredentialsSection />}
        <CPECreditsSection />
      </div>
    </div>
  );
}

export default Dashboard;
