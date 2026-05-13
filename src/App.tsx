/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Pharmacy from './pages/Pharmacy';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import HealthRecords from './pages/HealthRecords';
import VideoCall from './pages/VideoCall';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SplashScreen from './components/SplashScreen';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    // Check for existing session
    const authStatus = localStorage.getItem('pulse_auth');
    setIsAuthenticated(authStatus === 'true');

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthSuccess = () => {
    localStorage.setItem('pulse_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('pulse_auth');
    setIsAuthenticated(false);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (showSplash) return <div className="bg-white min-h-screen" />;
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/signup" element={<SignUp onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/video-call/:id" element={<ProtectedRoute><VideoCall /></ProtectedRoute>} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/records" element={<HealthRecords />} />
            <Route path="/profile" element={<Profile onSignOut={handleSignOut} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
