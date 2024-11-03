import React, { useState } from "react";
import styled from "styled-components";
import bsuLogo from "../Images/busku.png"; 
import profileImage from "../Images/UserProfile.jpg";
import backgroundImage from "../Images/pci.jpg"; // Background image

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  position: relative;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  margin-bottom: 20px;
  z-index: 2;

  img {
    height: 50px;
  }

  h2 {
    color: #fff;
    font-size: 1.2rem;
  }

  button {
    padding: 10px 20px;
    background-color: white;
    color: black;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 10px;
  display: flex;
  gap: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  align-items: center;
  z-index: 2;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 250px;
`;

const PinInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  font-size: 1.5em;
  text-align: center;
  letter-spacing: 8px;
  box-sizing: border-box;
  color: #333;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #f28b8b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #f06b6b;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  img {
    width: 150px;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const Title = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  z-index: 2;
  margin-bottom: 20px;
`;

function RegistrationPage() {
  const [pin, setPin] = useState("");

  const handlePinChange = (e) => {
    const value = e.target.value;
    // Only allow numeric input and max 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setPin(value);
    }
  };

  return (
    <Container>
      <Overlay />
      <Header>
        <img src={bsuLogo} alt="BSU Logo" />
        <h2 className="text">College of Technology</h2>
        <button className="Button"
          onClick={() => (window.location.href = "/login")}
          style={{
            margin: "0 10px",
            padding: "10px 20px",
            backgroundColor: "white",
            border: "1px solid black",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </Header>
      <Title>Registration Form</Title>
      <FormContainer>
        <Form>
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Last Name" />
          <Input type="email" placeholder="Email" />
          <Input type="tel" placeholder="Phone Number" />
          <PinInput
            type="password" // Change to password to hide input
            placeholder="Enter PIN"
            value={pin}
            onChange={handlePinChange}
            maxLength="6"
          />
          <Button type="submit">Create Account</Button>
        </Form>
        <ImageContainer>
          <img src={profileImage} alt="User Profile" />
          <Button>Upload Image</Button>
        </ImageContainer>
      </FormContainer>
    </Container>
  );
}

export default RegistrationPage;