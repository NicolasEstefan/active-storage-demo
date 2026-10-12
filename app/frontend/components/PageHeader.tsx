import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  children?: ReactNode
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">Active Storage demo</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {children && <div className="mt-3 text-slate-600">{children}</div>}
    </header>
  )
}
