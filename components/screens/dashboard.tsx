"use client"

import Image from "next/image"
import { AlertTriangle, ChevronRight, Plus, Clock, ArrowUpRight } from "lucide-react"
import { useNav } from "@/lib/navigation"
import { ROLES } from "@/lib/types"
import { MODULES } from "@/lib/modules"
import { ModuleIcon } from "@/components/app/icon"
import { Card, SectionLabel, ScrollArea } from "@/components/app/shell"
import { StatusChip } from "@/components/app/status-chip"
import { SARS, ACTIVITY_LOGS, WORK_ON_HAND, OPPORTUNITIES } from "@/lib/data"

function StatCard({ label, value, sub, tone = "text-primary", onClick }: { label: string; value: string; sub?: string; tone?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-1 flex-col rounded-2xl border border-border bg-card p-3 text-left shadow-sm active:bg-muted">
      <span className={`text-2xl font-bold ${tone}`}>{value}</span>
      <span className="mt-0.5 text-[12px] font-medium text-foreground">{label}</span>
      {sub ? <span className="text-[11px] text-muted-foreground">{sub}</span> : null}
    </button>
  )
}

export function DashboardScreen() {
  const nav = useNav()
  const role = nav.role ?? "office"
  const meta = ROLES[role]
  const modules = MODULES[role]
  const quickModules = modules.slice(0, role === "office" ? 8 : modules.length)

  const stats = {
    office: [
      { label: "Open SAR", value: String(SARS.filter((s) => s.state === "office").length), sub: "awaiting review", screen: "sar" },
      { label: "Work On Hand", value: String(WORK_ON_HAND.length), sub: "active jobs", screen: "workonhand", tone: "text-emerald-600" },
      { label: "Opportunities", value: String(OPPORTUNITIES.filter((o) => !o.archived).length), sub: "in pipeline", screen: "opportunities", tone: "text-orange-600" },
    ],
    tech: [
      { label: "My SAR", value: "4", sub: "to submit", screen: "sar" },
      { label: "Scheduled", value: "3", sub: "jobs today", screen: "schedule", tone: "text-emerald-600" },
      { label: "MAR Lines", value: "6", sub: "in progress", screen: "mar", tone: "text-orange-600" },
    ],
    customer: [
      { label: "Active Folders", value: "2", sub: "in progress", screen: "mar" },
      { label: "Filed", value: "5", sub: "completed", screen: "filedbyjob", tone: "text-emerald-600" },
      { label: "This Year", value: "12", sub: "reports", screen: "filedbyjob", tone: "text-orange-600" },
    ],
    subcontractor: [
      { label: "Assigned", value: "3", sub: "folders", screen: "mar" },
      { label: "Active", value: "2", sub: "in progress", screen: "activefolders", tone: "text-emerald-600" },
      { label: "Due Soon", value: "1", sub: "this week", screen: "activefolders", tone: "text-orange-600" },
    ],
  }[role]

  return (
    <div className="flex min-h-full flex-col">
      {/* header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card ring-1 ring-border">
          <Image src="/turbochyll-logo.png" alt="Turbochyll" width={26} height={26} className="h-6 w-6 object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-muted-foreground">Welcome back</p>
          <h1 className="truncate text-[15px] font-semibold text-foreground">Ricky · {meta.label}</h1>
        </div>
        <button onClick={() => nav.push("roles")} className="rounded-full bg-primary/10 px-3 py-1.5 text-[12px] font-medium text-primary">
          Switch
        </button>
      </header>

      <ScrollArea>
        {/* quick stats */}
        <div className="flex gap-2">
          {stats.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} tone={(s as any).tone} onClick={() => nav.push(s.screen)} />
          ))}
        </div>

        {/* urgent items */}
        {(role === "office" || role === "tech") && (
          <div className="mt-5">
            <SectionLabel>Urgent</SectionLabel>
            <Card className="border-red-200 bg-red-50/60" onClick={() => nav.push("sarDetail", { id: "43665" })}>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">SAR #43665</p>
                    <StatusChip status="Urgent" size="sm" />
                  </div>
                  <p className="truncate text-xs text-muted-foreground">Colliers International - 28-40 West 23rd St</p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
              </div>
            </Card>
          </div>
        )}

        {/* quick actions */}
        <div className="mt-5">
          <SectionLabel>Quick actions</SectionLabel>
          <div className="flex gap-2">
            {(role === "customer" || role === "subcontractor"
              ? [{ label: "Open MAR", screen: "mar" }, { label: "View Filed", screen: role === "customer" ? "filedbyjob" : "activefolders" }]
              : [
                  { label: "New SAR", screen: "sarDetail", params: { id: "new" } },
                  { label: "New PO", screen: "poDetail", params: { id: "new" } },
                  { label: "New Folder", screen: "marCreate" },
                ]
            ).map((a) => (
              <button
                key={a.label}
                onClick={() => nav.push(a.screen, (a as any).params)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 py-3 text-[13px] font-medium text-primary active:bg-primary/10"
              >
                <Plus className="h-4 w-4" /> {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* modules grid */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Modules</p>
            {modules.length > quickModules.length ? (
              <button onClick={() => nav.setTab("modules", "modules")} className="text-[12px] font-medium text-primary">
                See all
              </button>
            ) : null}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {quickModules.map((m) => (
              <button
                key={m.key + m.label}
                onClick={() => nav.push(m.key)}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card p-2.5 text-center shadow-sm active:bg-muted"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ModuleIcon name={m.icon} className="h-5 w-5" />
                </span>
                <span className="text-[10px] font-medium leading-tight text-foreground">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* recent activity */}
        <div className="mb-2 mt-5">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Recent activity</p>
            {role === "office" ? (
              <button onClick={() => nav.push("activity")} className="text-[12px] font-medium text-primary">
                View all
              </button>
            ) : null}
          </div>
          <Card className="divide-y divide-border p-0">
            {ACTIVITY_LOGS.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-foreground">
                    {a.user} · <span className="font-normal text-muted-foreground">{a.module}</span>
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{a.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}

export function ModulesScreen() {
  const nav = useNav()
  const role = nav.role ?? "office"
  const modules = MODULES[role]
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
        <h1 className="text-[15px] font-semibold text-foreground">All Modules</h1>
        <p className="text-xs text-muted-foreground">{ROLES[role].label}</p>
      </header>
      <ScrollArea>
        <div className="grid grid-cols-2 gap-3">
          {modules.map((m) => (
            <button
              key={m.key + m.label}
              onClick={() => nav.push(m.key)}
              className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-4 text-left shadow-sm active:bg-muted"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ModuleIcon name={m.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-foreground">{m.label}</span>
              {m.desc ? <span className="text-[11px] text-muted-foreground">{m.desc}</span> : null}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
