import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useExpenses } from "../hooks/useExpenses"
import { useState, useMemo, useEffect } from "react"

const BASE_COLORS = [
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
  const [pulse, setPulse] = useState(false)

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches

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
  const dominantIndex = data.findIndex(d => d.value === maxValue)
  const focused = activeIndex !== null ? data[activeIndex] : null

  const usageRatio = totalSpent > 0 ? maxValue / totalSpent : 0

  const systemState =
    usageRatio < 0.5
      ? "STABLE"
      : usageRatio < 0.75
      ? "WARNING"
      : "CRITICAL"

  const systemTint =
    systemState === "STABLE"
      ? "#22d3ee"
      : systemState === "WARNING"
      ? "#facc15"
      : "#ef4444"

  useEffect(() => {
    if (prefersReducedMotion) return
    const interval = setInterval(() => {
      setPulse(p => !p)
    }, 4000)
    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  useEffect(() => {
    const handleKey = e => {
      if (data.length === 0) return
      if (e.key === "ArrowRight") {
        setActiveIndex(i =>
          i === null ? 0 : (i + 1) % data.length
        )
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex(i =>
          i === null ? data.length - 1 : (i - 1 + data.length) % data.length
        )
      }
      if (e.key === "Escape") {
        setActiveIndex(null)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [data.length])

  return (
    <div className="donut-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={90}
            outerRadius={pulse && activeIndex === null ? 120 : 114}
            startAngle={90}
            endAngle={-270}
            paddingAngle={3}
            cornerRadius={10}
            activeIndex={activeIndex}
            activeShape={({ outerRadius, ...props }) => (
              <g>
                <Pie {...props} outerRadius={outerRadius + 8} />
              </g>
            )}
            onMouseLeave={() => setActiveIndex(null)}
            isAnimationActive={!prefersReducedMotion}
          >
            {data.map((entry, i) => {
              const isDominant = i === dominantIndex
              const isActive = i === activeIndex

              let opacity = 1
              if (activeIndex !== null && !isActive) opacity = 0.25
              if (activeIndex === null && !isDominant) opacity = 0.7

              return (
                <Cell
                  key={i}
                  fill={
                    isDominant && pulse && activeIndex === null
                      ? systemTint
                      : BASE_COLORS[i % BASE_COLORS.length]
                  }
                  opacity={opacity}
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
          {focused
            ? focused.name.toUpperCase()
            : "TOTAL EXPENSE"}
        </p>

        <p className="donut-sub">
          {focused
            ? `${Math.round((focused.value / totalSpent) * 100)}%`
            : `STATE: ${systemState}`}
        </p>
      </div>
    </div>
  )
}

export default ExpensePie
