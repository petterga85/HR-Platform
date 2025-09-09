import React, { useMemo } from 'react'
import { useAuth } from '../../AuthContext'
import EmployeeForm from '../../components/EmployeeForm'
import LeaveRequestForm from '../../components/LeaveRequestForm'
import LeaveList from '../../components/LeaveList'

export default function EmployeeDashboard({ compact }){
  const { db, user, updateProfile, createLeave } = useAuth()
  const myProfile = db.profiles[user.id] || { userId: user.id }
  const myLeaves = useMemo(() => db.leaves.filter(l => l.userId === user.id).map(l => ({...l, employeeName:user.name})), [db.leaves, user])

  return (
    <div className="grid cols-2">
      <div className="card">
        <h3>My Profile</h3>
        <div className="form-row">
          <label>Full Name</label>
          <input className="input" value={user.name} onChange={e=>{/* name is not editable by employee in this demo */}} readOnly/>
          <p className="small">Name changes are handled by HR.</p>
        </div>
        <EmployeeForm value={myProfile} onChange={(p)=>updateProfile(user.id, p)} />
      </div>
      <div className="grid" style={{gap:'1rem'}}>
        <LeaveRequestForm onSubmit={(form)=>createLeave({ ...form, userId:user.id })} />
        <LeaveList leaves={myLeaves} />
      </div>
    </div>
  )
}
