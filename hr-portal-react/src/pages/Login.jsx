import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login(){
  const { login } = useAuth()
  const [email, setEmail] = useState('hr@company.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    try{
      login(email, password)
      navigate('/')
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="container" style={{maxWidth:520}}>
      <div className="card">
        <h2>Welcome back</h2>
        <p className="small">Use the seeded HR account (hr@company.com / password) or sign up as an employee.</p>
        {error && <p style={{color:'var(--danger)'}}>{error}</p>}
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button className="button" type="submit">Login</button>
        </form>
      </div>
      <p className="small">No account? <Link to="/signup">Sign up</Link></p>
    </div>
  )
}
