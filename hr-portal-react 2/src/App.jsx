import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Leave from './pages/Leave'
import HRDashboard from './pages/hr/HRDashboard'

export default function App(){
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/me" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/leave" element={
          <ProtectedRoute>
            <Leave />
          </ProtectedRoute>
        } />
        <Route path="/hr" element={
          <ProtectedRoute roles={['hr']}>
            <div className="container">
              <HRDashboard />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <div className="footer">HR Portal Demo • Built with React + Vite • Local JSON storage</div>
    </AuthProvider>
  )
}
