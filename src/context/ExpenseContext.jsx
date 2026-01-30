import { createContext, useEffect, useState } from "react"
import { getUserData, setUserData } from "../utils/storage"
import { shouldReset } from "../utils/resetCheck"
import { useAuth } from "../hooks/useAuth"

export const ExpenseContext = createContext()

export function ExpenseProvider({ children }) {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [budget, setBudget] = useState(null)

  useEffect(() => {
    if (!user) return

    const stored = getUserData(user.username)

    if (!stored || shouldReset(stored.lastReset)) {
      const freshData = {
        expenses: [],
        budget: null,
        lastReset: Date.now()
      }

      setUserData(user.username, freshData)
      setExpenses([])
      setBudget(null)
      return
    }

    setExpenses(stored.expenses)
    setBudget(stored.budget)
  }, [user])

  useEffect(() => {
    if (!user) return

    setUserData(user.username, {
      expenses,
      budget,
      lastReset: Date.now()
    })
  }, [expenses, budget, user])

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
        addExpense,
        deleteExpense,
        updateExpense,
        totalSpent,
        remainingBudget
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}
