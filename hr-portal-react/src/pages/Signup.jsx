import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import EmployeeForm from '../components/EmployeeForm'

export default function Signup(){
  const { signup } = useAuth()
  const [account, setAccount] = useState({ name:'', email:'', password:'' })
  const [profile, setProfile] = useState({})
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    try{
      signup({ ...account, ...profile, role:'employee' })
      navigate('/')
    }catch(err){ setError(err.message) }
  }

  return (
    <div className="container" style={{maxWidth:800}}>
      <div className="card">
        <h2>Employee Registration</h2>
        <p className="small">Create your account and provide your personal details.</p>
        {error && <p style={{color:'var(--danger)'}}>{error}</p>}
        <form onSubmit={submit} className="grid">
          <div className="card" style={{background:'transparent', border:'1px dashed rgba(255,255,255,0.1)'}}>
            <h3>Account</h3>
            <div className="form-row">
              <label>Full Name</label>
              <input className="input" value={account.name} onChange={e=>setAccount({...account, name:e.target.value})} required />
            </div>
            <div className="form-row two">
              <div>
                <label>Email</label>
                <input type="email" className="input" value={account.email} onChange={e=>setAccount({...account, email:e.target.value})} required />
              </div>
              <div>
                <label>Password</label>
                <input type="password" className="input" value={account.password} onChange={e=>setAccount({...account, password:e.target.value})} required />
              </div>
            </div>
          </div>
          <div className="card" style={{background:'transparent', border:'1px dashed rgba(255,255,255,0.1)'}}>
            <h3>Personal Details</h3>
            <EmployeeForm value={profile} onChange={setProfile} />
          </div>
          <button className="button" type="submit">Create Account</button>
        </form>
      </div>
    </div>
  )
}
