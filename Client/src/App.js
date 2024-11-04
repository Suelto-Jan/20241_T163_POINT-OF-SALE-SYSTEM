
import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import LoginSelectionPage from "./LoginSelectionPage";
import ScanPage from "./ScanPage";


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
