import { motion } from 'motion/react'
import { springSnappy } from '../lib/motion'

export default function GradientButton({ children, className = '', type = 'button', disabled = false, ...props }) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1, scale: 1.015 }}
      whileTap={disabled ? undefined : { scale: 0.975 }}
      transition={springSnappy}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-linear-to-b from-primary-500 to-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_5px_14px_rgba(23,119,75,.18)] transition-shadow hover:shadow-[0_8px_20px_rgba(23,119,75,.26)] disabled:cursor-not-allowed disabled:opacity-55 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
