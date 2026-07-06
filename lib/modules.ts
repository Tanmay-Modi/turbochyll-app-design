import type { Role } from "./types"

export type Module = {
  key: string // screen key
  label: string
  icon: string // lucide icon name
  desc?: string
}

// Modules per role, mapped to screen keys used by the router
export const MODULES: Record<Role, Module[]> = {
  office: [
    { key: "sar", label: "SAR", icon: "ClipboardList", desc: "Service Activity Reports" },
    { key: "asr", label: "ASR", icon: "FileСheckShim", desc: "Additional Service Recs" },
    { key: "opportunities", label: "Opportunities", icon: "TrendingUp", desc: "Sales pipeline" },
    { key: "officeTtd", label: "Office TTD", icon: "ListTodo", desc: "Things to do" },
    { key: "quotebook", label: "Quote Book", icon: "BookOpen", desc: "Quotes & analytics" },
    { key: "tmnow", label: "T&M Now", icon: "DollarSign", desc: "T&M profitability" },
    { key: "workonhand", label: "Work On Hand", icon: "Hammer", desc: "Active jobs" },
    { key: "mar", label: "MAR System", icon: "FolderOpen", desc: "Maintenance folders" },
    { key: "po", label: "P.O. System", icon: "Receipt", desc: "Purchase orders" },
    { key: "schedule", label: "Schedule", icon: "CalendarDays", desc: "Planner" },
    { key: "ctic", label: "Cooling Tower", icon: "Fan", desc: "Inspection checklist" },
    { key: "training", label: "Training", icon: "GraduationCap", desc: "Course manager" },
    { key: "activity", label: "Activity Logs", icon: "ScrollText", desc: "Audit trail" },
    { key: "editdb", label: "Edit DB", icon: "Database", desc: "Jobs / Techs / Customers" },
    { key: "warranty", label: "Warranty", icon: "ShieldCheck", desc: "Warranty tracking" },
    { key: "erp", label: "ERP Enhancements", icon: "Sparkles", desc: "Requests & ideas" },
  ],
  tech: [
    { key: "sar", label: "SAR", icon: "ClipboardList", desc: "Service Activity Reports" },
    { key: "asr", label: "ASR", icon: "FileCheck", desc: "Additional Service Recs" },
    { key: "mar", label: "MAR System", icon: "FolderOpen", desc: "Maintenance folders" },
    { key: "po", label: "P.O. System", icon: "Receipt", desc: "Purchase orders" },
    { key: "schedule", label: "Schedule", icon: "CalendarDays", desc: "My schedule" },
    { key: "ctic", label: "Cooling Tower", icon: "Fan", desc: "Inspection checklist" },
    { key: "training", label: "Training", icon: "GraduationCap", desc: "Course manager" },
    { key: "techresources", label: "Tech Resources", icon: "LifeBuoy", desc: "Handbook & vendors" },
  ],
  customer: [
    { key: "mar", label: "MAR System", icon: "FolderOpen", desc: "Your maintenance folders" },
    { key: "filedbyjob", label: "Filed Folders by Job", icon: "FolderArchive", desc: "Archived reports" },
  ],
  subcontractor: [
    { key: "mar", label: "MAR System", icon: "FolderOpen", desc: "Assigned folders" },
    { key: "activefolders", label: "Active Folders", icon: "FolderClock", desc: "In progress" },
  ],
}

// Fix icon typo safely at import site by normalizing
export function normalizeIcon(name: string): string {
  if (name === "FileСheckShim") return "FileCheck"
  return name
}
