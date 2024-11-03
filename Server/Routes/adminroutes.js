import express from "express";

const router = express.Router();

// Example admin route
router.get("/dashboard", (req, res) => {
  res.json({ message: "Admin dashboard data" });
});

router.post("/create-user", (req, res) => {
  res.json({ message: "User created by admin" });
});

export default router;