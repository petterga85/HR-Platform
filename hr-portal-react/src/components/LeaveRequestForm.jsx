import React, { useState } from 'react'

export default function LeaveRequestForm({ onSubmit }){
  const [form, setForm] = useState({ startDate:'', endDate:'', reason:'' })

  const submit = (e) => { e.preventDefault(); onSubmit && onSubmit(form); setForm({ startDate:'', endDate:'', reason:'' }) }

  return (
    <form onSubmit={submit} className="card">
      <h3>Request Leave</h3>
      <div className="form-row two">
        <div><label>Start Date</label><input type="date" className="input" value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})} required /></div>
        <div><label>End Date</label><input type="date" className="input" value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})} required /></div>
      </div>
      <div className="form-row">
        <div><label>Reason</label><textarea className="input" value={form.reason} onChange={e=>setForm({...form, reason:e.target.value})} required /></div>
      </div>
      <button className="button">Submit Request</button>
    </form>
  )
}
