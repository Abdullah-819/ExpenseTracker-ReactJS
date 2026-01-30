import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import AddExpense from "./pages/AddExpense"
import Budget from "./pages/Budget"
import { useAuth } from "./hooks/useAuth"

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/expenses" element={user ? <Expenses /> : <Navigate to="/login" />} />
      <Route path="/add" element={user ? <AddExpense /> : <Navigate to="/login" />} />
      <Route path="/budget" element={user ? <Budget /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
