import { useExpenses } from "../hooks/useExpenses"
import ExpensePie from "../components/ExpensePie.jsx"
import ExpenseBar from "../components/ExpenseBar.jsx"

function Expenses() {
  const { expenses, deleteExpense } = useExpenses()

  return (
    <div className="page">
      <div className="expenses-layout">

        <div className="card">
          <h1>Expenses</h1>

          {expenses.length === 0 && <p>No expenses added</p>}

          {expenses.map(e => (
            <div key={e.id} className="expense-item">
              <div>
                <p>{e.title}</p>
                <p>{e.category}</p>
                <p>{e.amount}</p>
                <p>{e.date}</p>
              </div>

              <button
                className="danger-btn"
                onClick={() => deleteExpense(e.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="card charts-card">
          <h1>Charts</h1>

          <div className="chart-box">
            <ExpensePie />
          </div>

          <div className="chart-box">
            <ExpenseBar />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Expenses
