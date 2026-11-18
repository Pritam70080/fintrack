import { useEffect } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { apiRequest } from '../lib/api'
import { useFintrackStore } from '../stores/fintrackStore'

export function OAuthSuccessPage() {
  const navigate = useNavigate()
  const setAuth = useFintrackStore((state) => state.setAuth)
  const token = new URLSearchParams(window.location.hash.slice(1)).get('token')

  useEffect(() => {
    let cancelled = false
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)

    const finishSignIn = async () => {
      if (!token) {
        toast.error('Google sign-in did not return an access token.')
        navigate('/login', { replace: true })
        return
      }

      try {
        const response = await apiRequest('/auth/me', { token })
        if (!response?.data) {
          throw new Error('The server did not return a user profile.')
        }
        if (!cancelled) {
          setAuth(token, response.data)
          navigate('/dashboard', { replace: true })
        }
      } catch (error) {
        if (!cancelled) {
          setAuth(null, null)
          toast.error(error.message || 'Unable to load your Google profile.')
          navigate('/login', { replace: true })
        }
      }
    }

    finishSignIn()
    return () => {
      cancelled = true
    }
  }, [navigate, setAuth, token])

  return <div className="grid min-h-screen place-items-center bg-page text-sm text-ink-soft"><span className="flex items-center gap-3"><i className="size-5 animate-spin rounded-full border-2 border-primary-500/20 border-t-primary-600" />Finishing sign in…</span></div>
}

export function OAuthErrorPage() {
  const [params] = useSearchParams()
  useEffect(() => {
    toast.error(params.get('message') || 'Google sign-in could not be completed.')
  }, [params])
  return <Navigate to="/login" replace />
}
