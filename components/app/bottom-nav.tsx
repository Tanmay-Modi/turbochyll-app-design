"use client"

import { Home, LayoutGrid, Bell, User, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNav } from "@/lib/navigation"

const TABS = [
  { key: "home", label: "Home", icon: Home, screen: "dashboard" },
  { key: "modules", label: "Modules", icon: LayoutGrid, screen: "modules" },
  { key: "schedule", label: "Schedule", icon: CalendarDays, screen: "schedule" },
  { key: "alerts", label: "Alerts", icon: Bell, screen: "alerts" },
  { key: "profile", label: "Profile", icon: User, screen: "profile" },
]

export function BottomNav() {
  const nav = useNav()
  return (
    <nav className="z-20 flex items-center justify-around border-t border-border bg-card/95 px-2 pb-5 pt-2 backdrop-blur">
      {TABS.map((t) => {
        const active = nav.tab === t.key
        const Icon = t.icon
        return (
          <button
            key={t.key}
            onClick={() => nav.setTab(t.key, t.screen)}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1 text-[10px] font-medium transition-colors",
              active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className={cn("h-5 w-5", active && "stroke-[2.25]")} />
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}
