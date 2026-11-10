import { motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, CalendarDays, ChartNoAxesCombined, CirclePlus, LockKeyhole, PieChart, Sparkles, WalletCards } from 'lucide-react'
import { CATEGORY_COLORS, CATEGORY_LABELS, formatMoney } from '../../lib/finance'
import { springGentle } from '../../lib/motion'

const features = [
  { title: 'See the whole picture', body: 'A thoughtful overview of your month, without the spreadsheet energy.', icon: ChartNoAxesCombined, className: 'md:col-span-3 xl:col-span-7', visual: 'trend' },
  { title: 'Know where it goes', body: 'Easy-to-read categories help you notice what matters to you.', icon: PieChart, className: 'md:col-span-3 xl:col-span-5', visual: 'categories' },
  { title: 'Keep the little things', body: 'Add an expense in seconds. Future you will appreciate it.', icon: CirclePlus, className: 'md:col-span-3 xl:col-span-4', visual: 'quick-add' },
  { title: 'Build your own rhythm', body: 'A month-by-month view makes change feel clear and achievable.', icon: CalendarDays, className: 'md:col-span-3 xl:col-span-4', visual: 'rhythm' },
  { title: 'Your money stays yours', body: 'Private account access keeps your financial details personal.', icon: LockKeyhole, className: 'md:col-span-3 xl:col-span-4', visual: 'privacy' },
]

function TrendVisual() {
  return (
    <div className="relative mt-6 h-36 overflow-hidden rounded-2xl border border-line bg-panel/75 p-3 sm:mt-8 sm:h-40 sm:p-4">
      <div className="flex items-start justify-between"><div><span className="text-[10px] text-ink-muted">THIS MONTH</span><strong className="mt-1 block font-display text-xl text-ink">{formatMoney(24680)}</strong></div><span className="inline-flex items-center gap-1 rounded-full bg-primary-500/10 px-2 py-1 text-[9px] font-semibold text-primary-800 dark:text-primary-300"><ArrowDownRight size={12} />12%</span></div>
      <svg viewBox="0 0 560 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[78px] w-full">
        <defs><linearGradient id="landingTrendFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#278f5d" stopOpacity=".25" /><stop offset="1" stopColor="#278f5d" stopOpacity="0" /></linearGradient></defs>
        <path d="M0 74 C35 69 44 43 84 54 S137 77 176 48 S225 28 265 42 S327 69 364 34 S420 43 453 24 S515 34 560 7 V100 H0Z" fill="url(#landingTrendFill)" />
        <path d="M0 74 C35 69 44 43 84 54 S137 77 176 48 S225 28 265 42 S327 69 364 34 S420 43 453 24 S515 34 560 7" fill="none" stroke="#278f5d" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

function CategoryVisual() {
  const values = [38, 27, 19, 16]
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-line bg-panel/75 p-3 sm:mt-7 sm:flex-nowrap sm:gap-6 sm:p-4">
      <div className="relative size-32 shrink-0 rounded-full" style={{ background: `conic-gradient(${CATEGORY_COLORS.FOOD} 0 ${values[0]}%, ${CATEGORY_COLORS.TRANSPORT} ${values[0]}% ${values[0] + values[1]}%, ${CATEGORY_COLORS.SHOPPING} ${values[0] + values[1]}% ${values[0] + values[1] + values[2]}%, ${CATEGORY_COLORS.BILLS} ${values[0] + values[1] + values[2]}% 100%)` }}>
        <span className="absolute inset-[22px] grid place-items-center rounded-full bg-panel text-center"><span><small className="block text-[8px] tracking-wide text-ink-muted">MONTHLY</small><strong className="mt-1 block text-xs text-ink">{formatMoney(24680)}</strong></span></span>
      </div>
      <div className="grid gap-2.5">{['FOOD', 'TRANSPORT', 'SHOPPING', 'BILLS'].map((category) => <span className="flex items-center gap-2 text-[10px] text-ink-soft" key={category}><i className="size-2 rounded-full" style={{ background: CATEGORY_COLORS[category] }} />{CATEGORY_LABELS[category]}</span>)}</div>
    </div>
  )
}

function QuickAddVisual() {
  return <div className="mt-6 rounded-2xl border border-line bg-panel/80 p-3 sm:mt-7 sm:p-4"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-primary-500/10 text-primary-700 dark:text-primary-300"><CirclePlus size={19} /></span><div className="min-w-0"><strong className="block truncate text-xs text-ink">Coffee with friends</strong><span className="mt-1 block text-[10px] text-ink-muted">Food & drink · Today</span></div><strong className="ml-auto shrink-0 text-xs text-ink">−₹420</strong></div><div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[10px] text-primary-800 dark:text-primary-300"><Sparkles size={13} />One small entry. One clearer picture.</div></div>
}

function RhythmVisual() {
  const heights = [40, 62, 48, 75, 58, 84, 66, 92, 72, 81, 60, 75]
  return <div className="mt-6 flex h-24 items-end gap-1.5 rounded-2xl border border-line bg-panel/75 px-3 pb-3 pt-3 sm:mt-7 sm:h-28 sm:px-4 sm:pb-4">{heights.map((height, index) => <motion.i key={index} initial={{ height: 0 }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ ...springGentle, delay: index * .025 }} className={`flex-1 rounded-t-md ${index === 9 ? 'bg-primary-500' : 'bg-primary-500/20'}`} />)}</div>
}

function PrivacyVisual() {
  return <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-panel/75 p-3 sm:mt-7 sm:p-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-500/10 text-primary-700 dark:text-primary-300"><LockKeyhole size={18} /></span><div className="min-w-0 flex-1"><strong className="block text-xs text-ink">Your account. Your details.</strong><span className="mt-1 block text-[10px] text-ink-muted">Protected access, always.</span></div><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-500/10 text-primary-700 dark:text-primary-300"><ArrowUpRight size={14} /></span></div>
}

const visuals = { trend: TrendVisual, categories: CategoryVisual, 'quick-add': QuickAddVisual, rhythm: RhythmVisual, privacy: PrivacyVisual }

export default function FeatureBento() {
  return (
    <section id="features" className="scroll-mt-20 bg-panel py-16 sm:scroll-mt-24 sm:py-24 xl:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1.5 text-[10px] font-bold tracking-[.15em] text-primary-800 dark:text-primary-300"><WalletCards size={13} /> YOUR MONEY, WITH MORE MEANING</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em] text-ink sm:text-5xl">The little things,<br /><span className="text-primary-700 dark:text-primary-300">made clearer.</span></h2>
          <p className="mt-4 text-sm leading-6 text-ink-soft sm:text-base">The essentials for feeling more in control, without making money management another full-time job.</p>
        </div>
        <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-6 xl:grid-cols-12">
          {features.map(({ title, body, icon: Icon, className, visual }, index) => {
            const Visual = visuals[visual]
            return (
              <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ ...springGentle, delay: index * .055 }} whileHover={{ y: -4 }} className={`group min-w-0 overflow-hidden rounded-[24px] border border-line bg-page p-4 transition-shadow hover:shadow-[0_18px_50px_-25px_rgba(27,72,45,.22)] sm:rounded-[26px] sm:p-6 lg:p-7 ${className}`}>
                <span className="grid size-11 place-items-center rounded-2xl bg-primary-500/10 text-primary-700 transition group-hover:bg-primary-500 group-hover:text-white dark:text-primary-300 dark:group-hover:text-white"><Icon size={20} /></span>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink sm:mt-5 sm:text-xl">{title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-ink-soft">{body}</p>
                <Visual />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
