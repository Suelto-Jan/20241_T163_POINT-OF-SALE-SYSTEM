import React from "react";
import { useNavigate } from "react-router-dom";
import bsuLogo from "./Images/BSU LOGO.png";
import userImage from "./Images/UserProfile.jpg";
import backgroundImage from "./Images/pci.jpg";
import cotlogo from "./Images/COT.png";

const users = [
  { name: "Aliah", image: "https://via.placeholder.com/100" },
  { name: "Colet", image: "https://via.placeholder.com/100" },
  { name: "Maloi", image: userImage },
  { name: "Gwen", image: "https://via.placeholder.com/100" },
  { name: "Stacey", image: "https://via.placeholder.com/100" },
  { name: "Mikha", image: "https://via.placeholder.com/100" },
  { name: "Jhoanna", image: "https://via.placeholder.com/100" },
  { name: "Sheena", image: "https://via.placeholder.com/100" },
];

function LoginSelectionPage() {
  const navigate = useNavigate();

  const handleUserClick = (userName) => {
    navigate("/login", { state: { user: userName } });
  };

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "black",
      }}
    >
      {/* Semi-transparent overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(244, 194, 194, 0.8)", // Overlay with faded effect
          zIndex: 1,
        }}
      ></div>

      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 30px",
          backgroundColor: "#f8b8b8",
          zIndex: 2, // Above overlay
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={bsuLogo} alt="BSU Logo" style={{ height: "80px" }} />
          <img src={cotlogo} alt="COT Logo" style={{ height: "80px" }} />
        </div>
        <h2 className="ID2">College of Technology</h2>
        <button className="Button"onClick={() => navigate("/register")} style={{ padding: "10px 20px" }}>Register</button>
      </header>

      <h2 style={{ marginTop: "20px", zIndex: 2 }}>Choose user to login</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "20px",
          maxWidth: "80%",
          margin: "auto",
          zIndex: 2, // Above overlay
        }}
      >
        {users.map((user, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              src={user.image}
              alt={user.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleUserClick(user.name)}
            />
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoginSelectionPage;