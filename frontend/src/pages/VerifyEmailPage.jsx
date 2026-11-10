import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { apiRequest } from '../lib/api'
import Brand from '../components/Brand'
import GradientButton from '../components/GradientButton'

export default function VerifyEmailPage() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const [result, setResult] = useState({ loading: Boolean(token), message: '' })

  useEffect(() => {
    let active = true
    if (!token) return undefined

    apiRequest(`/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then((response) => active && setResult({ loading: false, message: response.message || 'Your email is verified.' }))
      .catch((error) => active && setResult({ loading: false, message: error.message }))

    return () => { active = false }
  }, [token])

  const loading = Boolean(token) && result.loading
  const message = token ? result.message : 'This verification link is missing its token.'

  return (
    <main className="grid min-h-screen place-items-center bg-page p-5 text-ink">
      <section className="w-full max-w-md rounded-3xl border border-line bg-panel p-7 shadow-xl sm:p-9">
        <Brand className="mb-12" />
        <span className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-primary-500/10 text-primary-700 dark:text-primary-300"><ShieldCheck size={23} /></span>
        <h1 className="text-center font-display text-2xl font-bold tracking-tight">{loading ? 'Verifying your email' : 'Email verification'}</h1>
        <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-6 text-ink-soft">{loading ? 'Just a moment while we confirm your address.' : message}</p>
        {loading ? <span className="mx-auto mt-8 block size-6 animate-spin rounded-full border-2 border-primary-500/20 border-t-primary-600" /> : <Link to="/login" className="mt-7 block"><GradientButton className="w-full">Continue to sign in <ArrowRight size={16} /></GradientButton></Link>}
      </section>
    </main>
  )
}
