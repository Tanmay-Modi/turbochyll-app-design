"use client"

import { useMemo, useState } from "react"
import { Plus, AlertTriangle, Camera } from "lucide-react"
import { useNav } from "@/lib/navigation"
import { AppHeader, ScrollArea, Card, EmptyState, ActionBar, SectionLabel } from "@/components/app/shell"
import { StatusChip } from "@/components/app/status-chip"
import { Segmented, SearchBar, Field, Input, Textarea, PhotoGrid, DetailRow } from "@/components/app/widgets"
import { Button } from "@/components/ui/button"

type Asr = {
  id: string
  job: string
  tech: string
  date: string
  priority: "High" | "Medium" | "Low"
  finding: string
  recommendation: string
  status: "New" | "Quoted" | "Converted"
  linkedSar?: string
}

const ASRS: Asr[] = [
  { id: "43411", job: "DVM Industries - Metropolitan Hospital - 1901 1st", tech: "Ricky", date: "06/18/2026", priority: "High", finding: "Multiple CT sections showing corrosion and fill degradation.", recommendation: "Various CT repairs — sent to Landover for pricing.", status: "Quoted", linkedSar: "43665" },
  { id: "43370", job: "CBRE - Lincoln Hospital - 234 E 149th Street", tech: "AL", date: "06/16/2026", priority: "High", finding: "CT motor #11 drawing high amps, near failure.", recommendation: "CT motor replacement — sent to Landover for pricing.", status: "Quoted" },
  { id: "43665", job: "Colliers International - 28-40 West 23rd St", tech: "Loyd Lall", date: "07/01/2026", priority: "Medium", finding: "Condenser fan bearings noisy on AC-4.", recommendation: "Replace fan motor & bearings at next PM.", status: "New" },
  { id: "43290", job: "NY Methodist", tech: "Riccardo Scozzari", date: "06/10/2026", priority: "Low", finding: "Belt wear on AHU-2 observed during service.", recommendation: "Stock replacement belt, swap next visit.", status: "Converted" },
]

const TABS = [
  { value: "all", label: "All" },
  { value: "New", label: "New" },
  { value: "Quoted", label: "Quoted" },
  { value: "Converted", label: "Converted" },
]

export function AsrScreen() {
  const nav = useNav()
  const [tab, setTab] = useState("all")
  const [q, setQ] = useState("")
  const list = useMemo(
    () =>
      ASRS.filter((a) => (tab === "all" ? true : a.status === tab)).filter((a) =>
        q ? (a.job + a.id + a.tech).toLowerCase().includes(q.toLowerCase()) : true,
      ),
    [tab, q],
  )
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="Additional Service Recs" subtitle={`${list.length} recommendations`} />
      <ScrollArea>
        <div className="space-y-3">
          <SearchBar placeholder="Search ASR, job, tech" value={q} onChange={setQ} />
          <Segmented options={TABS} value={tab} onChange={setTab} />
          {list.length === 0 ? (
            <EmptyState title="No recommendations" />
          ) : (
            <div className="space-y-2.5">
              {list.map((a) => (
                <Card key={a.id} onClick={() => nav.push("asr-detail", { id: a.id })} className="p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">ASR-{a.id}</span>
                        <PriorityChip p={a.priority} />
                      </div>
                      <p className="mt-0.5 truncate text-[13px] text-muted-foreground">{a.job}</p>
                    </div>
                    <StatusChip status={a.status} size="sm" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-[12px] text-foreground">{a.recommendation}</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{a.tech}</span>
                    <span>·</span>
                    <span>{a.date}</span>
                    {a.linkedSar ? <span className="ml-auto font-medium text-primary">SAR #{a.linkedSar}</span> : null}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
      <ActionBar>
        <Button className="flex-1" onClick={() => nav.push("asr-new")}>
          <Plus className="mr-1 h-4 w-4" /> New ASR
        </Button>
      </ActionBar>
    </div>
  )
}

function PriorityChip({ p }: { p: Asr["priority"] }) {
  const tone = p === "High" ? "red" : p === "Medium" ? "amber" : "slate"
  return <StatusChip status={p} tone={tone as any} size="sm" />
}

export function AsrDetailScreen({ params }: { params: { id: string } }) {
  const nav = useNav()
  const a = ASRS.find((x) => x.id === params.id)
  if (!a) return null
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title={`ASR-${a.id}`} subtitle={a.status} />
      <ScrollArea>
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <PriorityChip p={a.priority} />
              <StatusChip status={a.status} />
            </div>
            <div className="mt-3 divide-y divide-border">
              <DetailRow label="Job" value={a.job} />
              <DetailRow label="Tech" value={a.tech} />
              <DetailRow label="Date" value={a.date} />
              {a.linkedSar ? <DetailRow label="Linked SAR" value={`#${a.linkedSar}`} /> : null}
            </div>
          </Card>
          <div>
            <SectionLabel>Finding</SectionLabel>
            <Card>
              <p className="text-[13px] leading-relaxed text-foreground">{a.finding}</p>
            </Card>
          </div>
          <div>
            <SectionLabel>Recommendation</SectionLabel>
            <Card>
              <p className="text-[13px] leading-relaxed text-foreground">{a.recommendation}</p>
            </Card>
          </div>
          <div>
            <SectionLabel>Photos</SectionLabel>
            <PhotoGrid photos={[{ id: "1", src: "/hvac-cooling-tower.jpg", label: "Finding" }]} />
          </div>
        </div>
      </ScrollArea>
      <ActionBar>
        <Button variant="outline" className="flex-1">
          Create Quote
        </Button>
        <Button className="flex-1" onClick={() => nav.push("opportunities")}>
          Add to Pipeline
        </Button>
      </ActionBar>
    </div>
  )
}

export function AsrNewScreen() {
  const nav = useNav()
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="New ASR" subtitle="Additional Service Rec" />
      <ScrollArea>
        <div className="space-y-4">
          <Card className="space-y-3">
            <Field label="Job / Customer">
              <Input placeholder="Search job…" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date">
                <Input defaultValue="07/02/2026" />
              </Field>
              <Field label="Tech">
                <Input defaultValue="Rony Cali" />
              </Field>
            </div>
            <Field label="Priority">
              <Segmented
                className="mt-0"
                options={[
                  { value: "High", label: "High" },
                  { value: "Medium", label: "Medium" },
                  { value: "Low", label: "Low" },
                ]}
                value="Medium"
                onChange={() => {}}
              />
            </Field>
          </Card>
          <Card>
            <Field label="Finding">
              <Textarea placeholder="What did you observe on site?" />
            </Field>
          </Card>
          <Card>
            <Field label="Recommendation">
              <Textarea placeholder="Recommended corrective action…" />
            </Field>
          </Card>
          <div>
            <SectionLabel>Photos</SectionLabel>
            <PhotoGrid photos={[]} onAdd={() => {}} />
          </div>
          <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-amber-700 ring-1 ring-inset ring-amber-200">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-[12px]">High priority ASRs notify the office team immediately for quoting.</p>
          </div>
        </div>
      </ScrollArea>
      <ActionBar>
        <Button variant="outline" className="flex-1" onClick={() => nav.back()}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={() => nav.back()}>
          <Camera className="mr-1 h-4 w-4" /> Submit ASR
        </Button>
      </ActionBar>
    </div>
  )
}
