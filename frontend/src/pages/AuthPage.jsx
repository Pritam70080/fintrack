import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import { apiRequest, oauthUrl } from '../lib/api'
import { springGentle } from '../lib/motion'
import { loginSchema, registerSchema } from '../lib/validation'
import { useFintrackStore } from '../stores/fintrackStore'
import Brand from '../components/Brand'
import GradientButton from '../components/GradientButton'

function GoogleMark() {
  return <svg className="size-4" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94a11.05 11.05 0 0 1-4.8 7.26l7.74 6C44.4 38.05 46.98 31.95 46.98 24.55Z" /><path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.2a23.94 23.94 0 0 0 0 21.58l7.98-6.2Z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.74-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.2C6.51 42.62 14.62 48 24 48Z" /></svg>
}

function FormError({ children }) {
  return children ? <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{children}</span> : null
}

const fieldClass = 'mt-1.5 w-full rounded-xl border border-line bg-page py-3 pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-ink-muted focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10'

export default function AuthPage({ initialError = '' }) {
  const isRegister = window.location.pathname === '/register'
  const navigate = useNavigate()
  const location = useLocation()
  const token = useFintrackStore((state) => state.token)
  const setAuth = useFintrackStore((state) => state.setAuth)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(initialError || location.state?.error || '')
  const [successMessage, setSuccessMessage] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onBlur',
  })

  if (token && !isRegister) return <Navigate to="/dashboard" replace />

  const submit = async (values) => {
    setErrorMessage('')
    setSuccessMessage('')
    try {
      if (isRegister) {
        const response = await apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(values) })
        setSuccessMessage(response.message || 'Account created. Please check your email to verify your address.')
        return
      }

      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: values.email, password: values.password }),
      })
      setAuth(response.data.accessToken, {
        id: response.data.userId,
        name: response.data.name,
        email: response.data.email,
      })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <main className="grid min-h-screen bg-page lg:grid-cols-[.9fr_1.1fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#183a2a] px-12 py-9 text-white lg:flex lg:flex-col xl:px-20">
        <div className="pointer-events-none absolute -right-36 -top-32 size-[520px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-72 -left-48 size-[620px] rounded-full border border-white/10" />
        <Brand className="relative text-white" />
        <div className="relative my-auto max-w-lg py-12">
          <span className="inline-flex items-center gap-2 text-sm text-white/80"><Sparkles size={15} /> A little more clarity, every day</span>
          <h2 className="mt-5 font-display text-5xl font-bold leading-[1.12] tracking-[-.05em]">Make room for<br />what <em className="text-primary-300">matters.</em></h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">Feel more present with your money. Track the little things, notice the patterns, and make choices that feel like you.</p>
          <div className="mt-9 max-w-sm rounded-3xl border border-white/15 bg-white/[.08] p-5 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-white/75"><span>This month</span><span className="flex items-center gap-2"><i className="size-2 rounded-full bg-primary-300" />Looking good</span></div>
            <strong className="mt-3 block font-display text-3xl tracking-tight">₹24,680<span className="text-xl text-white/60">.00</span></strong>
            <div className="mt-5 flex h-16 items-end gap-1">{[34, 48, 42, 63, 53, 78, 60, 92, 67, 83, 55, 74, 46, 67, 85, 57, 78, 62, 93, 52, 69, 84].map((height, index) => <i key={index} style={{ height: `${height}%` }} className={`flex-1 rounded-t-sm bg-linear-to-t from-primary-600 to-primary-300 ${index > 16 ? 'opacity-50' : ''}`} />)}</div>
            <div className="mt-3 flex justify-between text-[9px] text-white/60"><span>YOUR SPENDING, AT A GLANCE</span><span>↗ 12% less than last month</span></div>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-white/70"><ShieldCheck size={16} className="text-primary-300" /> Your money data stays private and secure.</p>
        </div>
        <span className="relative text-xs text-white/60">A calmer way to keep track of your money.</span>
      </section>

      <section className="flex min-h-screen flex-col items-center justify-center px-5 py-8 sm:px-10">
        <div className="mb-10 w-full max-w-md lg:hidden"><Brand /></div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springGentle}
          className="w-full max-w-md"
        >
          <div className="mb-7">
            <span className="mb-4 grid size-11 place-items-center rounded-2xl bg-primary-500/10 text-primary-700 dark:text-primary-300">{isRegister ? <UserRound size={21} /> : <Sparkles size={21} />}</span>
            <p className="text-[10px] font-bold tracking-[.18em] text-primary-700 dark:text-primary-300">{isRegister ? 'A FRESH START' : 'WELCOME BACK'}</p>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-[-.04em] text-ink">{isRegister ? 'Create your account' : 'Let’s get you in'}</h1>
            <p className="mt-2 text-sm text-ink-soft">{isRegister ? 'A few details and you’re on your way.' : 'Your money dashboard is right where you left it.'}</p>
          </div>

          {errorMessage && <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">{errorMessage}</div>}
          {successMessage ? (
            <div role="status" className="flex items-start gap-3 rounded-2xl border border-primary-500/20 bg-primary-500/5 p-4 text-sm leading-6 text-ink-soft"><ShieldCheck className="mt-0.5 shrink-0 text-primary-600" size={18} />{successMessage}</div>
          ) : (
            <>
              <a href={oauthUrl()} className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-line bg-panel text-sm font-semibold text-ink transition hover:bg-panel-muted"><GoogleMark />Continue with Google</a>
              <div className="my-5 flex items-center gap-3 text-xs text-ink-muted"><span className="h-px flex-1 bg-line" />or continue with email<span className="h-px flex-1 bg-line" /></div>
              <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-4">
                {isRegister && <label className="text-sm font-medium text-ink-soft">Your name<div className="relative mt-1.5"><UserRound size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" /><input autoComplete="name" maxLength={100} {...register('name')} placeholder="What should we call you?" className={fieldClass} /></div><FormError>{errors.name?.message}</FormError></label>}
                <label className="text-sm font-medium text-ink-soft">Email address<div className="relative mt-1.5"><Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" /><input type="email" autoComplete="email" {...register('email')} placeholder="you@example.com" className={fieldClass} /></div><FormError>{errors.email?.message}</FormError></label>
                <label className="text-sm font-medium text-ink-soft">Password<div className="relative mt-1.5"><LockKeyhole size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" /><input type={showPassword ? 'text' : 'password'} autoComplete={isRegister ? 'new-password' : 'current-password'} {...register('password')} placeholder={isRegister ? 'At least 8 characters' : 'Enter your password'} className={fieldClass} /><button type="button" className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-ink-muted hover:bg-panel-muted" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><FormError>{errors.password?.message}</FormError></label>
                {!isRegister && <p className="-mt-2 text-right text-xs text-ink-muted"><span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary-500" />Your data is private and secure</p>}
                <GradientButton type="submit" disabled={isSubmitting} className="mt-1 w-full">{isSubmitting ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}{!isSubmitting && <ArrowRight size={17} />}</GradientButton>
              </form>
            </>
          )}
          <p className="mt-6 text-center text-sm text-ink-soft">{isRegister ? 'Already have an account?' : 'New to Fintrack?'} <Link to={isRegister ? '/login' : '/register'} className="font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-300">{isRegister ? 'Sign in' : 'Create an account'}</Link></p>
          <p className="mx-auto mt-6 max-w-sm text-center text-xs leading-5 text-ink-muted">By continuing, you agree to our <a className="underline decoration-line underline-offset-2" href="mailto:support@fintrack.app?subject=Terms%20of%20service">Terms of Service</a> and <a className="underline decoration-line underline-offset-2" href="mailto:support@fintrack.app?subject=Privacy%20policy">Privacy Policy</a>.</p>
        </motion.div>
        <p className="mt-9 text-xs text-ink-muted lg:hidden">A calmer way to keep track of your money.</p>
      </section>
    </main>
  )
}
