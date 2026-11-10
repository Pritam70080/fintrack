import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiRequest } from '../lib/api'

export const useFintrackStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      theme: 'light',
      expenses: [],
      isLoading: false,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null, expenses: [], error: null }),
      setTheme: (theme) => set({ theme }),
      fetchExpenses: async () => {
        set({ isLoading: true, error: null })
        try {
          const expenses = await apiRequest('/expenses', { token: get().token })
          set({ expenses, isLoading: false })
          return expenses
        } catch (error) {
          set({ error: error.message, isLoading: false })
          throw error
        }
      },
      createExpense: async (expense) => {
        const created = await apiRequest('/expenses', {
          method: 'POST',
          token: get().token,
          body: JSON.stringify(expense),
        })
        set((state) => ({ expenses: [created, ...state.expenses] }))
        return created
      },
      updateExpense: async (id, expense) => {
        const updated = await apiRequest(`/expenses/${id}`, {
          method: 'PUT',
          token: get().token,
          body: JSON.stringify(expense),
        })
        set((state) => ({
          expenses: state.expenses.map((item) => item.id === id ? updated : item),
        }))
        return updated
      },
      deleteExpense: async (id) => {
        await apiRequest(`/expenses/${id}`, {
          method: 'DELETE',
          token: get().token,
        })
        set((state) => ({
          expenses: state.expenses.filter((item) => item.id !== id),
        }))
      },
    }),
    {
      name: 'fintrack-preferences',
      partialize: ({ token, user, theme }) => ({ token, user, theme }),
    },
  ),
)
