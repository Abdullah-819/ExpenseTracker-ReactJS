import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function Navbar({ onMenu, menuOpen }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <button
        className={`menu-btn ${menuOpen ? "open" : ""}`}
        onClick={onMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/budget">Budget</Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar
