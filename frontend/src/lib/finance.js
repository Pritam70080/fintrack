export const CATEGORY_COLORS = {
  FOOD: '#278f5d',
  TRANSPORT: '#4aa96f',
  SHOPPING: '#a2bd57',
  ENTERTAINMENT: '#51a9a0',
  BILLS: '#17774b',
  HEALTH: '#78b989',
  EDUCATION: '#72954f',
  OTHER: '#829589',
}

export const CATEGORY_LABELS = {
  FOOD: 'Food & drink',
  TRANSPORT: 'Transport',
  SHOPPING: 'Shopping',
  ENTERTAINMENT: 'Entertainment',
  BILLS: 'Bills',
  HEALTH: 'Health',
  EDUCATION: 'Education',
  OTHER: 'Other',
}

export const CATEGORIES = Object.keys(CATEGORY_LABELS)

export function formatMoney(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

export function formatDate(value, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-IN', options).format(new Date(`${value}T00:00:00`))
}

export function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function monthlyTotals(expenses, months = 6) {
  const today = new Date()
  return Array.from({ length: months }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - months + index + 1, 1)
    const key = monthKey(date)
    return {
      month: new Intl.DateTimeFormat('en', { month: 'short' }).format(date),
      total: expenses
        .filter((expense) => expense.expenseDate?.slice(0, 7) === key)
        .reduce((sum, expense) => sum + Number(expense.amount), 0),
    }
  })
}

export function categoryTotals(expenses) {
  const totals = expenses.reduce((result, expense) => {
    const category = expense.category || 'OTHER'
    result[category] = (result[category] || 0) + Number(expense.amount)
    return result
  }, {})

  return Object.entries(totals)
    .map(([category, value]) => ({
      category,
      name: CATEGORY_LABELS[category] || CATEGORY_LABELS.OTHER,
      value,
      color: CATEGORY_COLORS[category] || CATEGORY_COLORS.OTHER,
    }))
    .sort((a, b) => b.value - a.value)
}
