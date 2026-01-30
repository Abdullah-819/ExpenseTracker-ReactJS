import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import MobileMenu from "./components/MobileMenu"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import AddExpense from "./pages/AddExpense"
import Budget from "./pages/Budget"

function App() {
  const { user, loading } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  if (loading) {
    return (
      <div className="app-loader">
        <div className="spinner" />
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  return (
    <>
      <Navbar
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen(prev => !prev)}
      />

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </>
  )
}

export default App
