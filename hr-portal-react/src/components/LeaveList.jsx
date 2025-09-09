import React from 'react'

export default function LeaveList({ leaves, onApprove, onReject }){
  return (
    <div className="card">
      <h3>Leave Requests</h3>
      <table className="table">
        <thead>
          <tr><th>Employee</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l.id}>
              <td>{l.employeeName}</td>
              <td>{l.startDate}</td>
              <td>{l.endDate}</td>
              <td>{l.reason}</td>
              <td>
                <span className={"badge " + (l.status)}>{l.status}</span>
              </td>
              <td style={{display:'flex', gap:'.4rem'}}>
                {onApprove && <button className="button ok" onClick={()=>onApprove(l.id)}>Approve</button>}
                {onReject && <button className="button danger" onClick={()=>onReject(l.id)}>Reject</button>}
              </td>
            </tr>
          ))}
          {leaves.length === 0 && <tr><td colSpan="6" className="small">No leave requests.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
