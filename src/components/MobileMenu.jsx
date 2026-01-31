import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"

function MobileMenu({ open, onClose }) {
  const { pathname } = useLocation()
  const panelRef = useRef(null)
  const touchStartX = useRef(0)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    panelRef.current?.querySelector("a")?.focus()

    const onEsc = e => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onEsc)

    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", onEsc)
    }
  }, [open, onClose])

  if (!open) return null

  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = e => {
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta < -70) onClose()
  }

  const nav = (path) => () => {
    if (pathname !== path) onClose()
  }

  return (
    <div className="mobile-overlay" onClick={onClose}>
      <div
        className="mobile-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="menu-section">EXPENSES</div>

        <Link
          to="/expenses"
          onClick={nav("/expenses")}
          className={pathname === "/expenses" ? "active" : ""}
        >
          Expenses
        </Link>

        <Link
          to="/add"
          onClick={nav("/add")}
          className={pathname === "/add" ? "active" : ""}
        >
          Add Expense
        </Link>

        <Link
          to="/budget"
          onClick={nav("/budget")}
          className={pathname === "/budget" ? "active" : ""}
        >
          Budget
        </Link>

        <div className="menu-section">ANALYTICS</div>

        <Link
          to="/dashboard"
          onClick={nav("/dashboard")}
          className={pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
        <Link
  to="/profile"
  onClick={onClose}
  className={pathname === "/profile" ? "active" : ""}
>
  Profile
</Link>

      </div>
    </div>
  )
}

export default MobileMenu
