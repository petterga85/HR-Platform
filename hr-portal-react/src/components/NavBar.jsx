import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function NavBar(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () => { logout(); navigate('/login') }

  return (
    <div className="nav">
      <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap'}}>
        <div className="brand">HR<span className="muted">Portal</span></div>
        <div className="nav-links">
          {user && <NavLink to="/" end>Home</NavLink>}
          {user?.role === 'hr' && <NavLink to="/hr">HR</NavLink>}
          {user && <NavLink to="/me">My Profile</NavLink>}
          {user && <NavLink to="/leave">Leave</NavLink>}
          {!user && <NavLink to="/login">Login</NavLink>}
          {!user && <NavLink to="/signup">Sign Up</NavLink>}
          {user && <button className="button ghost" onClick={onLogout}>Logout</button>}
        </div>
      </div>
    </div>
  )
}
