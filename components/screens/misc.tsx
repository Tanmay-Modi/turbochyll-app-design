"use client"

import { LogOut, ChevronRight, Bell, AlertTriangle, CheckCircle2, Info, Users, Building2 } from "lucide-react"
import { useNav } from "@/lib/navigation"
import { ROLES } from "@/lib/types"
import { ScrollArea, Card, SectionLabel, AppHeader } from "@/components/app/shell"
import { StatusChip } from "@/components/app/status-chip"

export function ProfileScreen() {
  const nav = useNav()
  const role = nav.role ?? "office"
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
        <h1 className="text-[15px] font-semibold text-foreground">Profile</h1>
      </header>
      <ScrollArea>
        <Card className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            RK
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-foreground">Ricky Kaur</p>
            <p className="text-xs text-muted-foreground">ricky@turbochyll.com</p>
            <div className="mt-1">
              <StatusChip status={ROLES[role].label} tone="blue" size="sm" />
            </div>
          </div>
        </Card>

        <div className="mt-5">
          <SectionLabel>Workspace</SectionLabel>
          <Card className="divide-y divide-border p-0">
            <Row icon={<Users className="h-4 w-4" />} label="Switch role" onClick={() => nav.push("roles")} />
            <Row icon={<Building2 className="h-4 w-4" />} label="Company · TurboChyll ERP v1.40" />
            <Row icon={<Bell className="h-4 w-4" />} label="Notifications" />
          </Card>
        </div>

        <div className="mt-5">
          <button
            onClick={() => nav.logout()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 py-3 text-sm font-semibold text-destructive active:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </ScrollArea>
    </div>
  )
}

function Row({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 p-3.5 text-left active:bg-muted">
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex-1 text-sm text-foreground">{label}</span>
      {onClick ? <ChevronRight className="h-4 w-4 text-muted-foreground" /> : null}
    </button>
  )
}

const ALERTS = [
  { id: 1, tone: "red" as const, icon: AlertTriangle, title: "SAR #43665 marked Urgent", body: "Colliers International — needs review", time: "10m ago" },
  { id: 2, tone: "amber" as const, icon: Info, title: "PO #12094 requires invoice", body: "Credit Card Purchase · Prevailing wage", time: "1h ago" },
  { id: 3, tone: "green" as const, icon: CheckCircle2, title: "Timesheet approved", body: "Loyd Lall — week of Jun 21", time: "3h ago" },
  { id: 4, tone: "amber" as const, icon: Bell, title: "Follow up: Pretect - 51 Madison", body: "Quote #13490 follow-up due today", time: "5h ago" },
]

const TONE: Record<string, string> = {
  red: "bg-red-100 text-red-600",
  amber: "bg-amber-100 text-amber-600",
  green: "bg-emerald-100 text-emerald-600",
}

export function AlertsScreen() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
        <h1 className="text-[15px] font-semibold text-foreground">Alerts</h1>
      </header>
      <ScrollArea>
        <div className="space-y-2.5">
          {ALERTS.map((a) => {
            const Icon = a.icon
            return (
              <Card key={a.id} className="flex items-start gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${TONE[a.tone]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.body}</p>
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground">{a.time}</span>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

export function PlaceholderScreen({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title={title} />
      <ScrollArea>
        <Card className="text-center">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{note ?? "This module is part of the TurboChyll prototype."}</p>
        </Card>
      </ScrollArea>
    </div>
  )
}
