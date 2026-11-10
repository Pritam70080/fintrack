import { ChartNoAxesCombined } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Brand({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 font-display text-xl font-extrabold tracking-[-0.06em] text-ink ${className}`}>
      <span className="grid size-8 place-items-center rounded-xl rounded-bl-sm bg-linear-to-br from-primary-400 to-primary-700 text-white shadow-sm">
        <ChartNoAxesCombined size={18} />
      </span>
      <span>fintrack<span className="text-primary-500">.</span></span>
    </Link>
  )
}
