import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useExpenses } from "../hooks/useExpenses"

function ExpenseBar() {
  const { expenses } = useExpenses()

  if (expenses.length === 0) return <p>No data</p>

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={expenses}>
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#00c6ff" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ExpenseBar
