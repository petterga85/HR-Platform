import React, { useMemo, useState } from 'react'
import { useAuth } from '../../AuthContext'
import LeaveList from '../../components/LeaveList'
import EmployeeForm from '../../components/EmployeeForm'

export default function HRDashboard({ compact }){
  const { db, upsertUser, updateProfile, setLeaveStatus } = useAuth()
  const [selectedId, setSelectedId] = useState(null)

  const employees = useMemo(() => db.users.filter(u => u.role === 'employee'), [db.users])
  const current = employees.find(e => e.id === selectedId)

  const leaves = useMemo(() => db.leaves.map(l => ({
    ...l,
    employeeName: db.users.find(u => u.id === l.userId)?.name || 'Unknown'
  })), [db.leaves, db.users])

  return (
    <div className="grid cols-2">
      <div className="card">
        <h3>Employees</h3>
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Department</th><th></th></tr></thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{db.profiles[e.id]?.department || '-'}</td>
                <td><button className="button ghost" onClick={()=>setSelectedId(e.id)}>Edit</button></td>
              </tr>
            ))}
            {employees.length === 0 && <tr><td colSpan="4" className="small">No employees yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="grid" style={{gap:'1rem'}}>
        <div className="card">
          <h3>Profile Editor</h3>
          {current ? (
            <div className="grid">
              <div className="form-row">
                <label>Full Name</label>
                <input className="input" value={current.name} onChange={e=>upsertUser({ id: current.id, name:e.target.value })} />
              </div>
              <EmployeeForm value={db.profiles[current.id]} onChange={(p)=>updateProfile(current.id, p)} />
            </div>
          ) : <p className="small">Select an employee to edit their profile</p>}
        </div>
        <LeaveList
          leaves={leaves}
          onApprove={(id)=>setLeaveStatus(id,'approved')}
          onReject={(id)=>setLeaveStatus(id,'rejected')}
        />
      </div>
    </div>
  )
}
