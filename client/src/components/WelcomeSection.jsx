import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import "../styles/welcomeSection.css";

function WelcomeSection() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosWithAuth().get("/api/dashboard");
        console.log("Server response:", response.data); // Debugging log
        const user = response.data.user;
        if (user) {
          setUserName(`${user.first_name} ${user.last_name}`);
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="welcome-section">
      <h2>
        {error ? error : `Welcome, ${userName || "User"}!`}
      </h2>
    </section>
  );
}

export default WelcomeSection;
