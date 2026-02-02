import { useAuth } from "../hooks/useAuth"
import { useExpenses } from "../hooks/useExpenses"
import ExpensePie from "../components/ExpensePie.jsx"
import ExpenseBar from "../components/ExpenseBar.jsx"
import { Link } from "react-router-dom"

function Dashboard() {
  const { user } = useAuth()
  const {
    budget,
    totalSpent,
    remainingBudget,
    lastReset,
    expenses
  } = useExpenses()

  const usedPercent = budget ? totalSpent / budget : 0
  const lowBudget = budget && remainingBudget <= budget * 0.2

  const daysPassed = lastReset
    ? Math.floor((Date.now() - lastReset) / (1000 * 60 * 60 * 24))
    : 0

  const daysLeft = lastReset ? Math.max(0, 30 - daysPassed) : null

  const avgDaily = daysPassed > 0 ? totalSpent / daysPassed : 0
  const projectedSpend = avgDaily * 30
  const willExceed = budget && projectedSpend > budget

  const expenseVelocity =
    expenses.length > 1
      ? expenses[expenses.length - 1].amount -
        expenses[expenses.length - 2].amount
      : 0

  const topCategory = expenses?.length
    ? Object.entries(
        expenses.reduce((acc, e) => {
          acc[e.category] = (acc[e.category] || 0) + e.amount
          return acc
        }, {})
      ).sort((a, b) => b[1] - a[1])[0]
    : null

  const systemMode =
    !budget
      ? "IDLE"
      : usedPercent < 0.6
      ? "STABLE"
      : usedPercent < 0.85
      ? "WARNING"
      : "CRITICAL"

  const insight =
    systemMode === "IDLE"
      ? "SYSTEM IDLE — INITIALIZE MONTHLY BUDGET"
      : systemMode === "STABLE"
      ? "SPENDING STABLE — NO ACTION REQUIRED"
      : systemMode === "WARNING"
      ? "SPENDING ACCELERATING — MONITOR CLOSELY"
      : "CRITICAL USAGE — IMMEDIATE ACTION ADVISED"

  return (
    <div className="page dashboard-page">
      <div className={`dashboard-card ${lowBudget ? "budget-warning" : ""}`}>

        <header className="dashboard-header">
          <div className="user-badge">
            <span className="user-name">{user.name}</span>
            <span className="user-role">ADMIN</span>
          </div>

          <div className="system-status">
            <span className={`status-dot ${systemMode === "CRITICAL" ? "danger" : ""}`} />
            <span className="status-text">
              MODE: {systemMode}
            </span>
          </div>
        </header>

        <div className="dashboard-insight">
          {insight}
        </div>

        {!budget ? (
          <div className="setup-panel">
            <p>Budget system not initialized</p>
            <Link to="/budget">
              <button className="primary-btn">Initialize Budget</button>
            </Link>
          </div>
        ) : (
          <>
            <section className="dashboard-grid">

              <div className="hud-card">
                <h3>BUDGET USAGE</h3>
                <ExpensePie />
                <p className="hud-meta">
                  {Math.round(usedPercent * 100)}% CONSUMED
                </p>
              </div>

              <div className="hud-card">
                <h3>SPENDING TREND</h3>
                <ExpenseBar />
              </div>

            </section>

            <section className="system-timeline">
              <div className="timeline-bar">
                <div
                  className="timeline-progress"
                  style={{
                    width: `${Math.min((daysPassed / 30) * 100, 100)}%`
                  }}
                />
              </div>
              <p className="timeline-label">
                {daysLeft} DAYS REMAINING
              </p>
            </section>

            <section className="dashboard-stats">

              <div className="stat-card">
                <span>DAILY AVG</span>
                <strong>Rs {avgDaily.toFixed(1)}</strong>
              </div>

              <div className="stat-card">
                <span>PROJECTED</span>
                <strong>Rs {Math.round(projectedSpend)}</strong>
              </div>

              <div className="stat-card">
                <span>REMAINING</span>
                <strong>Rs {remainingBudget}</strong>
              </div>

              {topCategory && (
                <div className="stat-card highlight">
                  <span>TOP CATEGORY</span>
                  <strong>{topCategory[0]}</strong>
                </div>
              )}

            </section>

            {expenseVelocity !== 0 && (
              <div className={`alert ${expenseVelocity > 0 ? "warning" : ""}`}>
                {expenseVelocity > 0
                  ? "⚠ SPENDING VELOCITY INCREASING"
                  : "✔ SPENDING VELOCITY DECREASING"}
              </div>
            )}

            {willExceed && (
              <div className="alert danger">
                ⏳ PROJECTED TO EXCEED BUDGET
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
