"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Role } from "./types"

export type ScreenEntry = {
  screen: string
  params?: Record<string, any>
  title?: string
}

type NavState = {
  role: Role | null
  stack: ScreenEntry[]
  tab: string
}

type NavContextType = {
  role: Role | null
  current: ScreenEntry
  stack: ScreenEntry[]
  tab: string
  canGoBack: boolean
  setRole: (role: Role | null) => void
  push: (screen: string, params?: Record<string, any>, title?: string) => void
  replace: (screen: string, params?: Record<string, any>, title?: string) => void
  back: () => void
  setTab: (tab: string, screen: string) => void
  reset: (screen: string) => void
  logout: () => void
}

const NavContext = createContext<NavContextType | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavState>({
    role: null,
    stack: [{ screen: "login" }],
    tab: "home",
  })

  const push = useCallback((screen: string, params?: Record<string, any>, title?: string) => {
    setState((s) => ({ ...s, stack: [...s.stack, { screen, params, title }] }))
  }, [])

  const replace = useCallback((screen: string, params?: Record<string, any>, title?: string) => {
    setState((s) => ({ ...s, stack: [...s.stack.slice(0, -1), { screen, params, title }] }))
  }, [])

  const back = useCallback(() => {
    setState((s) => (s.stack.length > 1 ? { ...s, stack: s.stack.slice(0, -1) } : s))
  }, [])

  const setRole = useCallback((role: Role | null) => {
    setState((s) => ({ ...s, role }))
  }, [])

  const setTab = useCallback((tab: string, screen: string) => {
    setState((s) => ({ ...s, tab, stack: [{ screen }] }))
  }, [])

  const reset = useCallback((screen: string) => {
    setState((s) => ({ ...s, stack: [{ screen }] }))
  }, [])

  const logout = useCallback(() => {
    setState({ role: null, stack: [{ screen: "login" }], tab: "home" })
  }, [])

  const current = state.stack[state.stack.length - 1]

  return (
    <NavContext.Provider
      value={{
        role: state.role,
        current,
        stack: state.stack,
        tab: state.tab,
        canGoBack: state.stack.length > 1,
        setRole,
        push,
        replace,
        back,
        setTab,
        reset,
        logout,
      }}
    >
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error("useNav must be used within NavProvider")
  return ctx
}
