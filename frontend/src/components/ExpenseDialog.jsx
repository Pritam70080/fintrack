import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { CATEGORIES, CATEGORY_LABELS } from '../lib/finance'
import { springGentle } from '../lib/motion'
import { expenseSchema } from '../lib/validation'
import GradientButton from './GradientButton'

function localDateToday() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function FieldError({ children }) {
  return children ? <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{children}</span> : null
}

const fieldClass = 'mt-1.5 w-full rounded-xl border border-line bg-page px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-ink-muted focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10'

export default function ExpenseDialog({ expense, onClose, onSave }) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: expense
      ? {
        title: expense.title,
        description: expense.description || '',
        amount: expense.amount,
        category: expense.category,
        expenseDate: expense.expenseDate,
      }
      : { title: '', description: '', amount: '', category: 'FOOD', expenseDate: localDateToday() },
    mode: 'onBlur',
  })

  const submit = async (values) => {
    try {
      await onSave({ ...values, amount: Number(values.amount) })
      onClose()
    } catch (error) {
      setError('root.server', { message: error.message })
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      >
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="expense-dialog-title"
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={springGentle}
          className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-line bg-panel p-6 shadow-2xl max-sm:p-5"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[.18em] text-primary-700 dark:text-primary-300">{expense ? 'UPDATE TRANSACTION' : 'NEW TRANSACTION'}</p>
              <h2 id="expense-dialog-title" className="mt-2 font-display text-xl font-bold tracking-tight text-ink">{expense ? 'Edit expense' : 'Add an expense'}</h2>
              <p className="mt-1 text-sm text-ink-soft">Keep track of where your money goes.</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close dialog" className="grid size-9 place-items-center rounded-xl text-ink-soft transition hover:bg-panel-muted hover:text-ink"><X size={18} /></button>
          </div>

          <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4">
            <label className="text-sm font-medium text-ink-soft">
              What was it for?
              <input autoFocus maxLength={120} {...register('title')} placeholder="e.g. Coffee with friends" className={fieldClass} />
              <FieldError>{errors.title?.message}</FieldError>
            </label>
            <div className="grid grid-cols-2 gap-3 max-[420px]:grid-cols-1">
              <label className="text-sm font-medium text-ink-soft">
                Amount
                <input type="number" min="0.01" step="0.01" {...register('amount')} placeholder="0.00" className={fieldClass} />
                <FieldError>{errors.amount?.message}</FieldError>
              </label>
              <label className="text-sm font-medium text-ink-soft">
                Date
                <input type="date" {...register('expenseDate')} className={fieldClass} />
                <FieldError>{errors.expenseDate?.message}</FieldError>
              </label>
            </div>
            <label className="text-sm font-medium text-ink-soft">
              Category
              <select {...register('category')} className={fieldClass}>{CATEGORIES.map((category) => <option value={category} key={category}>{CATEGORY_LABELS[category]}</option>)}</select>
              <FieldError>{errors.category?.message}</FieldError>
            </label>
            <label className="text-sm font-medium text-ink-soft">
              Note <span className="font-normal text-ink-muted">· Optional</span>
              <textarea rows="3" maxLength={500} {...register('description')} placeholder="Add a little more detail..." className={`${fieldClass} resize-y`} />
              <FieldError>{errors.description?.message}</FieldError>
            </label>
            <FieldError>{errors.root?.server?.message}</FieldError>
            <div className="mt-1 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-panel-muted">Cancel</button>
              <GradientButton type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving…' : expense ? 'Save changes' : 'Add expense'}</GradientButton>
            </div>
          </form>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  )
}
