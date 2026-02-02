import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useExpenses } from "../hooks/useExpenses"
import { useState, useMemo } from "react"

const COLORS = [
  "#22d3ee",
  "#22c55e",
  "#facc15",
  "#38bdf8",
  "#a855f7",
  "#f97316"
]

function ExpensePie() {
  const { expenses, totalSpent } = useExpenses()
  const [activeIndex, setActiveIndex] = useState(null)

  const data = useMemo(() => {
    const grouped = expenses.reduce((acc, e) => {
      acc[e.category] = acc[e.category] || { name: e.category, value: 0 }
      acc[e.category].value += e.amount
      return acc
    }, {})
    return Object.values(grouped)
  }, [expenses])

  if (data.length === 0) return null

  const maxValue = Math.max(...data.map(d => d.value))
  const focused = activeIndex !== null ? data[activeIndex] : null

  return (
    <div className="donut-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={88}
            outerRadius={115}
            startAngle={90}
            endAngle={-270}
            paddingAngle={4}
            cornerRadius={10}
            activeIndex={activeIndex}
            activeShape={({ outerRadius, ...props }) => (
              <g>
                <Pie {...props} outerRadius={outerRadius + 6} />
              </g>
            )}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, i) => {
              const isPeak = entry.value === maxValue
              const isActive = i === activeIndex

              return (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  opacity={
                    activeIndex === null
                      ? isPeak
                        ? 1
                        : 0.75
                      : isActive
                      ? 1
                      : 0.35
                  }
                  onMouseEnter={() => setActiveIndex(i)}
                />
              )
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-center">
        <p className="donut-amount">
          Rs {focused ? focused.value : totalSpent}
        </p>
        <p className="donut-label">
          {focused ? focused.name.toUpperCase() : "TOTAL EXPENSE"}
        </p>
        {focused && (
          <p className="donut-sub">
            {Math.round((focused.value / totalSpent) * 100)}%
          </p>
        )}
      </div>
    </div>
  )
}

export default ExpensePie
