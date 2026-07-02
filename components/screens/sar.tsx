"use client"

import { useMemo, useState } from "react"
import { Plus, Camera, FileText, Clock, User, ChevronRight } from "lucide-react"
import { useNav } from "@/lib/navigation"
import { AppHeader, ScrollArea, Card, EmptyState, ActionBar, SectionLabel } from "@/components/app/shell"
import { StatusChip } from "@/components/app/status-chip"
import { Segmented, SearchBar, Field, Input, Textarea, PhotoGrid, SignaturePad, DetailRow } from "@/components/app/widgets"
import { Button } from "@/components/ui/button"
import { SARS, type Sar } from "@/lib/data"

const STATE_LABEL: Record<Sar["state"], string> = {
  office: "Office",
  processing: "Processing",
  billed: "To Be Billed",
  completed: "Completed",
  fileroom: "File Room",
  refrigerant: "Refrigerant",
}

const TABS = [
  { value: "all", label: "All" },
  { value: "office", label: "Office Admin" },
  { value: "completed", label: "Completed" },
  { value: "billed", label: "To Be Billed" },
  { value: "fileroom", label: "File Room" },
  { value: "refrigerant", label: "Refrigerant" },
]

export function SarScreen() {
  const nav = useNav()
  const [tab, setTab] = useState("all")
  const [q, setQ] = useState("")

  const list = useMemo(() => {
    return SARS.filter((s) => (tab === "all" ? true : s.state === tab)).filter((s) =>
      q ? (s.job + s.id + s.submittedBy).toLowerCase().includes(q.toLowerCase()) : true,
    )
  }, [tab, q])

  const totalST = list.reduce((a, s) => a + s.hoursST, 0)
  const totalOT = list.reduce((a, s) => a + s.hoursOT, 0)

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="Service Activity Report" subtitle={`${list.length} tickets`} />
      <ScrollArea>
        <div className="space-y-3">
          <SearchBar placeholder="Search ticket, job, tech" value={q} onChange={setQ} />
          <Segmented options={TABS} value={tab} onChange={setTab} />

          <Card className="flex items-center justify-around py-3">
            <Stat label="Tickets" value={String(list.length)} />
            <Divider />
            <Stat label="Hrs ST" value={String(totalST)} />
            <Divider />
            <Stat label="Hrs OT" value={String(totalOT)} tone="text-orange-600" />
          </Card>

          {list.length === 0 ? (
            <EmptyState icon={<FileText className="h-7 w-7" />} title="No tickets" hint="Try a different filter or search." />
          ) : (
            <div className="space-y-2.5">
              {list.map((s) => (
                <Card key={s.id} onClick={() => nav.push("sar-detail", { id: s.id })} className="p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">SAR #{s.id}</span>
                        {s.urgent ? <StatusChip status="Urgent" size="sm" /> : null}
                      </div>
                      <p className="mt-0.5 truncate text-[13px] text-muted-foreground">{s.job}</p>
                    </div>
                    <StatusChip status={STATE_LABEL[s.state]} size="sm" />
                  </div>
                  <div className="mt-2.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {s.submittedBy}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {s.hoursST}ST / {s.hoursOT}OT
                    </span>
                    {s.quoteTm ? <span className="ml-auto font-medium text-primary">{s.quoteTm}</span> : null}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
      <ActionBar>
        <Button className="flex-1" onClick={() => nav.push("sar-new")}>
          <Plus className="mr-1 h-4 w-4" /> New SAR
        </Button>
      </ActionBar>
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="text-center">
      <p className={`text-lg font-bold ${tone ?? "text-foreground"}`}>{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
function Divider() {
  return <span className="h-8 w-px bg-border" />
}

export function SarDetailScreen({ params }: { params: { id: string } }) {
  const sar = SARS.find((s) => s.id === params.id)
  if (!sar) return <PlaceholderMissing />
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title={`SAR #${sar.id}`} subtitle={STATE_LABEL[sar.state]} />
      <ScrollArea>
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <StatusChip status={STATE_LABEL[sar.state]} />
              {sar.urgent ? <StatusChip status="Urgent" /> : null}
            </div>
            <div className="mt-3 divide-y divide-border">
              <DetailRow label="Job" value={sar.job} />
              <DetailRow label="Date" value={sar.date} />
              <DetailRow label="Submitted by" value={sar.submittedBy} />
              <DetailRow label="Hours ST / OT" value={`${sar.hoursST} / ${sar.hoursOT}`} />
              {sar.assocAsr ? <DetailRow label="Assoc. ASR" value={`ASR-${sar.assocAsr}`} /> : null}
              {sar.quoteTm ? <DetailRow label="Quote / T&M" value={sar.quoteTm} /> : null}
            </div>
          </Card>

          <div>
            <SectionLabel>Work Performed</SectionLabel>
            <Card>
              <p className="text-[13px] leading-relaxed text-foreground">
                Arrived on site and assessed the reported issue. Performed diagnostics, replaced faulty components, and
                verified operation. System returned to normal operating parameters before departure.
              </p>
            </Card>
          </div>

          <div>
            <SectionLabel>Photos</SectionLabel>
            <PhotoGrid
              photos={[
                { id: "1", src: "/hvac-rooftop-unit.jpg", label: "Before" },
                { id: "2", src: "/hvac-gauge-reading.jpg", label: "Gauges" },
                { id: "3", src: "/hvac-repaired-unit.jpg", label: "After" },
              ]}
            />
          </div>

          <div>
            <SectionLabel>Sign-off</SectionLabel>
            <Card>
              <SignaturePad label="Customer signature" signed />
              <p className="mt-2 text-[11px] text-muted-foreground">Signed by site contact on {sar.date}</p>
            </Card>
          </div>
        </div>
      </ScrollArea>
      <ActionBar>
        <Button variant="outline" className="flex-1">
          <FileText className="mr-1 h-4 w-4" /> PDF
        </Button>
        <Button className="flex-1">Edit ticket</Button>
      </ActionBar>
    </div>
  )
}

export function SarNewScreen() {
  const nav = useNav()
  const [photos, setPhotos] = useState([{ id: "1", src: "/hvac-rooftop-unit.jpg", label: "Arrival" }])
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="New SAR" subtitle="Service Activity Report" />
      <ScrollArea>
        <div className="space-y-4">
          <Card className="space-y-3">
            <Field label="Job / Customer">
              <Input placeholder="Search job…" defaultValue="NHS US, LLC - 10 Vitamin Dr" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date">
                <Input type="text" defaultValue="07/02/2026" />
              </Field>
              <Field label="Submitted by">
                <Input defaultValue="Rony Cali" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Hours ST">
                <Input type="number" defaultValue="3" />
              </Field>
              <Field label="Hours OT">
                <Input type="number" defaultValue="0" />
              </Field>
            </div>
          </Card>

          <Card>
            <Field label="Work performed">
              <Textarea placeholder="Describe the work completed on site…" />
            </Field>
          </Card>

          <div>
            <SectionLabel>Photos</SectionLabel>
            <PhotoGrid
              photos={photos}
              min={2}
              onAdd={() => setPhotos((p) => [...p, { id: String(p.length + 1), src: "/hvac-gauge-reading.jpg", label: "Photo" }])}
            />
          </div>

          <Card>
            <SignaturePad label="Customer signature" />
          </Card>
        </div>
      </ScrollArea>
      <ActionBar>
        <Button variant="outline" className="flex-1" onClick={() => nav.back()}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={() => nav.back()}>
          <Camera className="mr-1 h-4 w-4" /> Submit SAR
        </Button>
      </ActionBar>
    </div>
  )
}

function PlaceholderMissing() {
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader title="Not found" />
      <ScrollArea>
        <EmptyState title="Ticket not found" />
      </ScrollArea>
    </div>
  )
}
