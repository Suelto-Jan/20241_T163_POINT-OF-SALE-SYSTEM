import React, { useState } from "react";
import "./HomePage.css";
import buksuLogo from "./Images/BSU LOGO.png";
import collegeLogo from "./Images/COT.png";

function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Functions to open and close the modal
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <div className="Main">
      {/* Semi-transparent overlay */}
      <div
        className="blurred"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(244, 194, 194, 0.8)",
          zIndex: 1,
        }}
      ></div>

      {/* Login and Register buttons */}
      <header
        className="popo"
        style={{
          position: "absolute",
          top: "20px",
          right: "70px",
          gap: "20px",
          display: "flex",
          zIndex: 2,
        }}
      >
        <button className="Button" onClick={openLoginModal}>
          Login
        </button>
        <button className="Button" onClick={() => window.location.href = "/register"}>
          Register
        </button>
      </header>

      {/* Centered logos and text */}
      <div className="style1">
        <div>
          <img className="img" src={buksuLogo} alt="BSU Logo" />
          <img className="img" src={collegeLogo} alt="COT" />
        </div>
        <h1 className="BSU">Bukidnon State University</h1>
        <h2 className="COT">College of Technology</h2>
      </div>

      {/* Login modal */}
      {showLoginModal && (
        <div className="modal-overlay" style={modalOverlayStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h3>Select Login Type</h3>
            <button className="Button" onClick={() => window.location.href = "/admin-login"}>
              Login as Admin
            </button>
            <button className="Button" onClick={() => window.location.href = "/loginselection"}>
              Login as Customer
            </button>
            <button className="Cancel" onClick={closeLoginModal} style={{ marginTop: "10px" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal styles (can be moved to CSS file for better management)
const modalOverlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 3,
};

const modalContentStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
};

export default HomePage;