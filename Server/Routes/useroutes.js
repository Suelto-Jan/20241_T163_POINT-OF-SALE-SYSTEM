import express from "express";

const router = express.Router();

// Example user route
router.get("/profile", (req, res) => {
  res.json({ message: "User profile data" });
});

router.post("/register", (req, res) => {
  res.json({ message: "User registered successfully" });
});

router.post("/login", (req, res) => {
  res.json({ message: "User logged in successfully" });
});

export default router;