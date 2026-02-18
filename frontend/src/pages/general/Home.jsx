import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

/* ══════════════════════════════════════
   HOME PAGE - REELS STYLE FEED - OPTIMIZED FOR MOBILE
══════════════════════════════════════ */

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((response) => {
        setFoods(response.data.foodItems);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
      });
  }, []);

  // Reset scroll to top when component mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  // Track active video for auto-play with better scroll handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const index = Math.round(container.scrollTop / window.innerHeight);
        if (index !== activeIndex) {
          setActiveIndex(index);
        }
      }, 50); // Reduced timeout for better responsiveness
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <>
      <style>{`
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden;
          background: #000;
        }
        
        .reels-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100dvh; /* Use dynamic viewport height */
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          background: #000;
          scroll-snap-stop: always;
        }
        
        .reels-container::-webkit-scrollbar { 
          display: none; 
        }
        
        .reels-container { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
        
        .reel {
          position: relative;
          height: 100dvh; /* Use dynamic viewport height */
          width: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          overflow: hidden;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Mobile First - Full screen video */
        .reel-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover; /* This ensures video covers full screen */
          background: #000;
          z-index: 0;
        }
        
        /* Overlay gradients - lighter on mobile */
        .reel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            0deg, 
            rgba(0,0,0,0.5) 0%, 
            rgba(0,0,0,0.2) 30%, 
            transparent 50%,
            rgba(0,0,0,0.1) 80%,
            rgba(0,0,0,0.3) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
        
        /* Header section - top gradient */
        .reel-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 50px 16px 20px 16px;
          padding-top: calc(env(safe-area-inset-top, 0px) + 40px);
          background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%);
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .reel-partner-avatar {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8952 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          border: 2.5px solid #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          text-transform: uppercase;
        }
        
        .reel-partner-name {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          letter-spacing: 0.3px;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        /* Content section - bottom */
        .reel-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 30px 16px 30px 16px;
          padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 30px);
          background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%);
          z-index: 2;
        }
        
        .reel-name {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1.2;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0,0,0,0.7);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        
        .reel-desc-wrapper {
          margin-bottom: 20px;
        }
        
        .reel-desc {
          font-size: 1rem;
          line-height: 1.4;
          color: rgba(255,255,255,0.95);
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          font-weight: 500;
        }
        
        .reel-desc.collapsed {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .reel-desc.expanded {
          display: block;
        }
        
        .see-more-btn {
          background: none;
          border: none;
          color: #ff9f7c;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 4px 0;
          margin-top: 4px;
          font-family: inherit;
          display: inline-block;
          text-transform: lowercase;
        }
        
        .see-more-btn::first-letter {
          text-transform: uppercase;
        }
        
        .reel-btn {
          width: 100%;
          padding: 16px 20px;
          border-radius: 30px;
          border: none;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8952 100%);
          color: #fff;
          font-family: inherit;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(255,107,53,0.4);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.3px;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(255,255,255,0.2);
        }
        
        .reel-btn:active {
          transform: scale(0.98);
          box-shadow: 0 4px 12px rgba(255,107,53,0.5);
        }
        
        .reel-btn-icon {
          font-size: 1.3rem;
        }
        
        /* Play/Pause Indicator */
        .play-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          pointer-events: none;
          opacity: 0;
          z-index: 10;
          transition: opacity 0.2s ease;
          border: 2px solid rgba(255,255,255,0.3);
        }
        
        .play-indicator.show {
          opacity: 1;
          animation: indicatorPop 0.25s ease-out;
        }
        
        @keyframes indicatorPop {
          0% { 
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        
        /* Desktop styles - keep original for larger screens */
        @media (min-width: 768px) {
          .reels-container {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1410 50%, #0a0a0a 100%);
          }
          
          .reel {
            background: #0a0a0a;
          }
          
          .reel::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(100vh * 9 / 16 + 4px);
            height: calc(100vh + 4px);
            background: linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,137,82,0.1));
            border-radius: 12px;
            z-index: 0;
            box-shadow: 0 0 80px rgba(255,107,53,0.2);
          }
          
          .reel-video {
            position: relative;
            width: auto;
            height: 100vh;
            max-width: calc(100vh * 9 / 16);
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
          }
          
          .reel-overlay {
            left: 50%;
            transform: translateX(-50%);
            width: calc(100vh * 9 / 16);
            border-radius: 12px;
            background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%);
          }
          
          .reel-header {
            left: 50%;
            transform: translateX(-50%);
            width: calc(100vh * 9 / 16);
            border-radius: 12px 12px 0 0;
            background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%);
          }
          
          .reel-content {
            left: 50%;
            transform: translateX(-50%);
            width: calc(100vh * 9 / 16);
            border-radius: 0 0 12px 12px;
          }
          
          .reel-partner-avatar {
            width: 48px;
            height: 48px;
            font-size: 1.2rem;
          }
          
          .reel-name {
            font-size: 1.8rem;
          }
          
          .reel-desc {
            font-size: 1.1rem;
          }
          
          .reel-btn {
            padding: 18px 24px;
            font-size: 1.2rem;
          }
        }
        
        /* Small height devices */
        @media (max-height: 700px) {
          .reel-name {
            font-size: 1.3rem;
            margin-bottom: 4px;
          }
          
          .reel-desc {
            font-size: 0.95rem;
          }
          
          .reel-desc-wrapper {
            margin-bottom: 12px;
          }
          
          .reel-btn {
            padding: 12px 16px;
            font-size: 1rem;
          }
        }
        
        /* iPhone SE and small phones */
        @media (max-width: 375px) {
          .reel-name {
            font-size: 1.3rem;
          }
          
          .reel-desc {
            font-size: 0.9rem;
          }
          
          .reel-partner-avatar {
            width: 38px;
            height: 38px;
            font-size: 1rem;
          }
          
          .reel-partner-name {
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="reels-container" ref={containerRef}>
        {foods.map((food, index) => (
          <ReelItem
            key={food._id}
            food={food}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </>
  );
};

/* ── Single Reel Item ── */
const ReelItem = ({ food, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const descRef = useRef(null);

  // Check if description needs "see more" button
  useEffect(() => {
    if (descRef.current && food.description) {
      const lineHeight = parseFloat(
        getComputedStyle(descRef.current).lineHeight,
      );
      const maxHeight = lineHeight * 2;
      const actualHeight = descRef.current.scrollHeight;
      setShowSeeMore(actualHeight > maxHeight + 5); // Added threshold
    }
  }, [food.description]);

  // Handle video playback based on active state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.currentTime = 0;
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Playback failed:", err);
        setIsPlaying(false);
      }
    };

    const pauseVideo = () => {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    };

    if (isActive) {
      playVideo();
    } else {
      pauseVideo();
      setIsDescExpanded(false);
    }

    // Cleanup
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [isActive]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }

    // Show indicator
    setShowIndicator(true);
    setTimeout(() => setShowIndicator(false), 400);
  };

  const getInitials = (name) => {
    if (!name) return "🍽";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleVisitStore = () => {
    console.log("Visit store:", food.foodPartner?._id);
    // navigate(`/store/${food.foodPartner?._id}`)
  };

  return (
    <div className="reel">
      <video
        ref={videoRef}
        className="reel-video"
        src={food.video}
        loop
        playsInline
        muted
        onClick={togglePlayPause}
        preload="auto"
        disablePictureInPicture
      />

      <div className="reel-overlay" />

      <div className={`play-indicator ${showIndicator ? "show" : ""}`}>
        {isPlaying ? "⏸️" : "▶️"}
      </div>

      <div className="reel-header">
        <div className="reel-partner-avatar">
          {getInitials(food.foodPartner?.businessName)}
        </div>
        <div className="reel-partner-name">
          {food.foodPartner?.businessName || "Store"}
        </div>
      </div>

      <div className="reel-content">
        <div className="reel-name">{food.name}</div>

        {food.description && (
          <div className="reel-desc-wrapper">
            <div
              ref={descRef}
              className={`reel-desc ${isDescExpanded ? "expanded" : "collapsed"}`}
            >
              {food.description}
            </div>
            {showSeeMore && (
              <button
                className="see-more-btn"
                onClick={() => setIsDescExpanded(!isDescExpanded)}
              >
                {isDescExpanded ? "show less" : "show more"}
              </button>
            )}
          </div>
        )}

        <button className="reel-btn" onClick={handleVisitStore}>
          <span className="reel-btn-icon">🏪</span>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/food-partner-profile"
          >
            <span>Visit Store</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
