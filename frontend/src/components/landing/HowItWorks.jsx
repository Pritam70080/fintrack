import { motion } from 'motion/react'
import { ArrowRight, ClipboardPlus, Compass, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { springGentle } from '../../lib/motion'

const steps = [
  { number: '01', title: 'Add what you spend', description: 'A coffee, the rent, that little treat. Log it in a moment.', icon: ClipboardPlus },
  { number: '02', title: 'Notice your patterns', description: 'See your spending grouped into a picture that makes sense.', icon: Compass },
  { number: '03', title: 'Choose what matters', description: 'Use what you learn to make your next money choice feel right.', icon: Heart },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-page py-16 sm:scroll-mt-24 sm:py-24 xl:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <span className="text-[10px] font-bold tracking-[.16em] text-primary-700 dark:text-primary-300">A SMALLER WAY TO START</span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-.05em] text-ink sm:text-5xl">No big reset.<br />Just a <span className="text-primary-700 dark:text-primary-300">better next step.</span></h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft sm:mt-5">You don’t need a perfect budget or a fresh start on Monday. Just begin where you are.</p>
            <Link to="/register" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-800 transition hover:gap-3 dark:text-primary-300">Make your first step <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-3">
            {steps.map(({ number, title, description, icon: Icon }, index) => (
              <motion.article key={number} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ ...springGentle, delay: index * .08 }} className="flex gap-3 rounded-2xl border border-line bg-panel p-4 sm:gap-5 sm:p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-500/10 text-primary-700 sm:size-12 dark:text-primary-300"><Icon size={20} /></span>
                <div className="flex-1"><span className="text-[10px] font-bold tracking-widest text-primary-700 dark:text-primary-300">STEP {number}</span><h3 className="mt-1 font-display text-base font-bold text-ink">{title}</h3><p className="mt-1 text-xs leading-5 text-ink-soft sm:text-sm">{description}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
