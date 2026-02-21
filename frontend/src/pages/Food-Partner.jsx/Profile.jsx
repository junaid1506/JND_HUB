import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch partner details and their foods
    // TODO: Replace with actual API
    axios
      .get(`http://localhost:3000/api/food-partner/${partnerId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setPartner(response.data.partner);
        setFoods(response.data.foods);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching partner:", error);
        setLoading(false);
      });
  }, [partnerId]);

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "?"
    );
  };

  const handleVideoClick = (foodId) => {
    // Navigate back to home and scroll to that video
    navigate(`/?food=${foodId}`);
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="bp-loading">
          <div className="bp-spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="bp-container">
        {/* Header Section - Maroon */}
        <div className="bp-header">
          {/* Back Button */}
          <button className="bp-back-btn" onClick={() => navigate(-1)}>
            ←
          </button>

          {/* Profile Info */}
          <div className="bp-profile">
            <div className="bp-avatar">
              {partner?.fullName ? getInitials(partner.fullName) : "?"}
            </div>
            <div className="bp-info">
              <div className="bp-name">{partner?.fullName || "Restaurant"}</div>
              <div className="bp-address">{partner?.address || "Address"}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="bp-stats">
            <div className="bp-stat-box">
              <div className="bp-stat-label">total meals</div>
              <div className="bp-stat-value">{foods.length || 0}</div>
            </div>
            <div className="bp-stat-box">
              <div className="bp-stat-label">customer serve</div>
              <div className="bp-stat-value">
                {partner?.customersServed || "0"}
              </div>
            </div>
          </div>
        </div>

        {/* Video Grid Section - Blue */}
        <div className="bp-grid">
          {foods.length === 0 ? (
            <div className="bp-empty">
              <div className="bp-empty-icon">🍽️</div>
              <div className="bp-empty-text">No meals available yet</div>
            </div>
          ) : (
            foods.map((food) => (
              <div
                key={food._id}
                className="bp-video-card"
                onClick={() => handleVideoClick(food._id)}
              >
                <video
                  className="bp-video"
                  src={food.video}
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="bp-video-overlay">
                  <div className="bp-video-name">{food.name}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #0a0a0a;
  }
  
  .bp-container {
    min-height: 100vh;
    background: #0a0a0a;
    padding-bottom: 20px;
  }
  
  /* ── Header (Maroon) ── */
  .bp-header {
    background: linear-gradient(135deg, #6b3838 0%, #4a2525 100%);
    padding: 16px 16px 24px;
    position: relative;
  }
  
  @media (min-width: 768px) {
    .bp-header {
      padding: 20px 24px 28px;
    }
  }
  
  .bp-back-btn {
    background: rgba(255,255,255,0.15);
    border: 1.5px solid rgba(255,255,255,0.3);
    color: #fff;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 16px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.2s;
  }
  
  .bp-back-btn:active {
    transform: scale(0.95);
    background: rgba(255,255,255,0.2);
  }
  
  .bp-profile {
    display: flex;
    gap: 14px;
    margin-bottom: 20px;
  }
  
  .bp-avatar {
    width: 90px;
    height: 90px;
    min-width: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2d5a2d 0%, #1a3d1a 100%);
    border: 3px solid rgba(255,255,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 800;
    color: #fff;
    text-transform: uppercase;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  }
  
  @media (max-width: 400px) {
    .bp-avatar {
      width: 80px;
      height: 80px;
      min-width: 80px;
      font-size: 1.8rem;
    }
  }
  
  .bp-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  }
  
  .bp-name {
    font-size: 1.2rem;
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
    border: 2px solid rgba(255,255,255,0.3);
    background: rgba(0,0,0,0.15);
    padding: 8px 14px;
    border-radius: 8px;
  }
  
  @media (max-width: 400px) {
    .bp-name {
      font-size: 1.1rem;
      padding: 7px 12px;
    }
  }
  
  .bp-address {
    font-size: 0.88rem;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    line-height: 1.3;
    border: 2px solid rgba(255,255,255,0.3);
    background: rgba(0,0,0,0.15);
    padding: 8px 14px;
    border-radius: 8px;
  }
  
  @media (max-width: 400px) {
    .bp-address {
      font-size: 0.84rem;
      padding: 7px 12px;
    }
  }
  
  .bp-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  
  .bp-stat-box {
    background: rgba(0,0,0,0.2);
    border: 2px solid rgba(255,255,255,0.25);
    border-radius: 10px;
    padding: 10px 14px;
    text-align: center;
  }
  
  .bp-stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    text-transform: lowercase;
    margin-bottom: 4px;
  }
  
  .bp-stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
  }
  
  @media (max-width: 400px) {
    .bp-stat-value {
      font-size: 1.3rem;
    }
  }
  
  /* ── Video Grid (Blue) ── */
  .bp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    background: #0a0a0a;
    padding: 2px;
  }
  
  .bp-video-card {
    position: relative;
    aspect-ratio: 9 / 16;
    background: linear-gradient(135deg, #2a4a5a 0%, #1a3040 100%);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .bp-video-card:active {
    transform: scale(0.98);
  }
  
  .bp-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .bp-video-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);
    padding: 8px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .bp-video-name {
    font-size: 0.7rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
    line-height: 1.2;
    text-shadow: 0 1px 4px rgba(0,0,0,0.8);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  @media (min-width: 768px) {
    .bp-video-name {
      font-size: 0.8rem;
    }
  }
  
  /* ── Empty State ── */
  .bp-empty {
    grid-column: 1 / -1;
    padding: 60px 20px;
    text-align: center;
  }
  
  .bp-empty-icon {
    font-size: 3.5rem;
    margin-bottom: 12px;
    opacity: 0.5;
  }
  
  .bp-empty-text {
    font-size: 0.95rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
  }
  
  /* ── Loading ── */
  .bp-loading {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0a;
  }
  
  .bp-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255,107,53,0.2);
    border-top-color: #ff6b35;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default Profile;
