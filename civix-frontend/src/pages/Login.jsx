import React from "react";
import "../styles/login.css";

import { useGoogleLogin } from '@react-oauth/google';
import { Landmark, FileText, Vote, CheckCircle, Users, TrendingUp } from "lucide-react";

function Login() {

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
          // Redirect or update state
          window.location.href = '/'; // Redirect to home screen
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

        <label>Email</label>
        <input type="email" placeholder="Example@email.com" />

        <label>Password</label>
        <input type="password" placeholder="At least 8 characters" />

        <div className="forgot">
          <a href="#">Forgot Password?</a>
        </div>

        <button className="signin-btn">Sign in</button>

        <div className="divider">Or</div>

        <button className="google-btn" onClick={() => handleGoogleLogin()}>Sign in with Google</button>
        <button className="facebook-btn">Sign in with Facebook</button>

        <p className="signup-text">
          Don't you have an account? <span>Sign up</span>
        </p>
        {/* <div><p>© 2026 ALL RIGHTS RESERVED</p></div> */}
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="right-content">
          <h1>Civix</h1>
          <h3>Digital Civic Engagement Platform</h3>
          <p className="description">
            Civix enables citizens to engage in local governance through petitions, voting, and tracking official responses. Join our platform to make your voice heard and driven positive changes in your community.
          </p>

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
