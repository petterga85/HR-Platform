import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readDB, writeDB } from './storage/db'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [db, setDb] = useState(readDB())
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('hr_portal_current_user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => { writeDB(db) }, [db])

  const signup = (info) => {
    const exists = db.users.find(u => u.email.toLowerCase() === info.email.toLowerCase())
    if (exists) throw new Error('Email already registered')
    const id = 'u-' + Math.random().toString(36).slice(2,10)
    const newUser = { id, name: info.name, email: info.email, password: info.password, role: info.role || 'employee' }
    const next = { ...db, users: [...db.users, newUser], profiles: { ...db.profiles, [id]: {
      userId: id, firstName: info.firstName || info.name, lastName: info.lastName || '', phone: info.phone || '', address: info.address || '', department: info.department || '', startDate: info.startDate || '', emergencyContact: info.emergencyContact || ''
    }}}
    setDb(next)
    setUser(newUser)
    localStorage.setItem('hr_portal_current_user', JSON.stringify(newUser))
    return newUser
  }

  const login = (email, password) => {
    const found = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) throw new Error('Invalid credentials')
    setUser(found)
    localStorage.setItem('hr_portal_current_user', JSON.stringify(found))
    return found
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hr_portal_current_user')
  }

  const updateProfile = (userId, patch) => {
    setDb(prev => ({ ...prev, profiles: { ...prev.profiles, [userId]: { ...(prev.profiles[userId]||{userId}), ...patch } }}))
  }

  const upsertUser = (userPatch) => {
    setDb(prev => ({ ...prev, users: prev.users.map(u => u.id === userPatch.id ? { ...u, ...userPatch } : u) }))
  }

  const createLeave = (leave) => {
    const id = 'lv-' + Math.random().toString(36).slice(2,10)
    setDb(prev => ({ ...prev, leaves: [...prev.leaves, { ...leave, id, status:'pending' }] }))
  }

  const setLeaveStatus = (id, status) => {
    setDb(prev => ({ ...prev, leaves: prev.leaves.map(l => l.id === id ? { ...l, status } : l) }))
  }

  const value = useMemo(() => ({
    db, setDb,
    user, signup, login, logout,
    updateProfile, upsertUser,
    createLeave, setLeaveStatus
  }), [db, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
