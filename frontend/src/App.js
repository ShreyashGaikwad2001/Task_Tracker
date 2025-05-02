import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // Check localStorage for the token

  // Fetch token on initial mount and subscribe to token changes
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);  // Update state with the stored token if exists
  }, []); // Only runs on mount

  // Logout function to clear the token
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null); // Update token state to trigger a re-render
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? '/dashboard' : '/login'} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
