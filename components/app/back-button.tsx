'use client'

import { ChevronLeft } from 'lucide-react'
import { useNav } from '@/lib/navigation'

export function BackButton() {
  const { canGoBack, back } = useNav()

  if (!canGoBack) return null

  return (
    <button
      onClick={back}
      className="p-2 hover:bg-muted rounded-lg transition-colors"
      title="Go back"
      aria-label="Go back"
    >
      <ChevronLeft className="w-5 h-5 text-foreground" />
    </button>
  )
}
