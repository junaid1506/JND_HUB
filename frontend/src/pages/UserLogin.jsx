import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/Authlayout";
import { useState } from "react";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // stop page reload

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <AuthLayout />
      <div className="auth-page">
        <div className="auth-card">
          <div className="page-icon orange">👋</div>
          <div className="page-title">Welcome Back!</div>
          <div className="page-sub">Sign in to your account</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-input"
                placeholder="junaid@email.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-input"
                placeholder="Your password"
              />
            </div>
            <button className="btn-main btn-orange">Sign In</button>
          </form>

          <div className="auth-switch">
            New here?
            <Link to="/user/register" className="orange">
              Create Account
            </Link>
          </div>

          <div className="divider">
            <div className="div-line" />
            <span className="div-txt">are you a partner?</span>
            <div className="div-line" />
          </div>

          <Link to="/food-partner/login" className="switch-pill green">
            <div className="switch-pill-left">
              <div className="switch-pill-emoji green">🏪</div>
              <div>
                <div className="switch-pill-lbl">Sign in as</div>
                <div className="switch-pill-name">Food Partner</div>
              </div>
            </div>
            <span>›</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
