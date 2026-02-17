import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/Authlayout";
import axios from "axios";

const FoodPartnerRegister = () => {
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        {
          businessName,
          contactPerson,
          phone,
          address,
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
          <div className="page-icon green">🏪</div>
          <div className="page-title">Partner Register</div>
          <div className="page-sub">List your restaurant & grow with us</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                }}
                type="text"
                className="form-input green"
                placeholder="Karachi Biryani House"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input
                value={contactPerson}
                onChange={(e) => {
                  setContactPerson(e.target.value);
                }}
                type="text"
                className="form-input green"
                placeholder="Ahmed Khan"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="tel"
                className="form-input green"
                placeholder="+92 300 0000000"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                type="text"
                className="form-input green"
                placeholder="Street, City"
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
};

export default FoodPartnerRegister;
