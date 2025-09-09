import React, { useMemo } from 'react'
import { useAuth } from '../AuthContext'
import LeaveRequestForm from '../components/LeaveRequestForm'
import LeaveList from '../components/LeaveList'

export default function Leave(){
  const { db, user, createLeave, setLeaveStatus } = useAuth()
  const allLeaves = useMemo(() => db.leaves.map(l => ({...l, employeeName: db.users.find(u=>u.id===l.userId)?.name || 'Unknown'})), [db.leaves, db.users])
  const myLeaves = useMemo(() => db.leaves.filter(l => l.userId === user.id).map(l => ({...l, employeeName: user.name})), [db.leaves, user])

  const isHR = user.role === 'hr'
  return (
    <div className="container grid" style={{gap:'1rem'}}>
      <div className="grid cols-2">
        {user.role === 'employee' && <LeaveRequestForm onSubmit={(form)=>createLeave({ ...form, userId:user.id })} />}
        <div className="card">
          <h3>Policy</h3>
          <p className="small">This is a demo. Add your organization's leave policy here.</p>
          <ul>
            <li>Submit requests at least 2 days in advance.</li>
            <li>HR will review and update the status.</li>
          </ul>
        </div>
      </div>
      {isHR ? (
        <LeaveList
          leaves={allLeaves}
          onApprove={(id)=>setLeaveStatus(id,'approved')}
          onReject={(id)=>setLeaveStatus(id,'rejected')}
        />
      ) : (
        <LeaveList leaves={myLeaves} />
      )}
    </div>
  )
}
