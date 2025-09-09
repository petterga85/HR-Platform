import React from 'react'
import { useAuth } from '../AuthContext'
import EmployeeDashboard from './employee/EmployeeDashboard'

export default function Profile(){
  // Reuse EmployeeDashboard section for simplicity
  return <EmployeeDashboard />
}
