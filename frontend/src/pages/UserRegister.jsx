import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/Authlayout";
import axios from "axios";

const UserRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // stop page reload

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName,
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
          <div className="page-icon orange">🍔</div>
          <div className="page-title">Create Account</div>
          <div className="page-sub">Join us — it only takes a minute</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                className="form-input"
                placeholder="Junaid Ansari"
              />
            </div>
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
                placeholder="Min. 8 characters"
              />
            </div>
            <button type="Submit" className="btn-main btn-orange">
              Create Account
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?
            <Link to="/user/login" className="orange">
              Sign In
            </Link>
          </div>

          <div className="divider">
            <div className="div-line" />
            <span className="div-txt">are you a partner?</span>
            <div className="div-line" />
          </div>

          <Link to="/food-partner/register" className="switch-pill green">
            <div className="switch-pill-left">
              <div className="switch-pill-emoji green">🏪</div>
              <div>
                <div className="switch-pill-lbl">Register as</div>
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

export default UserRegister;
