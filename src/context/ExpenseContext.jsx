import { createContext, useEffect, useState } from "react"
import { getUserData, setUserData } from "../utils/storage"
import { shouldReset } from "../utils/resetCheck"
import { useAuth } from "../hooks/useAuth"

export const ExpenseContext = createContext()

export function ExpenseProvider({ children }) {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [budget, setBudget] = useState(null)
  const [savingTarget, setSavingTarget] = useState(null)
  const [lastReset, setLastReset] = useState(null)

  useEffect(() => {
    if (!user) return

    const stored = getUserData(user.username)

    if (!stored) {
      const initData = {
        expenses: [],
        budget: null,
        savingTarget: null,
        lastReset: Date.now()
      }

      setUserData(user.username, initData)
      setExpenses([])
      setBudget(null)
      setSavingTarget(null)
      setLastReset(initData.lastReset)
      return
    }

    if (shouldReset(stored.lastReset)) {
      const resetData = {
        expenses: [],
        budget: null,
        savingTarget: stored.savingTarget ?? null,
        lastReset: Date.now()
      }

      setUserData(user.username, resetData)
      setExpenses([])
      setBudget(null)
      setSavingTarget(resetData.savingTarget)
      setLastReset(resetData.lastReset)
      return
    }

    setExpenses(stored.expenses)
    setBudget(stored.budget)
    setSavingTarget(stored.savingTarget ?? null)
    setLastReset(stored.lastReset)
  }, [user])

  useEffect(() => {
    if (!user || lastReset === null) return

    setUserData(user.username, {
      expenses,
      budget,
      savingTarget,
      lastReset
    })
  }, [expenses, budget, savingTarget, lastReset, user])

  const addExpense = expense => {
    setExpenses(prev => [...prev, expense])
  }

  const deleteExpense = id => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }

  const updateExpense = updatedExpense => {
    setExpenses(prev =>
      prev.map(e => (e.id === updatedExpense.id ? updatedExpense : e))
    )
  }

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const remainingBudget = budget !== null ? budget - totalSpent : null

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        budget,
        setBudget,
        savingTarget,
        setSavingTarget,
        addExpense,
        deleteExpense,
        updateExpense,
        totalSpent,
        remainingBudget,
        lastReset
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}
