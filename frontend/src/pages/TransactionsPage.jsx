import { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowDownUp, ArrowRight, CirclePlus, Download, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { useExpenseFilters } from '../lib/hooks/useExpenseFilters'
import { downloadCsv } from '../lib/exportCsv'
import { entrance } from '../lib/motion'
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_LABELS, formatDate, formatMoney } from '../lib/finance'
import { useFintrackStore } from '../stores/fintrackStore'
import ExpenseDialog from '../components/ExpenseDialog'
import GradientButton from '../components/GradientButton'
import PageHeader from '../components/PageHeader'
import { LoadingSkeleton } from '../components/LoadingSkeleton'

export default function TransactionsPage() {
  const { setNotice } = useOutletContext()
  const { expenses, isLoading, createExpense, updateExpense, deleteExpense } = useFintrackStore()
  const [params, setParams] = useSearchParams()
  const [dialog, setDialog] = useState(null)
  const [category, setCategory] = useState('ALL')
  const [sortOrder, setSortOrder] = useState('newest')
  const [actionError, setActionError] = useState('')
  const search = params.get('search') || ''
  const filtered = useExpenseFilters(expenses, category, search, sortOrder)
  const total = filtered.reduce((sum, expense) => sum + Number(expense.amount), 0)

  const save = async (payload) => {
    if (dialog?.expense) await updateExpense(dialog.expense.id, payload)
    else await createExpense(payload)
    setNotice(dialog?.expense ? 'Your expense has been updated.' : 'Expense added to your transactions.')
  }

  const remove = async (expense) => {
    if (!window.confirm(`Delete “${expense.title}”? This can’t be undone.`)) return
    setActionError('')
    try {
      await deleteExpense(expense.id)
      setNotice('Transaction deleted.')
    } catch (error) {
      setActionError(error.message)
    }
  }

  const exportRows = filtered.map(({ title, amount, category: itemCategory, expenseDate, description }) => [title, amount, itemCategory, expenseDate, description])

  return (
    <motion.div {...entrance}>
      <PageHeader
        eyebrow="A CLEARER PICTURE"
        title="Your transactions"
        description="Every little thing adds up. Keep it all in one place."
        action={<GradientButton aria-label="Add expense" onClick={() => setDialog({})} className="max-sm:size-11 max-sm:px-0"><CirclePlus size={18} /><span className="max-sm:hidden">Add expense</span></GradientButton>}
      />
      <section className="mb-5 flex items-center justify-between rounded-2xl border border-primary-500/15 bg-linear-to-r from-primary-500/10 to-panel px-5 py-4">
        <div><span className="text-xs text-ink-soft">Total in this view</span><strong className="mt-1 block font-display text-xl font-bold text-ink">{isLoading ? '—' : formatMoney(total)}</strong><span className="mt-1 block text-xs text-ink-muted">{filtered.length} {filtered.length === 1 ? 'transaction' : 'transactions'}</span></div>
        <span className="grid size-10 place-items-center rounded-xl bg-panel text-primary-700 shadow-sm dark:text-primary-300"><ArrowDownUp size={19} /></span>
      </section>

      <section className="overflow-hidden rounded-2xl border border-line bg-panel shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4">
          <label className="flex h-10 min-w-48 flex-1 items-center gap-2 rounded-xl border border-line bg-page px-3 text-ink-muted sm:max-w-xs"><Search size={16} /><input value={search} onChange={(event) => setParams(event.target.value ? { search: event.target.value } : {})} placeholder="Search transactions..." aria-label="Search transactions" className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-ink-muted" /></label>
          <div className="flex flex-1 items-center justify-end gap-2">
            <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-panel px-3 text-ink-soft sm:flex-none"><SlidersHorizontal size={15} /><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category" className="min-w-0 flex-1 bg-transparent text-xs outline-none sm:w-32 sm:flex-none"><option value="ALL">All categories</option>{CATEGORIES.map((item) => <option value={item} key={item}>{CATEGORY_LABELS[item]}</option>)}</select></label>
            <button type="button" onClick={() => downloadCsv('fintrack-transactions.csv', ['Title', 'Amount', 'Category', 'Date', 'Note'], exportRows)} disabled={filtered.length === 0} className="inline-flex h-10 items-center gap-2 rounded-xl border border-line px-3 text-xs font-medium text-ink-soft transition hover:bg-panel-muted disabled:opacity-40"><Download size={15} /><span className="max-sm:hidden">Export</span></button>
          </div>
        </div>
        {actionError && <p role="alert" className="bg-red-50 px-4 py-2 text-xs text-red-700 dark:bg-red-950/30 dark:text-red-300">{actionError}</p>}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[690px] border-collapse text-left">
            <thead className="bg-page text-[10px] font-bold tracking-wider text-ink-muted"><tr><th className="px-5 py-3">TRANSACTION</th><th className="px-3 py-3">CATEGORY</th><th className="px-3 py-3">DATE</th><th className="px-3 py-3 text-right">AMOUNT</th><th className="px-5 py-3"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody className="divide-y divide-line">
              {isLoading ? [0, 1, 2, 3].map((item) => <tr key={item}><td className="px-5 py-4"><div className="flex items-center gap-3"><LoadingSkeleton className="size-9 rounded-xl" /><LoadingSkeleton className="h-3 w-32" /></div></td><td className="px-3"><LoadingSkeleton className="h-3 w-20" /></td><td className="px-3"><LoadingSkeleton className="h-3 w-20" /></td><td className="px-3"><LoadingSkeleton className="ml-auto h-3 w-16" /></td><td /></tr>)
                : filtered.map((expense) => <tr key={expense.id} className="transition-colors hover:bg-page/70">
                  <td className="px-5 py-3"><div className="flex min-w-48 items-center gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-500/10 font-semibold text-primary-700 dark:text-primary-300">{expense.title.charAt(0).toUpperCase()}</span><span className="min-w-0"><strong className="block truncate text-xs font-semibold text-ink">{expense.title}</strong>{expense.description && <small className="mt-0.5 block max-w-52 truncate text-[10px] text-ink-muted">{expense.description}</small>}</span></div></td>
                  <td className="px-3 py-3"><span className="inline-flex items-center gap-2 whitespace-nowrap text-xs text-ink-soft"><i className="size-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.OTHER }} />{CATEGORY_LABELS[expense.category] || 'Other'}</span></td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs text-ink-soft">{formatDate(expense.expenseDate)}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right text-xs font-semibold text-ink">−{formatMoney(expense.amount)}</td>
                  <td className="px-5 py-3"><div className="flex justify-end gap-1"><button type="button" onClick={() => setDialog({ expense })} className="rounded-lg px-2 py-1.5 text-xs text-ink-soft hover:bg-panel-muted hover:text-primary-700 dark:hover:text-primary-300">Edit</button><button type="button" aria-label={`Delete ${expense.title}`} onClick={() => remove(expense)} className="grid size-8 place-items-center rounded-lg text-ink-muted hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"><Trash2 size={15} /></button></div></td>
                </tr>)}
            </tbody>
          </table>
          {!isLoading && filtered.length === 0 && <div className="flex min-h-56 flex-col items-center justify-center px-4 text-center"><span className="grid size-11 place-items-center rounded-2xl bg-primary-500/10 text-primary-700 dark:text-primary-300"><Search size={20} /></span><strong className="mt-3 text-sm text-ink">{search || category !== 'ALL' ? 'No matching transactions' : 'Your story starts here'}</strong><p className="mt-1 max-w-xs text-xs leading-5 text-ink-muted">{search || category !== 'ALL' ? 'Try adjusting your search or filters.' : 'Add your first expense and start seeing the bigger picture.'}</p>{!search && category === 'ALL' && <button type="button" onClick={() => setDialog({})} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-700 dark:text-primary-300">Add an expense <ArrowRight size={14} /></button>}</div>}
        </div>
        <div className="flex min-h-12 items-center justify-between gap-3 border-t border-line px-4 text-[10px] text-ink-muted"><span>Showing {filtered.length} of {expenses.length} transactions</span><button type="button" onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')} className="inline-flex items-center gap-1.5 text-ink-soft">Date: {sortOrder === 'newest' ? 'newest first' : 'oldest first'} <ArrowDownUp size={13} /></button></div>
      </section>
      {dialog && <ExpenseDialog expense={dialog.expense} onClose={() => setDialog(null)} onSave={save} />}
    </motion.div>
  )
}
