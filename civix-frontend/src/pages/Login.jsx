import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Google from "../assets/image2.png";
import Facebook from "../assets/image3.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useGoogleLogin } from '@react-oauth/google';
import { Landmark, FileText, Vote, CheckCircle, Users, TrendingUp } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: codeResponse.code }),
        });
        const data = await res.json();
        console.log("Login Success:", data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = '/';
        }
      } catch (err) {
        console.error(err);
      }
    },
    flow: 'auth-code',
  });

  return (
    <div className="login-wrapper">

      {/* LEFT SIDE */}
      <div className="login-left">
        <h2>Welcome to Civix 👋</h2>
        <p className="subtitle">
          Join our platform to make your voice heard in local governance
        </p>

        <div className="form-box">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Example@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <label>Password</label>
          <input 
            type="password" 
            placeholder="At least 8 characters" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <button 
            className="signin-btn" 
            onClick={handleEmailLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="divider">-------------------- Or --------------------</div>

          <div className="social-media">
            <button className="google-btn" onClick={() => handleGoogleLogin()}>
              <img src={Google} alt="Google" className="icon" />
              Sign in with Google
            </button>

            <button className="facebook-btn">
              <img src={Facebook} alt="Facebook" className="icon" />
              Sign in with Facebook
            </button>
          </div>
        </div>

        <p className="signup-text">
          Don't have an account? <span>Sign up</span>
        </p>

        <p className="footer">© 2026 ALL RIGHTS RESERVED</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="right-content">
          <h1>Civix</h1>
          <h3>Digital Civic Engagement Platform</h3>
          <p className="description">
            Civix enables citizens to engage in local governance through petitions, voting, and tracking official responses. Join our platform to make your voice heard and drive positive change in your community.
          </p>

          {/* Features */}
          <div className="features">
            <div className="feature-item">
              <div className="icon-box">
                <FileText size={24} />
              </div>
              <div className="feature-text">
                <h4>Create and Sign Petitions</h4>
                <p>Easily create petitions for issues you care about and gather support from your community.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-box">
                <Vote size={24} />
              </div>
              <div className="feature-text">
                <h4>Participate in Public Polls</h4>
                <p>Vote on local issues and see real-time results of community sentiments.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="icon-box">
                <CheckCircle size={24} />
              </div>
              <div className="feature-text">
                <h4>Track Official Responses</h4>
                <p>See how local officials respond to community concerns and track progress on issues.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat-item">
              <TrendingUp size={20} className="stat-icon" />
              <h2>12.5K</h2>
              <p>Active Petitions</p>
            </div>
            <div className="stat-item">
              <Users size={20} className="stat-icon" />
              <h2>2.8M</h2>
              <p>Community Members</p>
            </div>
            <div className="stat-item">
              <Landmark size={20} className="stat-icon" />
              <h2>850+</h2>
              <p>Victories Won</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
