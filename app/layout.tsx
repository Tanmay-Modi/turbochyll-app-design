import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Turbochyll — Field Service & Office Operations",
  description:
    "Turbochyll mobile app for HVAC service tickets, MAR folders, purchase orders, cooling tower inspections, scheduling, and office operations.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#3d63b8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
