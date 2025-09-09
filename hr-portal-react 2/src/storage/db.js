// Simple JSON storage using localStorage
const KEY = 'hr_portal_db_v1'

const getDefault = () => ({
  users: [
    // Seed an HR admin
    { id: 'u-hr-1', name: 'Alex HR', email: 'hr@company.com', password: 'password', role: 'hr' },
  ],
  profiles: {
    // userId: profile
  },
  leaves: [
    // { id, userId, startDate, endDate, reason, status }
  ]
})

export const readDB = () => {
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    const def = getDefault()
    localStorage.setItem(KEY, JSON.stringify(def))
    return def
  }
  try {
    return JSON.parse(raw)
  } catch {
    const def = getDefault()
    localStorage.setItem(KEY, JSON.stringify(def))
    return def
  }
}

export const writeDB = (db) => {
  localStorage.setItem(KEY, JSON.stringify(db))
}

export const resetDB = () => {
  localStorage.removeItem(KEY)
}
