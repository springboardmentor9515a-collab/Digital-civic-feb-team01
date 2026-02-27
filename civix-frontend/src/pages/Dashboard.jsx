import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/dashboard.css";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">

      <Sidebar />
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h2>Welcome back, {user?.name?.split(' ')[0] || 'User'} 👋
            <span className="role-badge" style={{ fontSize: '0.5em', background: '#e2e8f0', padding: '4px 8px', borderRadius: '12px', marginLeft: '10px', verticalAlign: 'middle' }}>
              {user?.role?.toUpperCase()}
            </span>
          </h2>
          {user?.role === 'citizen' ? (
            <Link to="/create-petition" className="primary-btn" style={{ textDecoration: 'none' }}>Create Petition</Link>
          ) : (
            <Link to="/petitions" className="primary-btn" style={{ background: '#4a5568', textDecoration: 'none' }}>Review Local Petitions</Link>
          )}
        </div>

        {/* Stats Cards - Role Based */}
        <div className="stats-grid">
          {user?.role === 'citizen' ? (
            <>
              <div className="card">
                <h3>0</h3>
                <p>My Petitions</p>
              </div>
              <div className="card">
                <h3>0</h3>
                <p>Signed Petitions</p>
              </div>
              <div className="card">
                <h3>0</h3>
                <p>Polls Answered</p>
              </div>
            </>
          ) : (
            <>
              <div className="card">
                <h3>0</h3>
                <p>Pending Petitions</p>
              </div>
              <div className="card">
                <h3>0</h3>
                <p>Official Responses</p>
              </div>
              <div className="card">
                <h3>0</h3>
                <p>Local User Base</p>
              </div>
            </>
          )}
        </div>

        {/* Activity Section */}
        <div className="activity-section">
          <h3>{user?.role === 'citizen' ? 'Active Petitions Near You' : 'Unresolved Issues in Your Jurisdiction'}</h3>
          <div className="empty-state">
            <p>No {user?.role === 'citizen' ? 'petitions' : 'issues'} found for {user?.location || 'your area'}.</p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
