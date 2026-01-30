import { useExpenses } from "../hooks/useExpenses"

function Expenses() {
  const { expenses } = useExpenses()

  return (
    <div className="page">
      <div className="card">
        <h1>Expenses</h1>

        {expenses.length === 0 && <p>No expenses added</p>}

        {expenses.map(e => (
          <div key={e.id} className="stat">
            <p>{e.title}</p>
            <p>{e.category}</p>
            <p>{e.amount}</p>
            <p>{e.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Expenses
