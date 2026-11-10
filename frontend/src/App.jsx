import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
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

function ProtectedRoute() {
  const token = useFintrackStore((state) => state.token)
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

function ThemeRoot() {
  const theme = useFintrackStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeRoot />
      <MotionConfig reducedMotion="user">
        <div className="font-sans">
          <Suspense fallback={<div className="grid min-h-screen place-items-center bg-page text-sm text-ink-soft"><span className="flex items-center gap-3"><i className="size-5 animate-spin rounded-full border-2 border-primary-500/20 border-t-primary-600" />Loading your workspace…</span></div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/oauth2/success" element={<OAuthSuccessPage />} />
              <Route path="/oauth2/error" element={<OAuthErrorPage />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AppShell />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/expenses" element={<TransactionsPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </MotionConfig>
    </BrowserRouter>
  )
}
