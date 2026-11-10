import { motion } from 'motion/react'
import { entrance } from '../lib/motion'

export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <motion.div {...entrance} className="mb-6 flex items-end justify-between gap-4 max-sm:items-start">
      <div>
        <p className="mb-2 text-[10px] font-bold tracking-[.18em] text-primary-700 dark:text-primary-300">{eyebrow}</p>
        <h1 className="font-display text-3xl font-bold tracking-[-.045em] text-ink max-sm:text-2xl">{title}<span className="text-primary-500">.</span></h1>
        <p className="mt-2 text-sm text-ink-soft">{description}</p>
      </div>
      {action}
    </motion.div>
  )
}
