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
    axios
      .get(`http://localhost:3000/api/food-partner/${partnerId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
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
        .toUpperCase() || "R"
    );
  };

  const handleVideoClick = (foodId) => {
    navigate(`/?food=${foodId}`);
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="profile-loading">
          <div className="loading-spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="profile-page">
        {/* Header with back button */}
        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {/* Profile Info Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            {getInitials(partner?.businessName)}
          </div>
          <div className="profile-name">
            {partner?.businessName || "Restaurant"}
          </div>
          <div className="profile-address">
            📍 {partner?.address || "Location"}
          </div>

          {/* Stats Row */}
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">{foods.length}</div>
              <div className="stat-label">Meals</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">
                {partner?.customersServed || "0"}
              </div>
              <div className="stat-label">Served</div>
            </div>
          </div>
        </div>

        {/* Meals Section Title */}
        <div className="meals-header">
          <span className="meals-title">All Meals</span>
          <span className="meals-count">{foods.length}</span>
        </div>

        {/* Video Grid */}
        <div className="video-grid">
          {foods.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍽️</div>
              <div className="empty-text">No meals available</div>
            </div>
          ) : (
            foods.map((food) => (
              <div
                key={food._id}
                className="video-item"
                onClick={() => handleVideoClick(food._id)}
              >
                <video
                  className="video-thumb"
                  src={food.video}
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="video-overlay">
                  <span className="video-name">{food.name}</span>
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
  
  :root {
    --bg: #f7f7f8;
    --card: #ffffff;
    --border: #e8e8ec;
    --text: #181818;
    --sub: #888899;
    --accent: #ff6b35;
    --shadow: 0 2px 16px rgba(0,0,0,0.07);
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #111113;
      --card: #1c1c1f;
      --border: #2a2a2e;
      --text: #f0f0f0;
      --sub: #888899;
      --accent: #ff7a45;
      --shadow: 0 2px 16px rgba(0,0,0,0.4);
    }
  }
  
  body {
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--text);
  }
  
  .profile-page {
    min-height: 100vh;
    background: var(--bg);
    padding-bottom: 24px;
  }
  
  /* ── Header ── */
  .profile-header {
    padding: 16px;
    background: var(--card);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .back-btn {
    background: transparent;
    border: 1.5px solid var(--border);
    color: var(--text);
    padding: 8px 16px;
    border-radius: 10px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .back-btn:active {
    transform: scale(0.96);
    background: var(--bg);
  }
  
  /* ── Profile Card ── */
  .profile-card {
    background: var(--card);
    margin: 16px;
    padding: 28px 20px 24px;
    border-radius: 20px;
    box-shadow: var(--shadow);
    text-align: center;
  }
  
  .profile-avatar {
    width: 90px;
    height: 90px;
    margin: 0 auto 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6b35 0%, #ff8952 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 800;
    color: #fff;
    box-shadow: 0 8px 24px rgba(255,107,53,0.3);
    text-transform: uppercase;
  }
  
  .profile-name {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 6px;
  }
  
  .profile-address {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--sub);
    margin-bottom: 20px;
  }
  
  .profile-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }
  
  .stat-item {
    flex: 1;
    text-align: center;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text);
    line-height: 1;
    margin-bottom: 4px;
  }
  
  .stat-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--sub);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .stat-divider {
    width: 1px;
    height: 40px;
    background: var(--border);
  }
  
  /* ── Meals Header ── */
  .meals-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px 12px;
  }
  
  .meals-title {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text);
  }
  
  .meals-count {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--sub);
    background: var(--card);
    padding: 4px 12px;
    border-radius: 20px;
    border: 1.5px solid var(--border);
  }
  
  /* ── Video Grid ── */
  .video-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    padding: 0 16px;
  }
  
  .video-item {
    position: relative;
    aspect-ratio: 9 / 16;
    background: var(--card);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: var(--shadow);
    transition: transform 0.2s;
  }
  
  .video-item:active {
    transform: scale(0.96);
  }
  
  .video-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .video-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);
    padding: 8px 6px;
  }
  
  .video-name {
    font-size: 0.7rem;
    font-weight: 700;
    color: #fff;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
    text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  }
  
  /* ── Empty State ── */
  .empty-state {
    grid-column: 1 / -1;
    padding: 60px 20px;
    text-align: center;
  }
  
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 10px;
    opacity: 0.3;
  }
  
  .empty-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--sub);
  }
  
  /* ── Loading ── */
  .profile-loading {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
  }
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255,107,53,0.2);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* ── Desktop ── */
  @media (min-width: 768px) {
    .profile-page {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .video-name {
      font-size: 0.75rem;
    }
  }
`;

export default Profile;
