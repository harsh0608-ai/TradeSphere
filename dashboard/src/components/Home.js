import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);

  // If no token, redirect to login
  if (!cookies.token) {
    navigate("/login");
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Redirecting to login...</div>;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
      <ToastContainer />
    </>
  );
};

export default Home;