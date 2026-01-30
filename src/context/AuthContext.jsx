import { createContext, useEffect, useState } from "react"
import { users } from "../data/users"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("active_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (username, password) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    )

    if (!foundUser) return false

    localStorage.setItem("active_user", JSON.stringify(foundUser))
    setUser(foundUser)
    return true
  }

  const logout = () => {
    localStorage.removeItem("active_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
