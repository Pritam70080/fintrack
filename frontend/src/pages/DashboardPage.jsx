import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { motion } from 'motion/react'
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowDownRight, ArrowRight, CalendarDays, CirclePlus, Lightbulb, Sparkles, Wallet } from 'lucide-react'
import { useDashboardData } from '../lib/hooks/useDashboardData'
import { entrance } from '../lib/motion'
import { formatDate, formatMoney } from '../lib/finance'
import { useFintrackStore } from '../stores/fintrackStore'
import ExpenseDialog from '../components/ExpenseDialog'
import GradientButton from '../components/GradientButton'
import PageHeader from '../components/PageHeader'
import { LoadingSkeleton, StatSkeleton } from '../components/LoadingSkeleton'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return <div className="rounded-xl border border-line bg-panel px-3 py-2 shadow-xl"><span className="block text-xs text-ink-muted">{label || payload[0].name}</span><strong className="mt-1 block text-sm text-ink">{formatMoney(payload[0].value)}</strong></div>
}

function StatCard({ title, value, note, icon: Icon, tone }) {
  return (
    <motion.article whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 340, damping: 24 }} className="rounded-2xl border border-line bg-panel p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3"><span className="text-sm text-ink-soft">{title}</span><span className={`grid size-10 place-items-center rounded-xl ${tone}`}><Icon size={19} /></span></div>
      <strong className="mt-4 block font-display text-2xl font-bold tracking-tight text-ink">{value}</strong>
      <p className="mt-2 text-xs text-ink-muted">{note}</p>
    </motion.article>
  )
}

function SectionTitle({ label, title, action }) {
  return <div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[.15em] text-primary-700 dark:text-primary-300">{label}</p><h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink">{title}</h2></div>{action}</div>
}

