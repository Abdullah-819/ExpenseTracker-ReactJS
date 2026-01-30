import { useState } from "react"
import { useExpenses } from "../hooks/useExpenses"
import BudgetPie from "../components/Budgetpie.jsx"

function Budget() {
  const { budget, setBudget, remainingBudget, totalSpent } = useExpenses()
  const [value, setValue] = useState(budget || "")

  const handleSubmit = e => {
    e.preventDefault()
    const amount = Number(value)
    if (!amount || amount <= 0) return
    setBudget(amount)
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Budget</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter total budget"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button type="submit">
            {budget === null ? "Set Budget" : "Update Budget"}
          </button>
        </form>

        {budget !== null && (
          <>
            <BudgetPie />

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
          </>
        )}
      </div>
    </div>
  )
}

export default Budget
