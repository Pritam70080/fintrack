import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'sonner'
import { useFintrackStore } from '../stores/fintrackStore'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, token, theme, setTheme, fetchExpenses } = useFintrackStore()
  const firstName = user?.name?.trim().split(/\s+/)[0] || 'there'

  useEffect(() => {
    if (token) {
      fetchExpenses().catch((error) => toast.error(error.message))
    }
  }, [fetchExpenses, token])

  return (
    <div className="flex h-dvh overflow-hidden bg-page font-sans text-ink">
      <Sidebar open={mobileMenuOpen} onNavigate={() => setMobileMenuOpen(false)} />
      {mobileMenuOpen && <button aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-30 bg-ink/35 md:hidden" />}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Topbar theme={theme} setTheme={setTheme} onMenu={() => setMobileMenuOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-10">
            <Outlet context={{ user, firstName }} />
          </div>
        </main>
      </div>
    </div>
  )
}
