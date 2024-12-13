import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  Avatar,
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  CssBaseline,
} from "@mui/material";
import { FaUsers, FaBox, FaChartLine } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import UserList from "./Userlist";
import ProductList from "./Productlist";
import TotalSales from "./TotalSales";
import AdminProfile from "./AdminProfile";
import axios from "axios";

function Dashboard() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const drawerWidth = 240;

  // Fetch admin data based on the current token in localStorage
  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/"); // Redirect to login if no token is found
        return;
      }

      try {
        // Set token in Authorization header for admin API call
        const response = await axios.get("http://localhost:8000/api/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        // Redirect to login if token is invalid or expired
        navigate("/admin-login");
      }
    };

    fetchAdminData();
  }, [navigate]); // Trigger effect on initial load and on navigate change

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setAdmin(null); // Clear the admin data
    setLoading(true); // Set loading to true until new token is fetched
    navigate("/"); // Redirect to login page
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh", // Full height of the viewport
        background: "linear-gradient(135deg, #4b6cb7, #182848)",
        color: "white",
        paddingTop: 3,
        paddingBottom: 3,
      }}
    >
      {/* Admin Profile */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
        component={Link}
        to="/admin-profile"
        style={{ textDecoration: "none" }}
      >
        <Avatar
          alt="Admin Profile"
          src={`http://localhost:8000/${admin?.image || "default-avatar.png"}`}
          sx={{
            width: 90,
            height: 90,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            border: "2px solid white",
          }}
        />
        <Typography
          variant="h6"
          sx={{ mt: 1, color: "white", fontWeight: "bold", textAlign: "center" }}
        >
          {admin?.firstname}
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)" }} />

      {/* Navigation Links */}
      <List sx={{ mt: 2 }}>
        <ListItem
          button
          component={Link}
          to="/user-list"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            padding: "12px",
            marginBottom: 2,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)", // Only change background color on hover
            },
          }}
        >
          <FaUsers size={40} />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Users
          </Typography>
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/product-list"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            padding: "12px",
            marginBottom: 2,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)", // Only change background color on hover
            },
          }}
        >
          <FaBox size={40} />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Products
          </Typography>
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/total-sales"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            padding: "12px",
            marginBottom: 2,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)", // Only change background color on hover
            },
          }}
        >
          <FaChartLine size={40} />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Sales
          </Typography>
        </ListItem>
      </List>

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Tooltip title="Logout">
          <IconButton
            onClick={handleLogout}
            sx={{
              backgroundColor: "rgba(255,0,0,0.8)",
              color: "white",
              width: "100%",
              "&:hover": {
                backgroundColor: "rgba(255,0,0,1)",
              },
              padding: "16px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <IoLogOut />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>; // Loading state while fetching admin data
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: 10, // Ensures sidebar is clickable
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          ml: 0, // Removes extra spacing caused by sidebar
          width: `calc(100% - ${drawerWidth}px)`, // Deduct sidebar width
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Routes>
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/total-sales" element={<TotalSales />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
