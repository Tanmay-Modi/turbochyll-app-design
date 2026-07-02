"use client"

import type { ReactNode } from "react"
import { Wifi, BatteryFull, SignalHigh } from "lucide-react"

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-0 sm:p-6">
      <div className="relative flex h-[100dvh] w-full max-w-[420px] flex-col overflow-hidden bg-background sm:h-[860px] sm:rounded-[2.75rem] sm:border-[10px] sm:border-slate-900 sm:shadow-2xl">
        {/* status bar */}
        <div className="relative z-30 flex items-center justify-between bg-card px-6 pb-1 pt-3 text-[12px] font-semibold text-foreground">
          <span>9:41</span>
          <div className="pointer-events-none absolute left-1/2 top-2 hidden h-5 w-28 -translate-x-1/2 rounded-full bg-slate-900 sm:block" />
          <div className="flex items-center gap-1.5">
            <SignalHigh className="h-3.5 w-3.5" />
            <Wifi className="h-3.5 w-3.5" />
            <BatteryFull className="h-4 w-4" />
          </div>
        </div>
        <div className="relative flex flex-1 flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
