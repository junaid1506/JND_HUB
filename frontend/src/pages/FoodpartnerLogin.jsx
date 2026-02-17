import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/Authlayout";
import axios from "axios";

const FoodPartnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // stop page reload

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      navigate("/create-food");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <AuthLayout />
      <div className="auth-page">
        <div className="auth-card">
          <div className="page-icon green">👨‍🍳</div>
          <div className="page-title">Partner Login</div>
          <div className="page-sub">Access your restaurant dashboard</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-input green"
                placeholder="info@restaurant.com"
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
                className="form-input green"
                placeholder="Your password"
              />
            </div>
            <button className="btn-main btn-green">Sign In</button>
          </form>

          <div className="auth-switch">
            Not a partner yet?
            <Link to="/food-partner/register" className="green">
              Register Now
            </Link>
          </div>

          <div className="divider">
            <div className="div-line" />
            <span className="div-txt">are you a customer?</span>
            <div className="div-line" />
          </div>

          <Link to="/user/login" className="switch-pill orange">
            <div className="switch-pill-left">
              <div className="switch-pill-emoji orange">🍔</div>
              <div>
                <div className="switch-pill-lbl">Sign in as</div>
                <div className="switch-pill-name">Regular User</div>
              </div>
            </div>
            <span>›</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FoodPartnerLogin;
