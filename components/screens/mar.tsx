"use client"

import { useMemo, useState } from "react"
import { FolderOpen, Plus, Fan, CheckCircle2, Circle, Clock } from "lucide-react"
import { useNav } from "@/lib/navigation"
import { AppHeader, ScrollArea, Card, EmptyState, ActionBar, SectionLabel } from "@/components/app/shell"
import { StatusChip, LaborBadge } from "@/components/app/status-chip"
import { Segmented, SearchBar, Field, Input, DetailRow, PhotoGrid, SignaturePad } from "@/components/app/widgets"
import { Button } from "@/components/ui/button"
import { MAR_FOLDERS, MAR_LINES, type MarFolder } from "@/lib/data"

const STATUS_LABEL: Record<MarFolder["status"], string> = {
  P: "Pending",
  A: "Active",
  R: "Approved/Noted",
  F: "Filed",
}

const TABS = [
  { value: "all", label: "All" },
  { value: "P", label: "Pending" },
  { value: "A", label: "Active" },
  { value: "R", label: "Approved" },
  { value: "F", label: "Filed" },
]

export function MarScreen() {
  const nav = useNav()
  const [tab, setTab] = useState("all")
  const [q, setQ] = useState("")
  const list = useMemo(
    () =>
      MAR_FOLDERS.filter((f) => (tab === "all" ? true : f.status === tab)).filter((f) =>
        q ? (f.job + f.id).toLowerCase().includes(q.toLowerCase()) : true,
      ),
    [tab, q],
  )
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="MAR System" subtitle={`${list.length} folders`} />
      <ScrollArea>
        <div className="space-y-3">
          <SearchBar placeholder="Search folder or job" value={q} onChange={setQ} />
          <Segmented options={TABS} value={tab} onChange={setTab} />
          {list.length === 0 ? (
            <EmptyState icon={<FolderOpen className="h-7 w-7" />} title="No folders" />
          ) : (
            <div className="space-y-2.5">
              {list.map((f) => {
                const pct = Math.round((f.completed / f.lines) * 100)
                return (
                  <Card key={f.id} onClick={() => nav.push("mar-folder", { id: f.id })} className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-foreground">{f.id}</span>
                        <p className="mt-0.5 truncate text-[13px] text-muted-foreground">{f.job}</p>
                      </div>
                      <StatusChip status={STATUS_LABEL[f.status]} size="sm" />
                    </div>
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>
                          {f.completed}/{f.lines} lines
                        </span>
                        <span>Service {f.serviceDate}</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </ScrollArea>
      <ActionBar>
        <Button className="flex-1" onClick={() => nav.push("mar-new")}>
          <Plus className="mr-1 h-4 w-4" /> New Folder
        </Button>
      </ActionBar>
    </div>
  )
}

export function MarFolderScreen({ params }: { params: { id: string } }) {
  const nav = useNav()
  const f = MAR_FOLDERS.find((x) => x.id === params.id)
  if (!f) return null
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title={f.id} subtitle={STATUS_LABEL[f.status]} />
      <ScrollArea>
        <div className="space-y-4">
          <Card>
            <div className="divide-y divide-border">
              <DetailRow label="Job" value={f.job} />
              <DetailRow label="Service date" value={f.serviceDate} />
              <DetailRow label="Quote" value={`#${f.quote}`} />
              <DetailRow label="Progress" value={`${f.completed}/${f.lines} lines`} />
            </div>
          </Card>

          <div>
            <SectionLabel>Equipment Lines</SectionLabel>
            <div className="space-y-2.5">
              {MAR_LINES.map((l) => (
                <Card key={l.id} onClick={() => nav.push("mar-line", { id: l.id })} className="p-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        l.isCoolingTower ? "bg-teal-50 text-teal-600" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {l.isCoolingTower ? <Fan className="h-5 w-5" /> : <span className="text-[13px] font-bold">{l.tag.split("-")[0]}</span>}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{l.tag}</span>
                        <LaborBadge level={l.labor} />
                      </div>
                      <p className="truncate text-[12px] text-muted-foreground">
                        {l.type} · {l.location} · {l.areaServed}
                      </p>
                    </div>
                    <LineStatus status={l.status} />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Sign-off</SectionLabel>
            <Card>
              <SignaturePad label="Customer approval" signed={f.status === "R" || f.status === "F"} />
            </Card>
          </div>
        </div>
      </ScrollArea>
      <ActionBar>
        <Button variant="outline" className="flex-1">
          Export PDF
        </Button>
        <Button className="flex-1">Submit for approval</Button>
      </ActionBar>
    </div>
  )
}

function LineStatus({ status }: { status: string }) {
  if (status === "Completed") return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
  if (status === "Inprogress") return <Clock className="h-5 w-5 text-amber-500" />
  return <Circle className="h-5 w-5 text-muted-foreground/40" />
}

export function MarLineScreen({ params }: { params: { id: string } }) {
  const l = MAR_LINES.find((x) => x.id === params.id)
  const [status, setStatus] = useState(l?.status ?? "New")
  if (!l) return null
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title={l.tag} subtitle={l.type} />
      <ScrollArea>
        <div className="space-y-4">
          <Card>
            <Field label="Status">
              <Segmented
                options={[
                  { value: "New", label: "New" },
                  { value: "Inprogress", label: "In Progress" },
                  { value: "Completed", label: "Completed" },
                ]}
                value={status}
                onChange={(v) => setStatus(v as any)}
              />
            </Field>
          </Card>
          <Card>
            <div className="divide-y divide-border">
              <DetailRow label="Condition" value={l.condition} />
              <DetailRow label="Building" value={l.building} />
              <DetailRow label="Location" value={l.location} />
              <DetailRow label="Area served" value={l.areaServed} />
              <DetailRow label="Manufacturer" value={l.manufacturer} />
              <DetailRow label="Model" value={l.model} />
              <DetailRow label="Serial" value={l.serial} />
              <DetailRow label="Assigned tech" value={l.tech} />
            </div>
          </Card>
          {l.isCoolingTower ? (
            <div className="flex items-center justify-between rounded-xl bg-teal-50 p-3 text-teal-700 ring-1 ring-inset ring-teal-200">
              <span className="text-[12px] font-medium">Requires Cooling Tower Inspection (CTIC)</span>
              <Button size="sm" variant="outline">
                Open CTIC
              </Button>
            </div>
          ) : null}
          <div>
            <SectionLabel>Photos</SectionLabel>
            <PhotoGrid photos={[{ id: "1", src: "/hvac-nameplate.jpg", label: "Nameplate" }]} onAdd={() => {}} />
          </div>
        </div>
      </ScrollArea>
      <ActionBar>
        <Button className="flex-1">Save line</Button>
      </ActionBar>
    </div>
  )
}

export function MarNewScreen() {
  const nav = useNav()
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="New MAR Folder" />
      <ScrollArea>
        <Card className="space-y-3">
          <Field label="Job / Customer">
            <Input placeholder="Search job…" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Service date">
              <Input defaultValue="07/02/2026" />
            </Field>
            <Field label="Quote #">
              <Input placeholder="Optional" />
            </Field>
          </div>
        </Card>
      </ScrollArea>
      <ActionBar>
        <Button variant="outline" className="flex-1" onClick={() => nav.back()}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={() => nav.back()}>
          Create folder
        </Button>
      </ActionBar>
    </div>
  )
}
