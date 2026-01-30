import { Link } from "react-router-dom"

function MobileMenu({ open, onClose }) {
  if (!open) return null

  return (
    <div className="mobile-menu">
      <Link to="/" onClick={onClose}>Dashboard</Link>
      <Link to="/add" onClick={onClose}>Add Expense</Link>
      <Link to="/expenses" onClick={onClose}>Expenses</Link>
      <Link to="/budget" onClick={onClose}>Budget</Link>
    </div>
  )
}

export default MobileMenu
