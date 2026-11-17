import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChartNoAxesCombined, ChevronDown, CircleHelp, Command, CreditCard, LayoutDashboard, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { monthKey } from '../lib/finance'
import { useFintrackStore } from '../stores/fintrackStore'
import Brand from './Brand'

const navigation = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/expenses', label: 'Transactions', icon: CreditCard },
  { to: '/insights', label: 'Insights', icon: ChartNoAxesCombined },
]

export default function Sidebar({ open, onNavigate }) {
  const { user, token, expenses, logout } = useFintrackStore()
  const navigate = useNavigate()
  const [now] = useState(() => new Date())
  const currentMonth = monthKey(now)
  const hasCurrentMonthSpending = expenses.some((item) => item.expenseDate?.slice(0, 7) === currentMonth)

  const signOut = () => {
    logout()
    onNavigate()
    navigate('/login', { replace: true })
    toast.success('You have been signed out.')
  }

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-[270px] flex-col overflow-y-auto border-r border-line bg-panel p-4 transition-transform md:static md:z-auto md:h-full md:w-[250px] md:translate-x-0 md:p-5 ${open ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:shadow-none'}`}>
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
      <div className="hidden flex-1 md:block" />
      <div className="my-4 hidden rounded-2xl border border-primary-500/15 bg-linear-to-br from-primary-500/10 to-panel p-4 md:block">
        <span className="grid size-8 place-items-center rounded-xl bg-panel text-primary-600 shadow-sm"><Command size={17} /></span>
        <p className="mt-3 font-display text-sm font-bold leading-5 text-ink">Small steps make<br />a big difference.</p>
        <p className="mt-1 text-[11px] text-ink-soft">You’re doing great.</p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-primary-500/15"><span className={`block h-full rounded-full bg-primary-500 transition-all ${hasCurrentMonthSpending ? 'w-full' : 'w-3/5'}`} /></div>
        <p className="mt-2 text-[9px] text-ink-muted">A little more mindful, every day.</p>
      </div>
      <div className="mt-auto grid shrink-0 gap-1 border-b border-line pb-3">
        <a href="mailto:support@fintrack.app" className="flex items-center gap-3 rounded-xl px-2 py-2 text-xs text-ink-soft hover:bg-page"><CircleHelp size={17} />Help &amp; support</a>
      </div>
      <div className="sticky bottom-0 flex shrink-0 items-center gap-3 bg-panel pt-3 pb-[env(safe-area-inset-bottom)]">
        {user?.profileImage
          ? <img src={user.profileImage} alt="" referrerPolicy="no-referrer" className="size-9 rounded-full object-cover" />
          : <span className="grid size-9 place-items-center rounded-full bg-primary-500/10 text-sm font-bold text-primary-800 dark:text-primary-300">{user?.name?.charAt(0)?.toUpperCase() || (token ? 'Y' : 'G')}</span>}
        <span className="min-w-0 flex-1"><strong className="block truncate text-xs text-ink">{user?.name || (token ? 'Your account' : 'Guest mode')}</strong><small className="mt-0.5 block truncate text-[10px] text-ink-muted">{user?.email || (token ? 'Fintrack member' : 'Browsing Fintrack')}</small></span>
        {token
          ? <button type="button" aria-label="Sign out" onClick={signOut} className="grid size-9 shrink-0 place-items-center rounded-lg text-ink-muted hover:bg-page hover:text-ink"><LogOut size={16} /></button>
          : <Link to="/login" onClick={onNavigate} className="shrink-0 rounded-lg px-2 py-2 text-xs font-semibold text-primary-700 hover:bg-page dark:text-primary-300">Sign in</Link>}
      </div>
    </aside>
  )
}
