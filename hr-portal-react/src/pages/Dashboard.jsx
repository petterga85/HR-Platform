import React from 'react'
import { useAuth } from '../AuthContext'
import HRDashboard from './hr/HRDashboard'
import EmployeeDashboard from './employee/EmployeeDashboard'

export default function Dashboard(){
  const { user } = useAuth()
  return (
    <div className="container">
      <div className="grid cols-2">
        <div className="card">
          <h2>Welcome, {user?.name}</h2>
          <p className="small">Role: <b>{user?.role}</b></p>
          <p>This is your role-based dashboard. Use the navigation to access features.</p>
        </div>
        <div className="card">
          <h3>Quick Tips</h3>
          <ul>
            <li>Employees can update their profile and request leave.</li>
            <li>HR can manage employee records and approve or reject leave requests.</li>
          </ul>
        </div>
      </div>
      <div style={{marginTop:'1rem'}}>
        {user?.role === 'hr' ? <HRDashboard compact /> : <EmployeeDashboard compact />}
      </div>
    </div>
  )
}
