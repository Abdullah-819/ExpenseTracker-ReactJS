import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts"
import { useExpenses } from "../hooks/useExpenses"
import { useState, useEffect } from "react"

function ExpenseBar() {
  const { expenses } = useExpenses()
  const [activeCategory, setActiveCategory] = useState(null)

  if (expenses.length === 0) return null

  const maxAmount = Math.max(...expenses.map(e => e.amount))

  useEffect(() => {
    const handler = e => setActiveCategory(e.detail)
    window.addEventListener("PIE_HOVER", handler)
    return () => window.removeEventListener("PIE_HOVER", handler)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={expenses} margin={{ top: 20, bottom: 10 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />

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
          cursor={{ fill: "rgba(255,255,255,0.06)" }}
          contentStyle={{
            background: "rgba(15,25,35,0.95)",
            borderRadius: 10,
            border: "none",
            color: "#7df9ff"
          }}
          formatter={(v) => [`Rs ${v}`, "SPENT"]}
        />

        <Bar
          dataKey="amount"
          barSize={40}
          radius={[8, 8, 0, 0]}
          onMouseLeave={() =>
            window.dispatchEvent(
              new CustomEvent("BAR_HOVER", { detail: null })
            )
          }
        >
          {expenses.map((e, i) => {
            const isActive =
              activeCategory === null || activeCategory === e.category
            const isPeak = e.amount === maxAmount

            return (
              <Cell
                key={i}
                fill={isPeak ? "#7df9ff" : "#22d3ee"}
                opacity={isActive ? 1 : 0.25}
                onMouseEnter={() =>
                  window.dispatchEvent(
                    new CustomEvent("BAR_HOVER", { detail: e.category })
                  )
                }
              />
            )
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ExpenseBar
