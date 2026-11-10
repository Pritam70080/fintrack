import { motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatMoney } from '../../lib/finance'
import { springGentle } from '../../lib/motion'
import GradientButton from '../GradientButton'

const bars = [30, 48, 37, 57, 43, 74, 54, 68, 46, 86, 62, 78, 53, 93, 66, 82, 59, 73, 48, 89]

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ ...springGentle, delay: 0.12 }}
      className="relative mx-auto w-full max-w-[530px]"
    >
      <div className="absolute -inset-5 rounded-[2.5rem] bg-primary-500/10 blur-3xl" />
      <div className="relative rounded-[26px] border border-line bg-panel p-3 shadow-[0_35px_90px_-34px_rgba(27,72,45,.28)] sm:p-5">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2.5"><span className="grid size-8 place-items-center rounded-xl bg-primary-500/10 text-primary-700 dark:text-primary-300">◈</span><div><strong className="block text-xs text-ink">Your overview</strong><span className="text-[10px] text-ink-muted">A calmer money day</span></div></div>
          <span className="flex items-center gap-1.5 rounded-full bg-primary-500/10 px-2.5 py-1 text-[9px] font-semibold text-primary-800 dark:text-primary-300"><i className="size-1.5 rounded-full bg-primary-500" /> THIS MONTH</span>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4 min-[360px]:grid-cols-2 sm:grid-cols-[1.15fr_.85fr]">
          <div className="min-w-0 rounded-2xl bg-page p-3 sm:p-4">
            <span className="text-[10px] text-ink-muted">Total spent</span>
            <strong className="mt-1 block whitespace-nowrap font-display text-lg font-bold tracking-tight text-ink sm:text-2xl">{formatMoney(24680)}</strong>
            <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-primary-700 dark:text-primary-300 sm:text-[10px]"><ArrowDownRight size={13} /> 12% less than last month</span>
            <div className="mt-5 flex h-[84px] items-end gap-[3px]">
              {bars.map((height, index) => <motion.i key={index} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ ...springGentle, delay: .2 + index * .018 }} className={`flex-1 rounded-t-sm ${index > 16 ? 'bg-primary-300/60 dark:bg-primary-600/50' : 'bg-linear-to-t from-primary-600 to-primary-400'}`} />)}
            </div>
            <div className="mt-2 flex justify-between text-[9px] text-ink-muted"><span>OCT 01</span><span>NOV 07</span></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-2xl bg-primary-700 p-4 text-white dark:bg-[#303a33]"><span className="text-[10px] text-white/75">A good little habit</span><div className="mt-4 flex items-center justify-between"><strong className="font-display text-2xl">18<span className="ml-1 text-xs font-medium text-white/70">days</span></strong><span className="grid size-9 place-items-center rounded-full bg-white/15"><Sparkles size={17} /></span></div><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/20"><i className="block h-full w-3/4 rounded-full bg-primary-300" /></div></div>
            <div className="rounded-2xl border border-line bg-panel-muted p-4"><div className="flex items-center justify-between"><span className="text-[10px] text-ink-muted">Top category</span><ArrowUpRight size={14} className="text-primary-600" /></div><strong className="mt-2 block text-sm text-ink">Food & drink</strong><div className="mt-2 flex items-center gap-2"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"><i className="block h-full w-[62%] rounded-full bg-primary-500" /></span><span className="text-[9px] text-ink-muted">32%</span></div></div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-line px-3 py-2.5"><span className="grid size-7 place-items-center rounded-lg bg-primary-500/10 text-primary-700 dark:text-primary-300"><Check size={15} /></span><span className="flex-1 text-[10px] text-ink-soft">You’re building a clearer picture.</span><span className="text-[9px] font-medium text-primary-700 dark:text-primary-300">NICE WORK</span></div>
      </div>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-5 top-20 hidden items-center gap-2 rounded-2xl border border-line bg-panel px-3 py-2.5 shadow-xl sm:flex"><span className="grid size-8 place-items-center rounded-xl bg-primary-500/10 text-lg text-primary-700 dark:text-primary-300">₹</span><span><strong className="block text-xs text-ink">Every rupee, in view</strong><small className="text-[9px] text-ink-muted">Your money, made simple</small></span></motion.div>
    </motion.div>
  )
}

export default function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-12 -z-10 size-[500px] rounded-full bg-primary-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-36 bottom-0 -z-10 size-[420px] rounded-full bg-primary-300/15 blur-[110px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-12 sm:gap-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 lg:pb-24 lg:pt-20">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={springGentle} className="mx-auto max-w-xl lg:mx-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/5 px-3 py-1.5 text-xs font-medium text-primary-800 dark:text-primary-300"><Sparkles size={13} /> A fresh perspective on your finances</span>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,10vw,3rem)] font-bold leading-[1.08] tracking-[-.065em] text-ink sm:mt-6 sm:text-6xl lg:text-[4.25rem]">Your money,<br /><span className="relative whitespace-nowrap text-primary-700 dark:text-primary-300">made clearer.<svg viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-primary-400/70"><path d="M3 10C75 2 207 1 297 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" /></svg></span></h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-ink-soft sm:mt-6 sm:text-lg sm:leading-8">Track everyday expenses, understand your spending patterns, and make confident choices—without the spreadsheet.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/register"><GradientButton className="min-h-11 rounded-xl px-5 text-sm md:min-h-9 md:px-4 md:text-xs">Start your free account <span aria-hidden="true">↗</span></GradientButton></Link>
            <a href="#features" className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-ink-soft transition hover:bg-panel-muted hover:text-ink md:min-h-9 md:px-3 md:text-xs">Take a look around <span className="ml-2">↓</span></a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted sm:mt-8"><span className="inline-flex items-center gap-1.5"><Check size={14} className="text-primary-600" /> Simple to get started</span><span className="inline-flex items-center gap-1.5"><Check size={14} className="text-primary-600" /> Your data stays yours</span></div>
        </motion.div>
        <DashboardPreview />
      </div>
    </section>
  )
}
