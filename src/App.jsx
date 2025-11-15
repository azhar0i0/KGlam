import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Auth/Signin";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Management from "./pages/Managment";
import ProfilePage from "./pages/ProfilePage";
import Customers from "./pages/Customers";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to Signin */}
        <Route path="/" element={<Navigate to="/signin" />} />

        {/* Auth routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* Layout wrapper for main routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/management" element={<Management />} />
          <Route path="/profile/:id" element={<ProfilePage /> } />
          <Route path="/customers" element={<Customers />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen text-2xl">
              Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
