import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useFintrackStore } from '../../stores/fintrackStore'
import Brand from '../Brand'
import GradientButton from '../GradientButton'

export default function LandingNav() {
  const theme = useFintrackStore((state) => state.theme)
  const setTheme = useFintrackStore((state) => state.setTheme)

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-page/85 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-8">
        <Brand />
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-ink-soft transition hover:text-primary-700 dark:hover:text-primary-300">Features</a>
          <a href="#how-it-works" className="text-sm text-ink-soft transition hover:text-primary-700 dark:hover:text-primary-300">How it works</a>
          <a href="#footer" className="text-sm text-ink-soft transition hover:text-primary-700 dark:hover:text-primary-300">About</a>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="grid size-10 place-items-center rounded-xl text-ink-soft transition hover:bg-panel-muted hover:text-primary-700 dark:hover:text-primary-300">{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
          <Link to="/login" className="hidden px-2 py-2 text-sm font-medium text-ink-soft transition hover:text-ink sm:block">Log in</Link>
          <Link to="/register"><GradientButton className="min-h-11 rounded-xl px-3.5 text-xs md:min-h-9 md:rounded-lg md:px-3.5">Get started <span aria-hidden="true">↗</span></GradientButton></Link>
        </div>
      </nav>
    </header>
  )
}
