import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { useExpenses } from "../hooks/useExpenses"

const COLORS = ["#00c6ff", "#0072ff", "#7f5af0", "#ff8906", "#ff5c5c"]

function ExpensePie() {
  const { expenses } = useExpenses()

  const data = Object.values(
    expenses.reduce((acc, e) => {
      acc[e.category] = acc[e.category] || { name: e.category, value: 0 }
      acc[e.category].value += e.amount
      return acc
    }, {})
  )

  if (data.length === 0) return <p>No data</p>

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ExpensePie
