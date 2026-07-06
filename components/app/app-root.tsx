"use client"

import { NavProvider, useNav } from "@/lib/navigation"
import { PhoneFrame } from "@/components/app/phone-frame"
import { BottomNav } from "@/components/app/bottom-nav"
import { LoginScreen, OtpScreen, ForgotScreen, ResetScreen } from "@/components/screens/auth"
import { RolesScreen } from "@/components/screens/roles"
import { DashboardScreen, ModulesScreen } from "@/components/screens/dashboard"
import { ProfileScreen, AlertsScreen, PlaceholderScreen } from "@/components/screens/misc"
import { POListScreen, PODetailScreen } from "@/components/screens/po"
import { SCREEN_REGISTRY } from "@/components/screens/registry"

const AUTH_SCREENS = new Set(["login", "otp", "forgot", "reset", "roles"])
const TAB_SCREENS = new Set(["dashboard", "modules", "schedule", "alerts", "profile"])

function Router() {
  const nav = useNav()
  const { screen, params } = nav.current

  const render = () => {
    switch (screen) {
      case "login":
        return <LoginScreen />
      case "otp":
        return <OtpScreen />
      case "forgot":
        return <ForgotScreen />
      case "reset":
        return <ResetScreen />
      case "roles":
        return <RolesScreen />
      case "dashboard":
        return <DashboardScreen />
      case "modules":
        return <ModulesScreen />
      case "po":
        return <POListScreen />
      case "poDetail":
        return <PODetailScreen params={params ?? {}} />
      case "opportunities":
        return <div className="w-full h-full overflow-auto"><SCREEN_REGISTRY.opportunities params={params ?? {}} /></div>
      case "officeTtd":
        return <div className="w-full h-full overflow-auto"><SCREEN_REGISTRY.officeTtd params={params ?? {}} /></div>
      case "quotebook":
        return <div className="w-full h-full overflow-auto"><SCREEN_REGISTRY.quotebook params={params ?? {}} /></div>
      case "profile":
        return <ProfileScreen />
      case "alerts":
        return <AlertsScreen />
      default: {
        const Comp = SCREEN_REGISTRY[screen]
        if (Comp) return <Comp params={params ?? {}} />
        return <PlaceholderScreen title={screen} />
      }
    }
  }

  const showNav = !AUTH_SCREENS.has(screen) && TAB_SCREENS.has(screen)

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex flex-1 flex-col overflow-hidden">{render()}</div>
      {showNav ? <BottomNav /> : null}
    </div>
  )
}

export function AppRoot() {
  return (
    <NavProvider>
      <PhoneFrame>
        <Router />
      </PhoneFrame>
    </NavProvider>
  )
}
