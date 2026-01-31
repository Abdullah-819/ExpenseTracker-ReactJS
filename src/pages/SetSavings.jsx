import { useState } from "react"
import { useExpenses } from "../hooks/useExpenses"
import { useNavigate } from "react-router-dom"

function SetSavings() {
  const { savingTarget, setSavingTarget, totalSpent } = useExpenses()
  const [value, setValue] = useState(savingTarget || "")
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const amount = Number(value)
    if (!amount || amount <= 0) return
    if (amount <= totalSpent) return
    setSavingTarget(amount)
    navigate("/profile")
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Savings Target</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter savings target"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit">
            {savingTarget ? "Update Target" : "Set Target"}
          </button>
        </form>

        <p className="helper-text">
          Target must be higher than your total spending (Rs {totalSpent})
        </p>
      </div>
    </div>
  )
}

export default SetSavings
