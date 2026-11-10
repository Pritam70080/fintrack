import { z } from 'zod'
import { CATEGORIES } from './finance'

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
})

export const registerSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(100, 'Name must be 100 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

export const expenseSchema = z.object({
  title: z.string().trim().min(1, 'Enter a transaction name.').max(120, 'Name must be 120 characters or fewer.'),
  description: z.string().max(500, 'Note must be 500 characters or fewer.'),
  amount: z.coerce.number().positive('Amount must be greater than zero.'),
  category: z.enum(CATEGORIES),
  expenseDate: z.string().min(1, 'Choose a date.').refine((date) => !Number.isNaN(Date.parse(`${date}T00:00:00`)), 'Enter a valid date.'),
})
