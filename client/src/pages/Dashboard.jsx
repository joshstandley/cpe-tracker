import React, { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    // You can fetch data here (e.g., user info, CPE credits)
    console.log("Dashboard loaded");
  }, []);

  return (
    <div>
      <h2>Welcome to your Dashboard</h2>
      <p>Here you can manage your CPE credits.</p>
      {/* You can add more sections or data here as needed */}
    </div>
  );
}

export default Dashboard;
