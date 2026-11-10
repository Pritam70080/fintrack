import { useState } from 'react'
import { ArrowUpRight, ChartNoAxesCombined } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingFooter() {
  const [year] = useState(() => new Date().getFullYear())

  return (
    <footer id="footer" className="border-t border-line bg-panel">
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-8 sm:pb-7 sm:pt-14">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 font-display text-xl font-extrabold tracking-[-.06em] text-ink"><span className="grid size-8 place-items-center rounded-xl rounded-bl-sm bg-linear-to-br from-primary-500 to-primary-700 text-white"><ChartNoAxesCombined size={18} /></span><span>fintrack<span className="text-primary-500">.</span></span></Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-soft">A calmer way to keep track of your money. For the life you want to live.</p>
          </div>
          <div><h3 className="text-xs font-bold text-ink">EXPLORE</h3><div className="mt-4 grid gap-3 text-sm text-ink-soft"><a href="#features" className="hover:text-primary-700 dark:hover:text-primary-300">Features</a><a href="#how-it-works" className="hover:text-primary-700 dark:hover:text-primary-300">How it works</a><Link to="/register" className="hover:text-primary-700 dark:hover:text-primary-300">Get started</Link></div></div>
          <div><h3 className="text-xs font-bold text-ink">YOUR ACCOUNT</h3><div className="mt-4 grid gap-3 text-sm text-ink-soft"><Link to="/login" className="hover:text-primary-700 dark:hover:text-primary-300">Log in</Link><Link to="/register" className="hover:text-primary-700 dark:hover:text-primary-300">Create account</Link><a href="mailto:support@fintrack.app" className="inline-flex items-center gap-1 hover:text-primary-700 dark:hover:text-primary-300">Get support <ArrowUpRight size={13} /></a></div></div>
          <div><h3 className="text-xs font-bold text-ink">A NOTE ON PRIVACY</h3><p className="mt-4 text-sm leading-6 text-ink-soft">Your spending is personal. Your Fintrack account is, too.</p></div>
        </div>
        <div className="mt-9 flex flex-col items-start justify-between gap-3 border-t border-line pt-5 text-xs text-ink-muted sm:mt-12 sm:flex-row sm:items-center"><span>© {year} Fintrack. Made for a more mindful money life.</span><a href="mailto:support@fintrack.app?subject=Privacy%20policy" className="hover:text-primary-700 dark:hover:text-primary-300">Privacy & support</a></div>
      </div>
    </footer>
  )
}
