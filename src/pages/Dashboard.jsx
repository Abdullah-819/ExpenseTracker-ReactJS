import { useAuth } from "../hooks/useAuth"
import { useExpenses } from "../hooks/useExpenses"
import { Link } from "react-router-dom"

function Dashboard() {
  const { user } = useAuth()
  const { budget, totalSpent, remainingBudget } = useExpenses()

  return (
    <div className="page">
      <div className="card">
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
          <div className="stat">
            <p>Total Budget: {budget}</p>
            <p>Total Spent: {totalSpent}</p>
            <p>Remaining: {remainingBudget}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
