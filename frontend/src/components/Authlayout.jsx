import React, { useEffect } from "react";

const AuthLayout = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --bg: #f7f7f8; --card: #ffffff; --border: #e8e8ec;
        --text: #181818; --sub: #888899; --accent: #ff6b35;
        --accent2: #27ae60; --accent-bg: #fff4ef;
        --input-bg: #f5f5f8; --shadow: 0 2px 16px rgba(0,0,0,0.07);
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #111113; --card: #1c1c1f; --border: #2a2a2e;
          --text: #f0f0f0; --sub: #888899; --accent: #ff7a45;
          --accent2: #2ecc71; --accent-bg: #1f1512;
          --input-bg: #25252a; --shadow: 0 2px 16px rgba(0,0,0,0.4);
        }
      }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
      .auth-page { min-height: 100vh; display: flex; justify-content: center; align-items: flex-start; padding: 24px 16px 48px; }
      .auth-card { width: 100%; max-width: 420px; background: var(--card); border-radius: 24px; padding: 32px 24px; box-shadow: var(--shadow); animation: fadeUp 0.3s ease both; }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      .page-icon { width: 58px; height: 58px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.7rem; margin-bottom: 18px; }
      .page-icon.orange { background: var(--accent-bg); }
      .page-icon.green  { background: #eafaf1; }
      @media (prefers-color-scheme: dark) { .page-icon.green { background: #0f2116; } }
      .page-title { font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 4px; }
      .page-sub   { font-size: 0.87rem; color: var(--sub); margin-bottom: 26px; font-weight: 600; }
      .form-group { margin-bottom: 13px; }
      .form-label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--sub); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.05em; }
      .form-input { width: 100%; padding: 13px 14px; border-radius: 12px; border: 1.5px solid var(--border); background: var(--input-bg); color: var(--text); font-family: 'Nunito', sans-serif; font-size: 0.95rem; font-weight: 600; outline: none; transition: border-color 0.2s, box-shadow 0.2s; -webkit-appearance: none; }
      .form-input::placeholder { color: var(--sub); font-weight: 400; }
      .form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(255,107,53,0.1); background: var(--card); }
      .form-input.green:focus { border-color: var(--accent2); box-shadow: 0 0 0 3px rgba(39,174,96,0.1); }
      .btn-main { width: 100%; padding: 14px; border-radius: 14px; border: none; font-family: 'Nunito', sans-serif; font-size: 1rem; font-weight: 800; color: #fff; cursor: pointer; margin-top: 8px; transition: transform 0.15s, box-shadow 0.15s; }
      .btn-main:active { transform: scale(0.98); }
      .btn-orange { background: var(--accent); box-shadow: 0 4px 16px rgba(255,107,53,0.35); }
      .btn-green  { background: var(--accent2); box-shadow: 0 4px 16px rgba(39,174,96,0.3); }
      .auth-switch { text-align: center; margin-top: 18px; font-size: 0.87rem; color: var(--sub); font-weight: 600; }
      .auth-switch a { font-weight: 800; text-decoration: none; margin-left: 4px; }
      .auth-switch a.orange { color: var(--accent); }
      .auth-switch a.green  { color: var(--accent2); }
      .divider { display: flex; align-items: center; gap: 10px; margin: 20px 0 16px; }
      .div-line { flex: 1; height: 1px; background: var(--border); }
      .div-txt  { font-size: 0.72rem; font-weight: 700; color: var(--sub); text-transform: uppercase; letter-spacing: 0.07em; }
      .switch-pill { display: flex; align-items: center; justify-content: space-between; padding: 13px 15px; border-radius: 14px; border: 1.5px solid var(--border); background: var(--input-bg); cursor: pointer; transition: border-color 0.2s; text-decoration: none; }
      .switch-pill.orange:hover { border-color: var(--accent); }
      .switch-pill.green:hover  { border-color: var(--accent2); }
      .switch-pill-left { display: flex; align-items: center; gap: 11px; }
      .switch-pill-emoji { font-size: 1.3rem; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
      .switch-pill-emoji.orange { background: var(--accent-bg); }
      .switch-pill-emoji.green  { background: #eafaf1; }
      @media (prefers-color-scheme: dark) { .switch-pill-emoji.green { background: #0f2116; } }
      .switch-pill-lbl  { font-size: 0.75rem; color: var(--sub); font-weight: 600; }
      .switch-pill-name { font-size: 0.92rem; font-weight: 800; color: var(--text); }
      .not-found { padding: 48px 0; display: flex; flex-direction: column; align-items: center; text-align: center; }
      .nf-emoji { font-size: 3.5rem; margin-bottom: 14px; }
      .nf-code  { font-size: 3.5rem; font-weight: 800; color: var(--accent); line-height: 1; margin-bottom: 6px; }
      .nf-title { font-size: 1.2rem; font-weight: 800; margin-bottom: 8px; }
      .nf-desc  { font-size: 0.86rem; color: var(--sub); font-weight: 600; margin-bottom: 24px; line-height: 1.6; }
      .nf-btns  { display: flex; flex-direction: column; gap: 10px; width: 100%; }
    `}</style>
  );
};

export default AuthLayout;
