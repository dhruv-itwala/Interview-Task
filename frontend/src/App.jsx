import React from "react";
import { Route, Routes } from "react-router-dom";
import Login_Signup from "./components/Login_Signup/Login_Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login_Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
