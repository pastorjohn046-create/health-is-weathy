/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Pharmacy from './pages/Pharmacy';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing session
    const authStatus = localStorage.getItem('nexus_auth');
    setIsAuthenticated(authStatus === 'true');

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthSuccess = () => {
    localStorage.setItem('nexus_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('nexus_auth');
    setIsAuthenticated(false);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (showSplash) return <div className="bg-white min-h-screen" />;
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      <Routes>
        <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/signup" element={<SignUp onAuthSuccess={handleAuthSuccess} />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/profile" element={<Profile onSignOut={handleSignOut} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
