import { useAuth } from "../hooks/useAuth"
import { useExpenses } from "../hooks/useExpenses"
import ExpensePie from "../components/ExpensePie.jsx"
import ExpenseBar from "../components/ExpenseBar.jsx"
import { Link } from "react-router-dom"

function Dashboard() {
  const { user } = useAuth()
  const { budget, totalSpent, remainingBudget, lastReset } = useExpenses()

  const usedPercent = budget ? totalSpent / budget : 0
  const lowBudget = budget && remainingBudget <= budget * 0.2

  const daysPassed = lastReset
    ? Math.floor((Date.now() - lastReset) / (1000 * 60 * 60 * 24))
    : 0

  const daysLeft = lastReset ? Math.max(0, 30 - daysPassed) : null

  const avgDaily = daysPassed > 0 ? totalSpent / daysPassed : 0
  const projectedSpend = avgDaily * 30
  const willExceed = budget && projectedSpend > budget

  const insight =
    !budget
      ? "Set a budget to unlock insights"
      : usedPercent < 0.6
      ? "Spending is under control"
      : usedPercent < 0.85
      ? "Spending needs attention"
      : "Critical spending level"

  return (
    <div className="page">
      <div className={`card charts-card ${lowBudget ? "budget-warning" : ""}`}>
        <h1>Dashboard</h1>

        <div className="user-badge">
          <span>👤 {user.name}</span>
          <span className="role">Admin</span>
        </div>

        <p className="hero-insight">{insight}</p>

        {!budget ? (
          <Link to="/budget">
            <button className="primary-btn">Set Budget</button>
          </Link>
        ) : (
          <>
            <div className="chart-box">
              <ExpensePie />
            </div>

            <div className="timeline">
              <div
                className="timeline-fill"
                style={{ width: `${Math.min((daysPassed / 30) * 100, 100)}%` }}
              />
            </div>
            <p className="timeline-text">
              {daysLeft} days left in this cycle
            </p>

            <div className="chart-box">
              <ExpenseBar />
            </div>

            <div className="stats">
              <div>
                <span>Daily Avg</span>
                <strong>Rs {avgDaily.toFixed(1)}</strong>
              </div>
              <div>
                <span>Projected</span>
                <strong>Rs {Math.round(projectedSpend)}</strong>
              </div>
            </div>

            {lowBudget && (
              <div className="alert danger">
                ⚠️ Budget critically low
              </div>
            )}

            {willExceed && (
              <div className="alert warning">
                ⏳ At this pace, budget will be exceeded
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
