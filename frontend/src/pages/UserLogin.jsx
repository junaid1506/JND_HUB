import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/Authlayout";

const UserLogin = () => (
  <>
    <AuthLayout />
    <div className="auth-page">
      <div className="auth-card">
        <div className="page-icon orange">👋</div>
        <div className="page-title">Welcome Back!</div>
        <div className="page-sub">Sign in to your account</div>

        <form onSubmit={(e) => e.preventDefault()}>
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

export default UserLogin;
