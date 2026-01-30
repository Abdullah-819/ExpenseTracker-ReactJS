import { useAuth } from "../hooks/useAuth"
import { useExpenses } from "../hooks/useExpenses"

function Dashboard() {
  const { user } = useAuth()
  const { totalSpent, remainingBudget, budget } = useExpenses()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User: {user.name}</p>
      <p>Total Spent: {totalSpent}</p>
      <p>Budget: {budget === null ? "Not Set" : budget}</p>
      <p>Remaining: {remainingBudget === null ? "N/A" : remainingBudget}</p>
    </div>
  )
}

export default Dashboard
