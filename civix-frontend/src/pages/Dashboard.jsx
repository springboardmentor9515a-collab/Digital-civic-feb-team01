import React from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Civix</h2>
        </div>

        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
          <li>Petitions</li>
          <li>Polls</li>
          <li>Officials</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">

        {/* Header */}
        <div className="dashboard-header">
          <h2>Welcome back, Jintu 👋</h2>
          <button className="primary-btn">Create Petition</button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="card">
            <h3>0</h3>
            <p>My Petitions</p>
          </div>

          <div className="card">
            <h3>0</h3>
            <p>Successful Petitions</p>
          </div>

          <div className="card">
            <h3>0</h3>
            <p>Polls Created</p>
          </div>
        </div>

        {/* Activity Section */}
        <div className="activity-section">
          <h3>Active Petitions Near You</h3>
          <div className="empty-state">
            No petitions found.
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
