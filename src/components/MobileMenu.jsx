import { Link, useLocation } from "react-router-dom"

function MobileMenu({ open, onClose }) {
  const { pathname } = useLocation()

  if (!open) return null

  return (
    <div className="mobile-overlay" onClick={onClose}>
      <div className="mobile-panel" onClick={e => e.stopPropagation()}>
        <Link
          to="/expenses"
          onClick={onClose}
          className={pathname === "/expenses" ? "active" : ""}
        >
          Expenses
        </Link>

        <Link
          to="/add"
          onClick={onClose}
          className={pathname === "/add" ? "active" : ""}
        >
          Add Expense
        </Link>

        <Link
          to="/budget"
          onClick={onClose}
          className={pathname === "/budget" ? "active" : ""}
        >
          Budget
        </Link>

        <Link
          to="/dashboard"
          onClick={onClose}
          className={pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
      </div>
    </div>
  )
}

export default MobileMenu
