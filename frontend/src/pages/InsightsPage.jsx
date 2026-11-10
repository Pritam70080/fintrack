import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, Lightbulb, Sparkles } from 'lucide-react'
import { categoryTotals, formatMoney, monthKey, monthlyTotals } from '../lib/finance'
import { entrance } from '../lib/motion'
import { useFintrackStore } from '../stores/fintrackStore'
import PageHeader from '../components/PageHeader'
import { LoadingSkeleton } from '../components/LoadingSkeleton'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return <div className="rounded-xl border border-line bg-panel px-3 py-2 shadow-xl"><span className="block text-xs text-ink-muted">{label || payload[0].name}</span><strong className="mt-1 block text-sm text-ink">{formatMoney(payload[0].value)}</strong></div>
}

export default function InsightsPage() {
  const expenses = useFintrackStore((state) => state.expenses)
  const isLoading = useFintrackStore((state) => state.isLoading)
  const [now] = useState(() => new Date())
  const thisMonth = expenses.filter((item) => item.expenseDate?.slice(0, 7) === monthKey(now))
  const total = thisMonth.reduce((sum, item) => sum + Number(item.amount), 0)
  const categories = categoryTotals(thisMonth)
  const trend = useMemo(() => monthlyTotals(expenses), [expenses])
  const topCategory = categories[0]

  return (
    <motion.div {...entrance}>
      <PageHeader eyebrow="PATTERNS, NOT PRESSURE" title="Your money story" description="Thoughtful insights to help you feel good about your choices." action={<span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-2 text-xs text-ink-soft"><i className="size-2 rounded-full bg-primary-500" />This month</span>} />
      <section className="mb-4 grid gap-3 sm:grid-cols-2">
        <motion.article whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 340, damping: 24 }} className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-5 shadow-sm"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-500/10 text-primary-700 dark:text-primary-300"><Sparkles size={20} /></span><div><span className="text-xs text-ink-soft">Spent this month</span><strong className="mt-1 block font-display text-xl font-bold text-ink">{isLoading ? '—' : formatMoney(total)}</strong><small className="mt-1 block text-xs text-ink-muted">Across {thisMonth.length} {thisMonth.length === 1 ? 'transaction' : 'transactions'}</small></div></motion.article>
        <motion.article whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 340, damping: 24 }} className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-5 shadow-sm"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-500/10 text-primary-700 dark:text-primary-300"><Lightbulb size={20} /></span><div><span className="text-xs text-ink-soft">Your top category</span><strong className="mt-1 block font-display text-lg font-bold text-ink">{topCategory?.name || 'Not yet discovered'}</strong><small className="mt-1 block text-xs text-ink-muted">{topCategory ? `${formatMoney(topCategory.value)} this month` : 'Add an expense to get started'}</small></div></motion.article>
      </section>
      <section className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <motion.article {...entrance} className="rounded-2xl border border-line bg-panel p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[.15em] text-primary-700 dark:text-primary-300">MONTH BY MONTH</p><h2 className="mt-1 font-display text-lg font-bold text-ink">Spending rhythm</h2></div><strong className="text-sm text-ink-soft">{formatMoney(trend.at(-1)?.total || 0)}</strong></div>
          {isLoading ? <LoadingSkeleton className="mt-6 h-64" /> : <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={trend} margin={{ top: 12, right: 8, bottom: 0, left: -16 }}><CartesianGrid vertical={false} stroke="var(--line)" strokeDasharray="3 5" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--ink-muted)', fontSize: 11 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--ink-muted)', fontSize: 10 }} tickFormatter={(value) => value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`} width={48} /><Tooltip content={<ChartTooltip />} /><Bar dataKey="total" fill="#278f5d" radius={[7, 7, 2, 2]} maxBarSize={40} /></BarChart></ResponsiveContainer>
          </div>}
        </motion.article>
        <motion.article {...entrance} className="rounded-2xl border border-line bg-panel p-5 shadow-sm sm:p-6">
          <p className="text-[10px] font-bold tracking-[.15em] text-primary-700 dark:text-primary-300">THIS MONTH</p><h2 className="mt-1 font-display text-lg font-bold text-ink">Where it goes</h2>
          {isLoading ? <LoadingSkeleton className="mx-auto mt-6 size-48 rounded-full" /> : categories.length === 0 ? <div className="flex min-h-64 flex-col items-center justify-center text-center"><span className="grid size-12 place-items-center rounded-2xl bg-primary-500/10 text-primary-700 dark:text-primary-300"><Sparkles size={22} /></span><strong className="mt-4 text-sm text-ink">Your first insight awaits</strong><span className="mt-1 max-w-52 text-xs leading-5 text-ink-muted">Log a transaction to see your spending categories.</span><Link to="/expenses" className="mt-4 text-xs font-semibold text-primary-700 dark:text-primary-300">Add an expense <ArrowRight size={14} className="inline" /></Link></div> : <>
            <div className="relative mx-auto mt-3 h-52 max-w-xs"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categories} dataKey="value" nameKey="name" innerRadius={69} outerRadius={94} paddingAngle={3} stroke="none" cornerRadius={4}>{categories.map((item) => <Cell key={item.category} fill={item.color} />)}</Pie><Tooltip content={<ChartTooltip />} /></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-[9px] font-bold tracking-wider text-ink-muted">TOTAL</span><strong className="mt-1 text-sm text-ink">{formatMoney(total)}</strong></div></div>
            <div className="grid gap-3">{categories.map((item) => <div className="grid grid-cols-[minmax(0,1fr)_36px_auto] items-center gap-3 text-xs" key={item.category}><span className="flex min-w-0 items-center gap-2 text-ink-soft"><i className="size-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} /><span className="truncate">{item.name}</span></span><span className="text-right text-ink-muted">{total ? Math.round((item.value / total) * 100) : 0}%</span><strong className="text-right font-semibold text-ink">{formatMoney(item.value)}</strong></div>)}</div>
          </>}
        </motion.article>
      </section>
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary-500/15 bg-primary-500/5 p-4"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-panel text-primary-600"><Sparkles size={17} /></span><div><strong className="text-xs text-ink">A gentle reminder</strong><p className="mt-1 text-xs text-ink-soft">Your budget is a tool, not a rule. Progress matters more than perfection.</p></div></div>
    </motion.div>
  )
}
