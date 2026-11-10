import { useMemo } from 'react'

export function useExpenseFilters(expenses, category, search, sortOrder) {
  return useMemo(() => expenses
    .filter((expense) => category === 'ALL' || expense.category === category)
    .filter((expense) => `${expense.title} ${expense.description || ''}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortOrder === 'newest'
      ? b.expenseDate.localeCompare(a.expenseDate)
      : a.expenseDate.localeCompare(b.expenseDate)), [expenses, category, search, sortOrder])
}
