import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useExpenses } from "../hooks/useExpenses"

function BudgetPie() {
  const { budget, totalSpent } = useExpenses()

  if (!budget) return null

  const remaining = Math.max(budget - totalSpent, 0)
  const usedPercent = totalSpent / budget

  let usedColor = "#22c55e"
  if (usedPercent >= 0.7) usedColor = "#facc15"
  if (usedPercent >= 0.9) usedColor = "#ef4444"

  const data =
    remaining === 0
      ? [{ name: "Used", value: budget }]
      : [
          { name: "Used", value: totalSpent },
          { name: "Remaining", value: remaining }
        ]

  const colors =
    remaining === 0
      ? ["#ef4444"]
      : [usedColor, "rgba(255,255,255,0.15)"]

  return (
    <div className="donut-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            paddingAngle={remaining === 0 ? 0 : 6}
            startAngle={90}
            endAngle={-270}
            cornerRadius={12}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-center">
        <p className="donut-amount">Rs {totalSpent}</p>
        <p className="donut-label">Spent of {budget}</p>
      </div>
    </div>
  )
}

export default BudgetPie
