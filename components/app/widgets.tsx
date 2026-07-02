"use client"

import { useState, type ReactNode } from "react"
import { FileText, FileSpreadsheet, ImageIcon, File, X, Plus, Search, Download, PenLine } from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- Segmented control ---------------- */
export function Segmented({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
  className?: string
}) {
  return (
    <div className={cn("no-scrollbar flex gap-1 overflow-x-auto rounded-xl bg-muted p-1", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
            value === o.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/* ---------------- Field / inputs ---------------- */
export function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: ReactNode
  hint?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-muted-foreground">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring",
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring",
        className,
      )}
      {...props}
    />
  )
}

export function SearchBar({
  placeholder = "Search",
  value,
  onChange,
}: {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
      />
    </div>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3"
    >
      {label ? <span className="text-sm text-foreground">{label}</span> : null}
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-muted-foreground/30",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </span>
    </button>
  )
}

export function CheckRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-3 py-1 text-left"
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
          checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card",
        )}
      >
        {checked ? <span className="text-[11px] leading-none">✓</span> : null}
      </span>
      <span className="text-sm text-foreground">{label}</span>
    </button>
  )
}

/* ---------------- Detail row (read display) ---------------- */
export function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-[12px] text-muted-foreground">{label}</span>
      <span className="max-w-[60%] text-right text-[13px] font-medium text-foreground">{value}</span>
    </div>
  )
}

/* ---------------- File chips ---------------- */
type FileKind = "pdf" | "doc" | "xls" | "img" | "txt"
const FILE_META: Record<FileKind, { icon: typeof FileText; tone: string }> = {
  pdf: { icon: FileText, tone: "text-red-600 bg-red-50" },
  doc: { icon: FileText, tone: "text-blue-600 bg-blue-50" },
  xls: { icon: FileSpreadsheet, tone: "text-emerald-600 bg-emerald-50" },
  img: { icon: ImageIcon, tone: "text-indigo-600 bg-indigo-50" },
  txt: { icon: File, tone: "text-slate-600 bg-slate-100" },
}

export function FileChip({
  name,
  kind,
  onRemove,
}: {
  name: string
  kind: FileKind
  onRemove?: () => void
}) {
  const meta = FILE_META[kind]
  const Icon = meta.icon
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card py-1.5 pl-2 pr-2.5 text-xs">
      <span className={cn("flex h-6 w-6 items-center justify-center rounded-md", meta.tone)}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="max-w-[140px] truncate font-medium text-foreground">{name}</span>
      {onRemove ? (
        <button onClick={onRemove} className="text-muted-foreground hover:text-destructive" aria-label="Remove file">
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  )
}

export function UploadTile({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-20 w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted/40 text-muted-foreground hover:bg-muted"
    >
      <Plus className="h-5 w-5" />
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  )
}

/* ---------------- Photo grid ---------------- */
export function PhotoGrid({
  photos,
  onAdd,
  min,
}: {
  photos: { id: string; src: string; label?: string }[]
  onAdd?: () => void
  min?: number
}) {
  const [viewer, setViewer] = useState<string | null>(null)
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((p) => (
          <button
            key={p.id}
            onClick={() => setViewer(p.src)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src || "/placeholder.svg"} alt={p.label ?? "Photo"} className="h-full w-full object-cover" />
            {p.label ? (
              <span className="absolute inset-x-0 bottom-0 bg-black/45 px-1.5 py-0.5 text-left text-[10px] font-medium text-white">
                {p.label}
              </span>
            ) : null}
          </button>
        ))}
        {onAdd ? <UploadTile label="Add photo" onClick={onAdd} /> : null}
      </div>
      {min && photos.length < min ? (
        <p className="mt-2 text-[11px] font-medium text-amber-600">
          Requires at least {min} photos ({photos.length}/{min} added).
        </p>
      ) : null}
      {viewer ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setViewer(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={viewer || "/placeholder.svg"} alt="Full view" className="max-h-full max-w-full rounded-xl" />
          <button
            className="absolute right-4 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </>
  )
}

/* ---------------- Signature canvas placeholder ---------------- */
export function SignaturePad({ label, signed }: { label: string; signed?: boolean }) {
  const [done, setDone] = useState(!!signed)
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[12px] font-medium text-muted-foreground">{label}</span>
        {done ? (
          <button onClick={() => setDone(false)} className="text-[11px] font-medium text-primary">
            Clear
          </button>
        ) : null}
      </div>
      <button
        onClick={() => setDone(true)}
        className={cn(
          "flex h-24 w-full items-center justify-center rounded-xl border border-dashed border-input",
          done ? "bg-primary/5" : "bg-muted/40",
        )}
      >
        {done ? (
          <span className="font-serif text-2xl italic text-primary/80" style={{ fontFamily: "cursive" }}>
            Signed
          </span>
        ) : (
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <PenLine className="h-4 w-4" /> Tap to sign
          </span>
        )}
      </button>
    </div>
  )
}

/* ---------------- Bottom sheet ---------------- */
export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-h-[80%] overflow-y-auto rounded-t-3xl bg-card p-4 pb-6 shadow-2xl">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-muted-foreground/25" />
        {title ? <h3 className="mb-3 text-center text-sm font-semibold text-foreground">{title}</h3> : null}
        {children}
      </div>
    </div>
  )
}

export function IconAction({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
    >
      {icon}
      {label}
    </button>
  )
}

export function DownloadCsvButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconAction icon={<Download className="h-3.5 w-3.5" />} label="CSV" onClick={onClick} />
  )
}
