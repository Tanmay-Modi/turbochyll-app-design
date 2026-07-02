export type Role = "office" | "tech" | "customer" | "subcontractor"

export type RoleMeta = {
  id: Role
  label: string
  short: string
  description: string
}

export const ROLES: Record<Role, RoleMeta> = {
  office: {
    id: "office",
    label: "Office Admin",
    short: "Office",
    description: "Full operations access — SAR, ASR, PO, scheduling, and records.",
  },
  tech: {
    id: "tech",
    label: "Tech Admin",
    short: "Tech",
    description: "Field service — tickets, MAR, POs, schedule, and resources.",
  },
  customer: {
    id: "customer",
    label: "Customer",
    short: "Customer",
    description: "View MAR folders and filed folders by job.",
  },
  subcontractor: {
    id: "subcontractor",
    label: "Subcontractor",
    short: "Sub",
    description: "MAR system and active folders.",
  },
}

export type ModuleDef = {
  key: string
  label: string
  icon: string
  group?: string
}
