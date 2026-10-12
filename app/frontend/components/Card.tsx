import type { ReactNode } from "react"

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur sm:p-8">
      {children}
    </div>
  )
}
