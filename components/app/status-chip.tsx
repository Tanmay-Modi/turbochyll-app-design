import { cn } from "@/lib/utils"

type Tone = "blue" | "green" | "amber" | "red" | "slate" | "violet" | "teal" | "orange"

const TONE_CLASSES: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  violet: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  teal: "bg-teal-50 text-teal-700 ring-teal-200",
  orange: "bg-orange-50 text-orange-700 ring-orange-200",
}

const STATUS_TONE: Record<string, Tone> = {
  // Folder / workflow states
  Pending: "amber",
  Active: "blue",
  "Approved/Noted": "teal",
  Approved: "green",
  Noted: "teal",
  Filed: "slate",
  Open: "blue",
  Processing: "violet",
  Completed: "green",
  "To Be Billed": "orange",
  QuickBooks: "teal",
  Paid: "green",
  Warranty: "violet",
  Urgent: "red",
  New: "blue",
  Inprogress: "amber",
  "In Progress": "amber",
  Waiting: "amber",
  Voided: "slate",
  Terminated: "slate",
  Office: "blue",
  Refrigerant: "teal",
  "File Room": "slate",
}

export function StatusChip({
  status,
  tone,
  className,
  size = "default",
}: {
  status: string
  tone?: Tone
  className?: string
  size?: "default" | "sm"
}) {
  const resolved = tone ?? STATUS_TONE[status] ?? "slate"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium ring-1 ring-inset",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-[11px]",
        TONE_CLASSES[resolved],
        className,
      )}
    >
      {status}
    </span>
  )
}

export function LaborBadge({ level }: { level: number }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-primary/10 px-1 text-[11px] font-semibold text-primary">
      L{level}
    </span>
  )
}
