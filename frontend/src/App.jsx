import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { Toaster, toast } from 'sonner'
import { apiRequest } from './lib/api'
import { useFintrackStore } from './stores/fintrackStore'
import AppShell from './components/AppShell'

const AuthPage = lazy(() => import('./pages/AuthPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'))
const InsightsPage = lazy(() => import('./pages/InsightsPage'))
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage'))
const OAuthSuccessPage = lazy(() => import('./pages/OAuthCallbackPages').then((module) => ({ default: module.OAuthSuccessPage })))
const OAuthErrorPage = lazy(() => import('./pages/OAuthCallbackPages').then((module) => ({ default: module.OAuthErrorPage })))
const LandingPage = lazy(() => import('./pages/LandingPage'))

function ThemeRoot() {
  const theme = useFintrackStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return null
}

export default function App() {
  const token = useFintrackStore((state) => state.token)
  const setAuth = useFintrackStore((state) => state.setAuth)
  const logout = useFintrackStore((state) => state.logout)
  const theme = useFintrackStore((state) => state.theme)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    let active = true
    const restoreSession = async () => {
      if (!token) {
        setAuthReady(true)
        return
      }

      setAuthReady(false)
      try {
        const response = await apiRequest('/auth/me', { token })
        if (!response?.data) throw new Error('The server did not return a user profile.')
        if (active) setAuth(token, response.data)
      } catch (error) {
        if (!active) return
        if (error.status === 401 || error.status === 403) {
          logout()
          toast.error('Your session has expired. Please sign in again.')
        } else {
          toast.error(error.message || 'Unable to refresh your account.')
        }
      } finally {
        if (active) setAuthReady(true)
      }
    }

    restoreSession()
    return () => { active = false }
  }, [logout, setAuth, token])

  return (
    <BrowserRouter>
      <ThemeRoot />
      <Toaster position="top-right" richColors theme={theme} />
      <MotionConfig reducedMotion="user">
        <div className="font-sans">
          <Suspense fallback={<div className="grid min-h-screen place-items-center bg-page text-sm text-ink-soft"><span className="flex items-center gap-3"><i className="size-5 animate-spin rounded-full border-2 border-primary-500/20 border-t-primary-600" />Loading your workspace…</span></div>}>
            {authReady ? <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/oauth2/success" element={<OAuthSuccessPage />} />
                <Route path="/oauth2/error" element={<OAuthErrorPage />} />
                <Route element={<AppShell />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/expenses" element={<TransactionsPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes> : <div className="grid min-h-screen place-items-center bg-page text-sm text-ink-soft"><span className="flex items-center gap-3"><i className="size-5 animate-spin rounded-full border-2 border-primary-500/20 border-t-primary-600" />Loading your workspace…</span></div>}
          </Suspense>
        </div>
      </MotionConfig>
    </BrowserRouter>
  )
}
