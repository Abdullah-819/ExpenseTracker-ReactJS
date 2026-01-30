import { useAuth } from "../hooks/useAuth"
import { useExpenses } from "../hooks/useExpenses"
import ExpensePie from "../components/ExpensePie.jsx"
import ExpenseBar from "../components/ExpenseBar.jsx"
import { Link } from "react-router-dom"

function Dashboard() {
  const { user } = useAuth()
  const { budget, totalSpent, remainingBudget, lastReset } = useExpenses()

  const lowBudget =
    budget !== null && remainingBudget <= budget * 0.2

  const daysLeft = lastReset
    ? Math.max(
        0,
        30 -
          Math.floor(
            (Date.now() - lastReset) / (1000 * 60 * 60 * 24)
          )
      )
    : null

  return (
    <div className="page">
      <div className={`card charts-card ${lowBudget ? "budget-warning" : ""}`}>
        <h1>Dashboard</h1>
        <p>User: {user.name}</p>

        {budget === null ? (
          <>
            <p>Budget not set</p>
            <Link to="/budget">
              <button>Set Budget</button>
            </Link>
          </>
        ) : (
          <>
            <div className="chart-box">
              <ExpensePie />
            </div>

            <div className="chart-box">
              <ExpenseBar />
            </div>

            {lowBudget && (
              <p className="budget-alert">
                Warning: Low remaining budget
              </p>
            )}

            {daysLeft !== null && (
              <p className="reset-indicator">
                Data resets in {daysLeft} days
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
