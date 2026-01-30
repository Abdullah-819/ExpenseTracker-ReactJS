import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { ExpenseProvider } from "./context/ExpenseContext"
import "./index.css"

function Root() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="app-loader">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <App />
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />)
