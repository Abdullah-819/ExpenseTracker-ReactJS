import { useAuth } from "../hooks/useAuth"
import { useExpenses } from "../hooks/useExpenses"
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
      <div className={`card ${lowBudget ? "budget-warning" : ""}`}>
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
            <div className="stat">
              <p>Total Budget</p>
              <p>{budget}</p>
            </div>

            <div className="stat">
              <p>Total Spent</p>
              <p>{totalSpent}</p>
            </div>

            <div className="stat">
              <p>Remaining</p>
              <p>{remainingBudget}</p>
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
