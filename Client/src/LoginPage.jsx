import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import userImage from "./Images/UserProfile.jpg"; // Replace with the actual path
import logoImage from "./Images/COT.png"; // Replace with the actual path
import backgroundImage from "./Images/pci.jpg"; // Replace with your background path

// Styled components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-direction: column;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(244, 194, 194, 0.8);
  z-index: 1;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  z-index: 2;
`;

const Logo = styled.img`
  height: 80px;
  margin-bottom: 10px;
`;

const HeaderText = styled.h2`
  color: #fff;
  font-size: 1.5em;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  width: 320px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const UserName = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5em;
  color: #d16b6b;
`;

const PinInputContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`;

const PinInput = styled.input`
  width: 40px;
  height: 40px;
  font-size: 1.5em;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #333;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #f28b8b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f06b6b;
  }
`;

function LoginPage() {
  const pinRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
  const recaptchaRef = useRef(null);
  const navigate = useNavigate(); // Use navigate for routing after login

  const handlePinChange = (index, event) => {
    const value = event.target.value;
    if (value.length === 1 && index < 5) {
      pinRefs.current[index + 1].current.focus();
    } else if (value.length === 0 && index > 0) {
      pinRefs.current[index - 1].current.focus();
    }
  };

  const handleLogin = () => {
    const recaptchaValue = recaptchaRef.current.getValue(); // Get reCAPTCHA token
    const pinValues = pinRefs.current.map((ref) => ref.current.value).join("");

    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    if (pinValues.length !== 6) {
      alert("Please enter a 6-digit PIN.");
      return;
    }

    console.log("reCAPTCHA token:", recaptchaValue);
    console.log("Entered PIN:", pinValues);

    // Send the reCAPTCHA token to your backend for verification
    axios
      .post("/verify-recaptcha", { token: recaptchaValue })
      .then((response) => {
        console.log(response.data.message); // Success message
      })
      .catch((error) => {
        console.error("reCAPTCHA verification failed:", error);
        alert("reCAPTCHA verification failed. Please try again.");
      })
      // After successful verification, navigate to ScanItem page
      navigate("/scanItems");
      
  };
  
  return (
    <PageContainer>
      <Overlay />
      <LogoContainer>
        <Logo src={logoImage} alt="BSU Logo" />
        <HeaderText>College of Technology</HeaderText>
      </LogoContainer>
      <LoginBox>
        <UserImage src={userImage} alt="User" />
        <UserName>Maloi</UserName>
        <PinInputContainer>
          {pinRefs.current.map((ref, index) => (
            <PinInput
              key={index}
              ref={ref}
              type="password"
              maxLength="1"
              onChange={(e) => handlePinChange(index, e)}
            />
          ))}
        </PinInputContainer>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfKBW8qAAAAAPxhoHFtw2jH_KLYbWZdTxmsjcop" // Replace with your actual site key
        />
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </LoginBox>
    </PageContainer>
    
  );
}


export default LoginPage;