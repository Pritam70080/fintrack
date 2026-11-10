import { useMemo } from 'react'
import { useFintrackStore } from '../../stores/fintrackStore'
import { categoryTotals, monthKey, monthlyTotals } from '../finance'

export function useDashboardData(date) {
  const expenses = useFintrackStore((state) => state.expenses)
  const isLoading = useFintrackStore((state) => state.isLoading)

  return useMemo(() => {
    const currentMonth = monthKey(date)
    const previousMonth = monthKey(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    const thisMonthExpenses = expenses.filter((item) => item.expenseDate?.slice(0, 7) === currentMonth)
    const previousTotal = expenses
      .filter((item) => item.expenseDate?.slice(0, 7) === previousMonth)
      .reduce((sum, item) => sum + Number(item.amount), 0)
    const currentTotal = thisMonthExpenses.reduce((sum, item) => sum + Number(item.amount), 0)

    return {
      expenses,
      isLoading,
      thisMonthExpenses,
      currentTotal,
      previousTotal,
      average: thisMonthExpenses.length ? currentTotal / thisMonthExpenses.length : 0,
      change: previousTotal ? Math.round(((currentTotal - previousTotal) / previousTotal) * 100) : null,
      chartData: monthlyTotals(expenses),
      categories: categoryTotals(thisMonthExpenses),
      recent: [...expenses].sort((a, b) => b.expenseDate.localeCompare(a.expenseDate)).slice(0, 5),
    }
  }, [date, expenses, isLoading])
}
