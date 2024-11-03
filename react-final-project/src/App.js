
import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Client/HomePage";
import RegistrationPage from "./Client/RegistrationPage";
import LoginPage from "./Client/LoginPage";
import LoginSelectionPage from "./Client/LoginSelectionPage";
import ScanPage from "./Client/ScanPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginselection" element={<LoginSelectionPage />} />
        <Route path="/scanItems" element={<ScanPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
