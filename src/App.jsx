import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import { useState } from "react"

import Navbar from "./components/Navbar"
import MobileMenu from "./components/MobileMenu"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import AddExpense from "./pages/AddExpense"
import Budget from "./pages/Budget"

function App() {
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

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
      <Navbar onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Routes>
        <Route path="/" element={<Navigate to="/expenses" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </>
  )
}

export default App
