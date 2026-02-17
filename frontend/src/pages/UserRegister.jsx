import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const UserRegister = () => (
  <>
    <AuthLayout />
    <div className="auth-page">
      <div className="auth-card">
        <div className="page-icon orange">🍔</div>
        <div className="page-title">Create Account</div>
        <div className="page-sub">Join us — it only takes a minute</div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ali Hassan"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="ali@email.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Min. 8 characters"
            />
          </div>
          <button className="btn-main btn-orange">Create Account</button>
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

export default UserRegister;
