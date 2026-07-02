"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, Input, CheckRow } from "@/components/app/widgets"
import { useNav } from "@/lib/navigation"

function Brand({ tagline }: { tagline?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-card shadow-sm ring-1 ring-border">
        <Image src="/turbochyll-logo.png" alt="Turbochyll" width={56} height={56} className="h-14 w-14 object-contain" />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Turbo<span className="text-primary">Chyll</span>
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">{tagline ?? "Field Service & Office Operations"}</p>
      </div>
    </div>
  )
}

export function LoginScreen() {
  const nav = useNav()
  const [remember, setRemember] = useState(true)
  return (
    <div className="flex flex-1 flex-col justify-center overflow-y-auto px-6 py-8">
      <Brand />
      <div className="mt-10 space-y-4">
        <Field label="Email">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input defaultValue="ricky@turbochyll.com" className="pl-9" inputMode="email" />
          </div>
        </Field>
        <Field label="Password">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input defaultValue="••••••••" type="password" className="pl-9" />
          </div>
        </Field>
        <div className="flex items-center justify-between">
          <div className="w-auto">
            <CheckRow checked={remember} onChange={setRemember} label="Remember me" />
          </div>
          <button onClick={() => nav.push("forgot")} className="text-[13px] font-medium text-primary">
            Forgot password?
          </button>
        </div>
        <Button className="w-full" size="lg" onClick={() => nav.push("otp")}>
          Sign in <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <p className="mt-8 text-center text-[11px] text-muted-foreground">
        Secured by TurboChyll ERP · v1.40
      </p>
    </div>
  )
}

export function OtpScreen() {
  const nav = useNav()
  const [digits, setDigits] = useState(["", "", "", "", "", ""])
  const filled = digits.filter(Boolean).length
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-8">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10">
        <ShieldCheck className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-center text-xl font-bold text-foreground">Verify it&apos;s you</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Enter the 6-digit code sent to <span className="font-medium text-foreground">ricky@turbochyll.com</span>
      </p>
      <div className="mt-8 flex justify-center gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            value={d}
            inputMode="numeric"
            maxLength={1}
            onChange={(e) => {
              const next = [...digits]
              next[i] = e.target.value.replace(/\D/g, "").slice(-1)
              setDigits(next)
            }}
            className="h-14 w-11 rounded-xl border border-input bg-card text-center text-xl font-semibold outline-none focus:ring-2 focus:ring-ring"
          />
        ))}
      </div>
      <button className="mt-5 text-center text-[13px] font-medium text-primary">Resend code</button>
      <Button
        className="mt-8 w-full"
        size="lg"
        onClick={() => {
          nav.reset("roles")
        }}
      >
        Verify {filled === 6 ? "" : ""} <ArrowRight className="h-4 w-4" />
      </Button>
      <button onClick={() => nav.back()} className="mt-4 text-center text-[13px] text-muted-foreground">
        Use a different account
      </button>
    </div>
  )
}

export function ForgotScreen() {
  const nav = useNav()
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-8">
      <Brand tagline="Reset your password" />
      <div className="mt-10 space-y-4">
        <Field label="Account email" hint="We&apos;ll send a reset link to this address.">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="you@turbochyll.com" className="pl-9" inputMode="email" />
          </div>
        </Field>
        <Button className="w-full" size="lg" onClick={() => nav.push("reset")}>
          Send reset link
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => nav.back()}>
          Back to sign in
        </Button>
      </div>
    </div>
  )
}

export function ResetScreen() {
  const nav = useNav()
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-8">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50">
        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
      </div>
      <h1 className="text-center text-xl font-bold text-foreground">Set a new password</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">Create a strong password for your account.</p>
      <div className="mt-8 space-y-4">
        <Field label="New password">
          <Input type="password" defaultValue="••••••••••" />
        </Field>
        <Field label="Confirm password">
          <Input type="password" defaultValue="••••••••••" />
        </Field>
        <Button className="w-full" size="lg" onClick={() => nav.reset("login")}>
          Update password
        </Button>
      </div>
    </div>
  )
}
