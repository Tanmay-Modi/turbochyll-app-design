"use client"

import type { ComponentType } from "react"
import { PlaceholderScreen } from "@/components/screens/misc"
import { SarScreen, SarDetailScreen, SarNewScreen } from "@/components/screens/sar"
import { AsrScreen, AsrDetailScreen, AsrNewScreen } from "@/components/screens/asr"
import { MarScreen, MarFolderScreen, MarLineScreen, MarNewScreen } from "@/components/screens/mar"
import { POListScreen, PODetailScreen } from "@/components/screens/po"
import { OpportunitiesScreen } from "@/components/screens/opportunities"
import { OfficeTTDScreen } from "@/components/screens/office-ttd"
import { QuoteBookScreen } from "@/components/screens/quotebook"
import { WorkOnHandScreen } from "@/components/screens/workonhand"
import { ScheduleScreen } from "@/components/screens/schedule"

export type ScreenProps = { params: Record<string, any> }

// Screens are registered here as modules are built out.
// Unregistered keys fall back to a labeled placeholder.
export const SCREEN_REGISTRY: Record<string, ComponentType<ScreenProps>> = {
  sar: SarScreen as any,
  "sar-detail": SarDetailScreen as any,
  "sar-new": SarNewScreen as any,
  asr: AsrScreen as any,
  "asr-detail": AsrDetailScreen as any,
  "asr-new": AsrNewScreen as any,
  mar: MarScreen as any,
  "mar-folder": MarFolderScreen as any,
  "mar-line": MarLineScreen as any,
  "mar-new": MarNewScreen as any,
  po: POListScreen as any,
  poDetail: PODetailScreen as any,
  opportunities: OpportunitiesScreen as any,
  officeTtd: OfficeTTDScreen as any,
  quotebook: QuoteBookScreen as any,
  workonhand: WorkOnHandScreen as any,
  schedule: ScheduleScreen as any,
}
