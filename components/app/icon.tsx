import {
  ClipboardList,
  FileCheck,
  TrendingUp,
  ListTodo,
  BookOpen,
  DollarSign,
  Hammer,
  FolderOpen,
  Receipt,
  CalendarDays,
  Fan,
  GraduationCap,
  ScrollText,
  Database,
  ShieldCheck,
  Sparkles,
  LifeBuoy,
  FolderArchive,
  FolderClock,
  type LucideIcon,
} from "lucide-react"
import { normalizeIcon } from "@/lib/modules"

const MAP: Record<string, LucideIcon> = {
  ClipboardList,
  FileCheck,
  TrendingUp,
  ListTodo,
  BookOpen,
  DollarSign,
  Hammer,
  FolderOpen,
  Receipt,
  CalendarDays,
  Fan,
  GraduationCap,
  ScrollText,
  Database,
  ShieldCheck,
  Sparkles,
  LifeBuoy,
  FolderArchive,
  FolderClock,
}

export function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[normalizeIcon(name)] ?? FolderOpen
  return <Icon className={className} />
}
