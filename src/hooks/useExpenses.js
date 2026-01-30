import { useContext } from "react"
import { ExpenseContext } from "../context/ExpenseContext"

export function useExpenses() {
  return useContext(ExpenseContext)
}
