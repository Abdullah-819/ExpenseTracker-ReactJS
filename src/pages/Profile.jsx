import { useAuth } from "../hooks/useAuth"
import { useExpenses } from "../hooks/useExpenses"
import { Link } from "react-router-dom"
import avatar from "../assets/avatar.jpeg"

function Profile() {
  const { user } = useAuth()
  const {
    budget,
    totalSpent,
    savingTarget
  } = useExpenses()

  const spendRatio = budget ? totalSpent / budget : 0

  const status =
    spendRatio < 0.6
      ? "NORMAL"
      : spendRatio < 0.85
      ? "HIGH"
      : "CRITICAL"

  const savedAmount =
    savingTarget && savingTarget > totalSpent
      ? savingTarget - totalSpent
      : 0

  const savedPercent =
    savingTarget
      ? Math.min((savedAmount / savingTarget) * 100, 100)
      : 0

  return (
    <div className="page">
      <div className="card profile-card">
        <div className="profile-top">
          <div className="profile-pic">
            <img src={avatar} alt="Profile" />
          </div>

          <h2>{user.name}</h2>

          <span className={`status ${status.toLowerCase()}`}>
            {status}
          </span>
        </div>

        <div className="profile-section">
          <h4>Total Spending</h4>
          <strong>Rs {totalSpent}</strong>
        </div>

        <div className="profile-section">
          <h4>Savings Target</h4>

          {savingTarget ? (
            <>
              <div className="saving-bar">
                <div
                  className="saving-fill"
                  style={{ width: `${savedPercent}%` }}
                />
              </div>

              <p className="saving-text">
                Rs {savedAmount} saved of Rs {savingTarget}
              </p>
            </>
          ) : (
            <p className="saving-text">
              No savings target set
            </p>
          )}

          <Link to="/set-savings">
            <button className="secondary-btn">
              Set / Update Target
            </button>
          </Link>
        </div>

        <div className="profile-section">
          <h4>Insights</h4>
          <ul className="insights">
            <li>Avg daily spend: Rs {(totalSpent / 30).toFixed(1)}</li>
            <li>Budget usage: {Math.round(spendRatio * 100)}%</li>
            <li>Status: {status}</li>
          </ul>
        </div>

        <Link to="/logout">
          <button className="danger-btn">Logout</button>
        </Link>
      </div>
    </div>
  )
}

export default Profile
