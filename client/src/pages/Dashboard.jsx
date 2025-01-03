import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import WelcomeSection from "../components/WelcomeSection";
import CPECreditsSection from "../components/CPECreditsSection";
import "../styles/dashboard.css";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [userCredentials, setUserCredentials] = useState([]);
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

  return (
    <div className="dashboard-container">
      <WelcomeSection />
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <p>{message}</p>

        <section className="cpe-progress-section">
          <h2>Your CPE Progress</h2>
          {userCredentials?.length > 0 ? (
            <div className="cpe-progress-container">
              {userCredentials.map((credential) => (
                <div key={credential.id} className="cpe-progress-card">
                  <div className="credential-header">
                    <h3>{credential.name}</h3>
                  </div>
                  <div className="progress-details">
                    <p>
                      Completed: <strong>{credential.completed || 0}</strong> /{" "}
                      {credential.required || "TBD"} hours
                    </p>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            (credential.completed / credential.required) * 100 || 0
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p className="deadline">
                      Deadline: {credential.deadline || "No deadline set"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No credentials added yet.</p>
          )}
        </section>

        <CPECreditsSection />
      </div>
    </div>
  );
}

export default Dashboard;
