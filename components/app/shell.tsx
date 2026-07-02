"use client"

import type { ReactNode } from "react"
import { ChevronLeft, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNav } from "@/lib/navigation"

export function AppHeader({
  title,
  subtitle,
  right,
  showBack = true,
  onBack,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
  showBack?: boolean
  onBack?: () => void
}) {
  const nav = useNav()
  const handleBack = onBack ?? nav.back
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-card/95 px-3 py-3 backdrop-blur">
      {showBack && nav.canGoBack ? (
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-muted"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      ) : (
        <div className="w-1" />
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-[15px] font-semibold leading-tight text-foreground">{title}</h1>
        {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
      {right ? <div className="flex shrink-0 items-center gap-1">{right}</div> : null}
    </header>
  )
}

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex min-h-full flex-col", className)}>{children}</div>
}

export function ScrollArea({
  children,
  className,
  padded = true,
}: {
  children: ReactNode
  className?: string
  padded?: boolean
}) {
  return (
    <div className={cn("no-scrollbar flex-1 overflow-y-auto", padded && "px-4 py-4", className)}>{children}</div>
  )
}

export function ActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-border bg-card/95 px-3 py-3 pb-5 backdrop-blur">
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">{children}</div>
    </div>
  )
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground", className)}>
      {children}
    </p>
  )
}

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-border bg-card p-4 shadow-sm shadow-black/[0.02]",
        onClick && "cursor-pointer transition-colors hover:bg-muted/40 active:bg-muted",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function EmptyState({ icon, title, hint }: { icon?: ReactNode; title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
      {icon ? <div className="text-muted-foreground">{icon}</div> : null}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {hint ? <p className="max-w-[220px] text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export function KebabButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="More options"
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
    >
      <MoreHorizontal className="h-5 w-5" />
    </button>
  )
}
