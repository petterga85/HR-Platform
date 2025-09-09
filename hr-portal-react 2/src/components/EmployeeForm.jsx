import React, { useState, useEffect } from 'react'

export default function EmployeeForm({ value, onChange }){
  const [form, setForm] = useState(value || {})
  useEffect(() => setForm(value || {}), [value])

  const set = (k, v) => {
    const next = { ...form, [k]: v }
    setForm(next)
    onChange && onChange(next)
  }

  return (
    <div className="grid">
      <div className="form-row two">
        <div><label>First Name</label><input className="input" value={form.firstName||''} onChange={e=>set('firstName', e.target.value)} /></div>
        <div><label>Last Name</label><input className="input" value={form.lastName||''} onChange={e=>set('lastName', e.target.value)} /></div>
      </div>
      <div className="form-row two">
        <div><label>Phone</label><input className="input" value={form.phone||''} onChange={e=>set('phone', e.target.value)} /></div>
        <div><label>Address</label><input className="input" value={form.address||''} onChange={e=>set('address', e.target.value)} /></div>
      </div>
      <div className="form-row two">
        <div><label>Department</label><input className="input" value={form.department||''} onChange={e=>set('department', e.target.value)} /></div>
        <div><label>Start Date</label><input type="date" className="input" value={form.startDate||''} onChange={e=>set('startDate', e.target.value)} /></div>
      </div>
      <div className="form-row">
        <div><label>Emergency Contact</label><input className="input" value={form.emergencyContact||''} onChange={e=>set('emergencyContact', e.target.value)} /></div>
      </div>
    </div>
  )
}