export default function DashboardPage() {
  const { firstName, setNotice } = useOutletContext()
  const { createExpense } = useFintrackStore()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [now] = useState(() => new Date())
  const data = useDashboardData(now)
  const changeNote = data.change === null ? 'Log expenses to see your trend' : `${Math.abs(data.change)}% ${data.change > 0 ? 'more' : 'less'} than last month`

  const saveExpense = async (payload) => {
    await createExpense(payload)
    setNotice('Expense added to your transactions.')
  }

  return (
    <motion.div {...entrance}>
      <PageHeader
        eyebrow="YOUR MONEY, IN FOCUS"
        title={`Good ${now.getHours() < 12 ? 'morning' : now.getHours() < 18 ? 'afternoon' : 'evening'}, ${firstName}`}
        description="Here’s the story your spending is telling this month."
        action={<GradientButton aria-label="Add expense" onClick={() => setDialogOpen(true)} className="max-sm:size-11 max-sm:px-0"><CirclePlus size={18} /><span className="max-sm:hidden">Add expense</span></GradientButton>}
      />

      <section aria-label="Monthly spending summary" className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {data.isLoading ? [0, 1, 2].map((item) => <StatSkeleton key={item} />) : <>
          <StatCard title="Total spent this month" value={formatMoney(data.currentTotal)} note={changeNote} icon={Wallet} tone="bg-primary-500/10 text-primary-700 dark:text-primary-300" />
          <StatCard title="Transactions" value={data.thisMonthExpenses.length} note={`In ${new Intl.DateTimeFormat('en', { month: 'long' }).format(now)}`} icon={CalendarDays} tone="bg-primary-500/10 text-primary-800 dark:text-primary-300" />
          <div className="sm:col-span-2 xl:col-span-1"><StatCard title="Average per transaction" value={formatMoney(data.average)} note="Your typical spend this month" icon={ArrowDownRight} tone="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" /></div>
        </>}
      </section>

      <section className="mb-5 grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <motion.article {...entrance} className="rounded-2xl border border-line bg-panel p-5 shadow-sm sm:p-6">
          <SectionTitle label="SPENDING OVER TIME" title="A little perspective" action={<span className="rounded-full bg-panel-muted px-3 py-1.5 text-xs text-ink-soft">Last 6 months</span>} />
          {data.isLoading ? <LoadingSkeleton className="mt-6 h-64" /> : <div className="mt-5 h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
                <defs><linearGradient id="spendingFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#278f5d" stopOpacity={0.28} /><stop offset="100%" stopColor="#278f5d" stopOpacity={0.015} /></linearGradient></defs>
                <CartesianGrid vertical={false} stroke="var(--line)" strokeDasharray="3 5" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--ink-muted)', fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--ink-muted)', fontSize: 10 }} tickFormatter={(value) => value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`} width={48} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="total" stroke="#278f5d" strokeWidth={2.5} fill="url(#spendingFill)" activeDot={{ r: 5, fill: '#278f5d', stroke: 'var(--panel)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>}
          <p className="mt-3 flex items-center gap-2 text-xs text-ink-muted"><i className="size-2 rounded-full bg-primary-500" />Mindful spending, one day at a time</p>
        </motion.article>

        <motion.article {...entrance} className="rounded-2xl border border-line bg-panel p-5 shadow-sm sm:p-6">
          <SectionTitle label="WHERE IT GOES" title="Spending mix" />
          {data.isLoading ? <LoadingSkeleton className="mx-auto mt-6 size-48 rounded-full" /> : data.thisMonthExpenses.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center"><span className="grid size-12 place-items-center rounded-2xl bg-primary-500/10 text-primary-700 dark:text-primary-300"><Lightbulb size={22} /></span><strong className="mt-4 text-sm text-ink">Your first insight awaits</strong><p className="mt-1 max-w-52 text-xs leading-5 text-ink-muted">Add an expense to see your spending mix.</p><button type="button" onClick={() => setDialogOpen(true)} className="mt-4 text-xs font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-300">Add your first expense →</button></div>
          ) : <>
            <div className="relative mx-auto mt-2 h-48 max-w-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={data.categories} dataKey="value" nameKey="name" innerRadius={61} outerRadius={84} paddingAngle={3} stroke="none" cornerRadius={4}>{data.categories.map((item) => <Cell key={item.category} fill={item.color} />)}</Pie><Tooltip content={<ChartTooltip />} /></PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-[9px] font-bold tracking-wider text-ink-muted">THIS MONTH</span><strong className="mt-1 text-sm text-ink">{formatMoney(data.currentTotal)}</strong></div>
            </div>
            <div className="mt-3 grid gap-3">{data.categories.slice(0, 4).map((item) => <div key={item.category} className="flex items-center justify-between gap-3 text-xs"><span className="flex items-center gap-2 text-ink-soft"><i className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span><strong className="font-semibold text-ink">{formatMoney(item.value)}</strong></div>)}</div>
          </>}
        </motion.article>
      </section>

      <motion.section {...entrance} className="rounded-2xl border border-line bg-panel p-5 shadow-sm sm:p-6">
        <SectionTitle label="THE LATEST" title="Recent transactions" action={<Link to="/expenses" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-300">See all <ArrowRight size={14} /></Link>} />
        {data.isLoading ? <div className="mt-4 divide-y divide-line">{[0, 1, 2].map((item) => <div key={item} className="flex items-center gap-3 py-3"><LoadingSkeleton className="size-10 rounded-xl" /><LoadingSkeleton className="h-3 w-36" /><LoadingSkeleton className="ml-auto h-3 w-16" /></div>)}</div>
          : data.recent.length === 0 ? <div className="flex flex-wrap items-center gap-4 border-t border-line py-5"><span className="grid size-10 place-items-center rounded-xl bg-primary-500/10 text-primary-700 dark:text-primary-300"><Wallet size={19} /></span><div className="min-w-52 flex-1"><strong className="text-sm text-ink">Nothing to see here just yet</strong><p className="mt-1 text-xs text-ink-muted">Your transactions will show up here once you add them.</p></div><button type="button" onClick={() => setDialogOpen(true)} className="text-xs font-semibold text-primary-700 dark:text-primary-300">Add an expense <ArrowRight size={13} className="inline" /></button></div>
            : <div className="mt-3 divide-y divide-line">{data.recent.map((expense) => <div key={expense.id} className="flex min-h-14 items-center gap-3 py-2"><span className="grid size-10 place-items-center rounded-xl bg-primary-500/10 font-semibold text-primary-700 dark:text-primary-300">{expense.title.charAt(0).toUpperCase()}</span><div className="min-w-0 flex-1"><strong className="block truncate text-sm font-semibold text-ink">{expense.title}</strong><span className="mt-0.5 block text-xs text-ink-muted">{expense.category} · {formatDate(expense.expenseDate, { day: 'numeric', month: 'short' })}</span></div><strong className="whitespace-nowrap text-sm font-semibold text-ink">−{formatMoney(expense.amount)}</strong></div>)}</div>}
      </motion.section>
      <p className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-ink-muted"><Sparkles size={13} className="text-primary-500" />A healthier relationship with money, one day at a time.</p>
      {dialogOpen && <ExpenseDialog onClose={() => setDialogOpen(false)} onSave={saveExpense} />}
    </motion.div>
  )
}
