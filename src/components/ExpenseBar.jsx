import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { useExpenses } from "../hooks/useExpenses"

function ExpenseBar() {
  const { expenses } = useExpenses()

  if (expenses.length === 0) return null

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={expenses}
        margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="rgba(255,255,255,0.08)"
          vertical={false}
        />

        <XAxis
          dataKey="title"
          tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            background: "rgba(20,30,40,0.95)",
            borderRadius: "10px",
            border: "none",
            color: "#fff"
          }}
          cursor={{ fill: "rgba(255,255,255,0.05)" }}
        />

        <Bar
          dataKey="amount"
          fill="url(#barGradient)"
          radius={[10, 10, 0, 0]}
          barSize={42}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ExpenseBar
