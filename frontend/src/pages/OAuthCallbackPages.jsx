import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFintrackStore } from '../stores/fintrackStore'
import AuthPage from './AuthPage'

export function OAuthSuccessPage() {
  const navigate = useNavigate()
  const setAuth = useFintrackStore((state) => state.setAuth)
  const token = new URLSearchParams(window.location.hash.slice(1)).get('token')

  useEffect(() => {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    if (token) {
      setAuth(token, null)
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/login', { replace: true, state: { error: 'Google sign-in did not return an access token.' } })
    }
  }, [navigate, setAuth, token])

  return <div className="grid min-h-screen place-items-center bg-page text-sm text-ink-soft"><span className="flex items-center gap-3"><i className="size-5 animate-spin rounded-full border-2 border-primary-500/20 border-t-primary-600" />Finishing sign in…</span></div>
}

export function OAuthErrorPage() {
  const [params] = useSearchParams()
  return <AuthPage initialError={params.get('message') || 'Google sign-in could not be completed.'} />
}
