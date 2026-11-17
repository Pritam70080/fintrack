import { DollarSign, IndianRupee } from 'lucide-react'

export default function WorkspaceLoader() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-page px-6 text-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-36 size-80 rounded-full bg-primary-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-28 size-96 rounded-full bg-primary-300/15 blur-3xl" />
      </div>

      <div role="status" aria-live="polite" className="relative flex flex-col items-center text-center">
        <div aria-hidden="true" className="relative mb-7 grid size-16 place-items-center rounded-[1.4rem] border border-line/80 bg-panel p-2 shadow-[0_24px_70px_-30px_rgb(23_119_75/35%)]">
          <img src="/logo.png" alt="" className="size-full rounded-xl object-contain" />
          <span className="absolute -left-5 top-0 grid size-8 place-items-center rounded-xl border border-line bg-panel text-primary-600 shadow-md">
            <IndianRupee size={16} strokeWidth={2.2} />
          </span>
          <span className="absolute -bottom-1 -right-5 grid size-8 place-items-center rounded-xl border border-line bg-panel text-primary-600 shadow-md">
            <DollarSign size={16} strokeWidth={2.2} />
          </span>
        </div>
        <p className="font-display text-3xl font-extrabold tracking-[-0.06em]">
          fintrack<span className="text-primary-500">.</span>
        </p>
        <p className="mt-2 text-sm text-ink-soft">Your money, made clearer.</p>

        <div className="mt-9 flex items-center gap-2.5 text-sm font-medium text-ink-soft">
          <span className="flex items-center gap-1" aria-hidden="true">
            <i className="size-1.5 animate-pulse rounded-full bg-primary-500 motion-reduce:animate-none" />
            <i className="size-1.5 animate-pulse rounded-full bg-primary-500/70 motion-reduce:animate-none [animation-delay:150ms]" />
            <i className="size-1.5 animate-pulse rounded-full bg-primary-500/40 motion-reduce:animate-none [animation-delay:300ms]" />
          </span>
          <span>Preparing your workspace</span>
        </div>
      </div>
    </main>
  )
}
