import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useExpenses } from "../hooks/useExpenses"

const COLORS = ["#ff8f1f", "#22c55e", "#facc15", "#38bdf8", "#a855f7"]

function ExpensePie() {
  const { expenses, totalSpent } = useExpenses()

  const data = Object.values(
    expenses.reduce((acc, e) => {
      acc[e.category] = acc[e.category] || { name: e.category, value: 0 }
      acc[e.category].value += e.amount
      return acc
    }, {})
  )

  if (data.length === 0) return null

  return (
    <div className="donut-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            paddingAngle={6}
            startAngle={90}
            endAngle={-270}
            cornerRadius={12}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-center">
        <p className="donut-amount">Rs {totalSpent}</p>
        <p className="donut-label">Total Expense</p>
      </div>
    </div>
  )
}

export default ExpensePie
