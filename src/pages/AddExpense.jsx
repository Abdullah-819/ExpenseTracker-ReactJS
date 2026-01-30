import { useState } from "react"
import { useExpenses } from "../hooks/useExpenses"
import { categories } from "../data/categories"
import { useNavigate } from "react-router-dom"

function AddExpense() {
  const { addExpense } = useExpenses()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState(categories[0])

  const handleSubmit = e => {
    e.preventDefault()

    const expense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString()
    }

    if (!expense.title || !expense.amount) return

    addExpense(expense)
    navigate("/expenses")
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Add Expense</h1>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Expense title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  )
}

export default AddExpense
