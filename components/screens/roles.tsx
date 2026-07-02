"use client"

import Image from "next/image"
import { Building2, Wrench, User, HardHat, ChevronRight } from "lucide-react"
import { useNav } from "@/lib/navigation"
import { ROLES, type Role } from "@/lib/types"

const ICONS: Record<Role, typeof Building2> = {
  office: Building2,
  tech: Wrench,
  customer: User,
  subcontractor: HardHat,
}

export function RolesScreen() {
  const nav = useNav()
  const order: Role[] = ["office", "tech", "customer", "subcontractor"]
  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card ring-1 ring-border">
          <Image src="/turbochyll-logo.png" alt="Turbochyll" width={32} height={32} className="h-8 w-8 object-contain" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">Choose your workspace</h1>
          <p className="text-xs text-muted-foreground">Explore the prototype as any role</p>
        </div>
      </div>
      <div className="space-y-3">
        {order.map((r) => {
          const meta = ROLES[r]
          const Icon = ICONS[r]
          return (
            <button
              key={r}
              onClick={() => {
                nav.setRole(r)
                nav.reset("dashboard")
              }}
              className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-colors hover:bg-muted/40 active:bg-muted"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-foreground">{meta.label}</span>
                <span className="block text-xs text-muted-foreground">{meta.description}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
