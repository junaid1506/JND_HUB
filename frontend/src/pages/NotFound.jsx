import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/Authlayout";

const NotFound = () => {
  return (
    <>
      <AuthLayout />
      <div className="auth-page">
        <div className="auth-card">
          <div className="not-found">
            <div className="nf-emoji">🍽️</div>
            <div className="nf-code">404</div>
            <div className="nf-title">Page Not Found</div>
            <p className="nf-desc">
              Looks like this page is off the menu.
              <br />
              Let's get you back on track.
            </p>
            <div className="nf-btns">
              <Link
                to="/user/login"
                className="btn-main btn-orange"
                style={{ textAlign: "center", textDecoration: "none" }}
              >
                🍔 Go to User Login
              </Link>
              <Link
                to="/food-partner/login"
                className="btn-main btn-green"
                style={{ textAlign: "center", textDecoration: "none" }}
              >
                🏪 Go to Partner Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
