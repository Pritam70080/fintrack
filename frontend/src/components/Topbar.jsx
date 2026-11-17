import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'
import { toast } from 'sonner'

const pageLabels = {
  '/dashboard': 'Overview',
  '/expenses': 'Transactions',
  '/insights': 'Insights',
}

export default function Topbar({ theme, setTheme, onMenu }) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPage = pageLabels[location.pathname] || 'Overview'
  const [query, setQuery] = useState('')

  const search = (event) => {
    event.preventDefault()
    if (query.trim()) navigate(`/expenses?search=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b border-line bg-panel/95 px-3 backdrop-blur sm:px-4 md:px-8">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button type="button" aria-label="Open menu" onClick={onMenu} className="grid size-9 place-items-center rounded-xl text-ink-soft hover:bg-page md:hidden"><Menu size={19} /></button>
        <p className="truncate text-xs text-ink-muted">Workspace <span className="mx-1 text-line sm:mx-1.5">/</span><strong className="font-semibold text-ink-soft">{currentPage}</strong></p>
      </div>
      <div className="flex items-center gap-2">
        <form onSubmit={search} className="hidden h-9 items-center gap-2 rounded-xl border border-line bg-page px-3 text-ink-muted sm:flex">
          <Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search transactions" placeholder="Search anything..." className="w-36 bg-transparent text-xs text-ink outline-none placeholder:text-ink-muted md:w-44" />
          <kbd className="rounded border border-line bg-panel px-1.5 py-0.5 text-[9px]">↵</kbd>
        </form>
        <button type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="grid size-9 place-items-center rounded-xl text-ink-soft transition hover:bg-page hover:text-primary-600">{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
        <button type="button" aria-label="Notifications" onClick={() => toast.info('You’re all caught up.')} className="relative grid size-9 place-items-center rounded-xl text-ink-soft transition hover:bg-page hover:text-primary-600"><Bell size={18} /><i className="absolute right-2 top-2 size-1.5 rounded-full bg-primary-500 ring-2 ring-panel" /></button>
      </div>
    </header>
  )
}
