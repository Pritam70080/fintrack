import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Bell, ChartNoAxesCombined, ChevronDown, CircleHelp, Command, CreditCard, LayoutDashboard, LogOut, Menu, Moon, Search, Settings2, Sun, X } from 'lucide-react'
import { monthKey } from '../lib/finance'
import { springGentle } from '../lib/motion'
import { useFintrackStore } from '../stores/fintrackStore'
import Brand from './Brand'

const navigation = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/expenses', label: 'Transactions', icon: CreditCard },
  { to: '/insights', label: 'Insights', icon: ChartNoAxesCombined },
]

function Sidebar({ open, onNavigate, onNotice }) {
  const { user, expenses, logout } = useFintrackStore()
  const navigate = useNavigate()
  const [now] = useState(() => new Date())
  const currentMonth = monthKey(now)
  const hasCurrentMonthSpending = expenses.some((item) => item.expenseDate?.slice(0, 7) === currentMonth)

  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <motion.aside
      animate={{ x: open ? 0 : undefined }}
      transition={springGentle}
      className={`fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col border-r border-line bg-panel p-4 transition-transform md:static md:z-auto md:w-[250px] md:translate-x-0 md:p-5 ${open ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:shadow-none'}`}
    >
      <Brand />
      <div className="mt-9 flex items-center gap-3 rounded-2xl border border-line bg-page p-3">
        <span className="grid size-9 place-items-center rounded-xl bg-primary-500/10 font-bold text-primary-700 dark:text-primary-300">P</span>
        <span className="min-w-0 flex-1"><strong className="block text-xs text-ink">Personal space</strong><small className="mt-0.5 block text-[10px] text-ink-muted">Your workspace</small></span><ChevronDown size={15} className="text-ink-muted" />
      </div>
      <p className="mb-2 mt-8 px-2 text-[10px] font-bold tracking-[.15em] text-ink-muted">WORKSPACE</p>
      <nav aria-label="Main navigation" className="grid gap-1">
        {navigation.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onNavigate} className={({ isActive }) => `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition ${isActive ? 'bg-primary-500/10 font-semibold text-primary-800 dark:text-primary-300' : 'text-ink-soft hover:bg-page hover:text-ink'}`}>
            <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{to === '/expenses' && expenses.length > 0 && <span className="ml-auto rounded-full bg-page px-2 py-0.5 text-[10px] text-ink-muted">{expenses.length}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="flex-1" />
      <div className="mb-4 rounded-2xl border border-primary-500/15 bg-linear-to-br from-primary-500/10 to-panel p-4">
        <span className="grid size-8 place-items-center rounded-xl bg-panel text-primary-600 shadow-sm"><Command size={17} /></span>
        <p className="mt-3 font-display text-sm font-bold leading-5 text-ink">Small steps make<br />a big difference.</p>
        <p className="mt-1 text-[11px] text-ink-soft">You’re doing great.</p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-primary-500/15"><span className={`block h-full rounded-full bg-primary-500 transition-all ${hasCurrentMonthSpending ? 'w-full' : 'w-3/5'}`} /></div>
        <p className="mt-2 text-[9px] text-ink-muted">A little more mindful, every day.</p>
      </div>
      <div className="grid gap-1 border-b border-line pb-4">
        <a href="mailto:support@fintrack.app" className="flex items-center gap-3 rounded-xl px-2 py-2 text-xs text-ink-soft hover:bg-page"><CircleHelp size={17} />Help & support</a>
        <button type="button" onClick={() => onNotice('Settings are coming soon.')} className="flex items-center gap-3 rounded-xl px-2 py-2 text-left text-xs text-ink-soft hover:bg-page"><Settings2 size={17} />Settings</button>
      </div>
      <div className="flex items-center gap-3 pt-4">
        <span className="grid size-9 place-items-center rounded-full bg-primary-500/10 text-sm font-bold text-primary-800 dark:text-primary-300">{user?.name?.charAt(0)?.toUpperCase() || 'Y'}</span>
        <span className="min-w-0 flex-1"><strong className="block truncate text-xs text-ink">{user?.name || 'Your account'}</strong><small className="mt-0.5 block truncate text-[10px] text-ink-muted">{user?.email || 'Fintrack member'}</small></span>
        <button type="button" aria-label="Sign out" onClick={signOut} className="grid size-8 place-items-center rounded-lg text-ink-muted hover:bg-page hover:text-ink"><LogOut size={16} /></button>
      </div>
    </motion.aside>
  )
}

function Topbar({ theme, setTheme, onMenu, onNotice }) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPage = navigation.find((item) => item.to === location.pathname)?.label || 'Overview'
  const [query, setQuery] = useState('')

  const search = (event) => {
    event.preventDefault()
    if (query.trim()) navigate(`/expenses?search=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-panel/95 px-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Open menu" onClick={onMenu} className="grid size-9 place-items-center rounded-xl text-ink-soft hover:bg-page md:hidden"><Menu size={19} /></button>
        <p className="text-xs text-ink-muted">Workspace <span className="mx-1.5 text-line">/</span><strong className="font-semibold text-ink-soft">{currentPage}</strong></p>
      </div>
      <div className="flex items-center gap-2">
        <form onSubmit={search} className="hidden h-9 items-center gap-2 rounded-xl border border-line bg-page px-3 text-ink-muted sm:flex">
          <Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search transactions" placeholder="Search anything..." className="w-36 bg-transparent text-xs text-ink outline-none placeholder:text-ink-muted md:w-44" />
          <kbd className="rounded border border-line bg-panel px-1.5 py-0.5 text-[9px]">↵</kbd>
        </form>
        <button type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="grid size-9 place-items-center rounded-xl text-ink-soft transition hover:bg-page hover:text-primary-600">{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
        <button type="button" aria-label="Notifications" onClick={() => onNotice('You’re all caught up.')} className="relative grid size-9 place-items-center rounded-xl text-ink-soft transition hover:bg-page hover:text-primary-600"><Bell size={18} /><i className="absolute right-2 top-2 size-1.5 rounded-full bg-primary-500 ring-2 ring-panel" /></button>
      </div>
    </header>
  )
}

export default function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const { user, theme, setTheme, fetchExpenses } = useFintrackStore()
  const firstName = user?.name?.trim().split(/\s+/)[0] || 'there'

  useEffect(() => {
    fetchExpenses().catch((error) => setNotice(error.message))
  }, [fetchExpenses])

  return (
    <div className="min-h-screen bg-page font-sans text-ink md:flex">
      <Sidebar open={mobileMenuOpen} onNavigate={() => setMobileMenuOpen(false)} onNotice={setNotice} />
      {mobileMenuOpen && <button aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-30 bg-ink/35 md:hidden" />}
      <div className="min-w-0 flex-1">
        <Topbar theme={theme} setTheme={setTheme} onMenu={() => setMobileMenuOpen(true)} onNotice={setNotice} />
        <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-10">
          <AnimatePresence>
            {notice && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={springGentle} role="status" className="fixed right-4 top-20 z-50 flex max-w-sm items-center gap-4 rounded-2xl border border-line bg-panel px-4 py-3 text-sm text-ink shadow-xl">{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')} className="ml-auto text-ink-muted hover:text-ink"><X size={15} /></button></motion.div>}
          </AnimatePresence>
          <Outlet context={{ user, firstName, setNotice }} />
        </main>
      </div>
    </div>
  )
}
