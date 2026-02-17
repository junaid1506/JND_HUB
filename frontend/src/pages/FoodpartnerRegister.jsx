import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/Authlayout";

const FoodPartnerRegister = () => (
  <>
    <AuthLayout />
    <div className="auth-page">
      <div className="auth-card">
        <div className="page-icon green">🏪</div>
        <div className="page-title">Partner Register</div>
        <div className="page-sub">List your restaurant & grow with us</div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              className="form-input green"
              placeholder="Karachi Biryani House"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Person</label>
            <input
              type="text"
              className="form-input green"
              placeholder="Ahmed Khan"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-input green"
              placeholder="+92 300 0000000"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-input green"
              placeholder="Street, City"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input green"
              placeholder="info@restaurant.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input green"
              placeholder="Min. 8 characters"
            />
          </div>
          <button className="btn-main btn-green">Register Restaurant</button>
        </form>

        <div className="auth-switch">
          Already registered?
          <Link to="/food-partner/login" className="green">
            Sign In
          </Link>
        </div>

        <div className="divider">
          <div className="div-line" />
          <span className="div-txt">are you a customer?</span>
          <div className="div-line" />
        </div>

        <Link to="/user/register" className="switch-pill orange">
          <div className="switch-pill-left">
            <div className="switch-pill-emoji orange">🍔</div>
            <div>
              <div className="switch-pill-lbl">Register as</div>
              <div className="switch-pill-name">Regular User</div>
            </div>
          </div>
          <span>›</span>
        </Link>
      </div>
    </div>
  </>
);

export default FoodPartnerRegister;
