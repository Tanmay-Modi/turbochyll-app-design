"use client"

import { useState } from "react"
import { Search, Calendar, Plus, ChevronRight, Filter, Download } from "lucide-react"
import { useNav } from "@/lib/navigation"
import { Card, SectionLabel, ScrollArea } from "@/components/app/shell"
import { StatusChip } from "@/components/app/status-chip"

interface PO {
  id: string
  vendor: string
  poNumber: string
  jobName: string
  poDate: string
  amount: string
  status: "new" | "payable" | "work" | "credit" | "paid" | "terminated"
  netSalesTax: string
  invoice: boolean
  quote?: string
}

const PO_DATA: PO[] = [
  {
    id: "1",
    vendor: "Argo General Machine Works",
    poNumber: "12129",
    jobName: "Theater for New Audience - 262 Ashland Place",
    poDate: "07/02/2026",
    amount: "$3,500.00",
    netSalesTax: "$0.00",
    status: "payable",
    invoice: true,
    quote: "13303",
  },
  {
    id: "2",
    vendor: "Beardsley Transmission Equipment",
    poNumber: "12096",
    jobName: "DVM Industries - Dykman Clinic",
    poDate: "06/26/2026",
    amount: "$0.00",
    netSalesTax: "$0.00",
    status: "new",
    invoice: false,
    quote: "13388",
  },
  {
    id: "3",
    vendor: "Credit Card Purchase",
    poNumber: "12134",
    jobName: "NY Methodist",
    poDate: "07/04/2026",
    amount: "$0.00",
    netSalesTax: "$0.00",
    status: "new",
    invoice: false,
  },
  {
    id: "4",
    vendor: "Ferguson Enterprises, Inc.",
    poNumber: "12109",
    jobName: "NHS US, LLC - 105 Orville Dr",
    poDate: "06/29/2026",
    amount: "$663.07",
    netSalesTax: "$53.35",
    status: "payable",
    invoice: false,
  },
  {
    id: "5",
    vendor: "H&L Heating Supply Inc.",
    poNumber: "11849",
    jobName: "Caccamo",
    poDate: "05/07/2026",
    amount: "$2,187.61",
    netSalesTax: "$178.32",
    status: "paid",
    invoice: false,
  },
  {
    id: "6",
    vendor: "Johnstone Supply BF",
    poNumber: "12117",
    jobName: "NHS US, LLC - 90 Orville Dr",
    poDate: "06/30/2026",
    amount: "$401.50",
    netSalesTax: "$32.30",
    status: "work",
    invoice: false,
  },
]

const STATUS_CONFIG = {
  new: { label: "New P.O.", bgColor: "bg-white", textColor: "text-foreground", borderColor: "border-gray-300" },
  payable: { label: "Payables", bgColor: "bg-yellow-50", textColor: "text-foreground", borderColor: "border-yellow-200" },
  work: { label: "Work in Progress", bgColor: "bg-blue-50", textColor: "text-foreground", borderColor: "border-blue-200" },
  credit: { label: "Credit Memo", bgColor: "bg-purple-50", textColor: "text-foreground", borderColor: "border-purple-200" },
  paid: { label: "Paid Receipts", bgColor: "bg-green-50", textColor: "text-foreground", borderColor: "border-green-200" },
  terminated: { label: "Terminated", bgColor: "bg-gray-50", textColor: "text-foreground", borderColor: "border-gray-300" },
}

function POTable({ pos, isLoading }: { pos: PO[]; isLoading?: boolean }) {
  const nav = useNav()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-muted-foreground">Loading purchase orders...</p>
      </div>
    )
  }

  if (pos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
        <p className="text-sm font-medium text-foreground">No purchase orders found</p>
        <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead className="sticky top-0 bg-card">
          <tr className="border-b border-border">
            <th className="border-r border-border bg-muted px-2 py-2 text-left font-semibold text-foreground">
              <input type="checkbox" className="h-4 w-4 rounded" />
            </th>
            <th className="border-r border-border bg-muted px-3 py-2 text-left font-semibold text-foreground">Vendor</th>
            <th className="border-r border-border bg-muted px-3 py-2 text-left font-semibold text-foreground">PO #</th>
            <th className="border-r border-border bg-muted px-3 py-2 text-left font-semibold text-foreground">Job Name</th>
            <th className="border-r border-border bg-muted px-3 py-2 text-left font-semibold text-foreground">Date</th>
            <th className="border-r border-border bg-muted px-3 py-2 text-right font-semibold text-foreground">Amount</th>
            <th className="border-r border-border bg-muted px-3 py-2 text-right font-semibold text-foreground">Tax</th>
            <th className="border-r border-border bg-muted px-3 py-2 text-center font-semibold text-foreground">Invoice</th>
            <th className="bg-muted px-3 py-2 text-right font-semibold text-foreground">Quote #</th>
          </tr>
        </thead>
        <tbody>
          {pos.map((po, idx) => {
            const config = STATUS_CONFIG[po.status]
            return (
              <tr
                key={po.id}
                className={`border-b border-border ${config.bgColor} cursor-pointer transition-colors active:opacity-75`}
                onClick={() => nav.push("poDetail", { id: po.id })}
              >
                <td className="border-r border-border px-2 py-2">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </td>
                <td className="border-r border-border px-3 py-2 font-medium text-foreground">{po.vendor}</td>
                <td className="border-r border-border px-3 py-2 text-primary font-medium">
                  <a href="#" className="underline">
                    {po.poNumber}
                  </a>
                </td>
                <td className="border-r border-border px-3 py-2 text-foreground">{po.jobName}</td>
                <td className="border-r border-border px-3 py-2 text-muted-foreground">{po.poDate}</td>
                <td className="border-r border-border px-3 py-2 text-right font-medium text-foreground">{po.amount}</td>
                <td className="border-r border-border px-3 py-2 text-right text-muted-foreground">{po.netSalesTax}</td>
                <td className="border-r border-border px-3 py-2 text-center">
                  {po.invoice ? <span className="text-xs font-medium">✓</span> : <span className="text-xs text-muted-foreground">—</span>}
                </td>
                <td className="px-3 py-2 text-right text-muted-foreground">{po.quote || "—"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function StatusTabs({ selectedStatus, onStatusChange }: { selectedStatus: string; onStatusChange: (status: string) => void }) {
  const statuses = ["all", "new", "payable", "work", "credit", "paid", "terminated"]

  return (
    <div className="flex gap-2 overflow-x-auto border-b border-border pb-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`whitespace-nowrap rounded border px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedStatus === status
              ? "border-foreground bg-foreground text-card"
              : "border-border bg-card text-foreground hover:border-foreground"
          }`}
        >
          {status === "all" ? "All" : STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.label || status}
        </button>
      ))}
    </div>
  )
}

export function POListScreen() {
  const nav = useNav()
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const filteredPOs = PO_DATA.filter((po) => {
    const matchStatus = selectedStatus === "all" || po.status === selectedStatus
    const matchSearch = searchQuery === "" || po.vendor.toLowerCase().includes(searchQuery.toLowerCase()) || po.poNumber.includes(searchQuery)
    return matchStatus && matchSearch
  })

  return (
    <div className="flex min-h-full flex-col gap-0">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
        <h1 className="text-[15px] font-semibold text-foreground">Purchase Orders</h1>
        <p className="text-xs text-muted-foreground">Manage and track all purchase orders</p>
      </header>

      <ScrollArea>
        {/* Action Bar */}
        <div className="border-b border-border bg-card px-4 py-3 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vendor or PO #"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border border-input bg-yellow-50 pl-8 pr-3 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="rounded border border-input bg-yellow-50 px-2 py-1.5 hover:bg-yellow-100">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex gap-2 text-[11px]">
            <input
              type="text"
              placeholder="From (mm/dd/yyyy)"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="flex-1 rounded border border-input bg-yellow-50 px-2 py-1.5 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="flex items-center text-muted-foreground">to</span>
            <input
              type="text"
              placeholder="To (mm/dd/yyyy)"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="flex-1 rounded border border-input bg-yellow-50 px-2 py-1.5 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="rounded border border-input bg-yellow-50 px-2 py-1.5 hover:bg-yellow-100">
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="border-b border-border bg-card px-4 py-2">
          <StatusTabs selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
        </div>

        {/* Legend */}
        <div className="border-b border-border bg-card px-4 py-2 text-[10px] text-muted-foreground">
          <p>Status Legend: Yellow - In Process · Green - Ready to pay · White - No Invoice</p>
        </div>

        {/* Table */}
        <div className="flex-1 bg-card">
          <POTable pos={filteredPOs} />
        </div>

        {/* Summary Footer */}
        <div className="border-t border-border bg-muted px-4 py-2 text-[11px] text-foreground">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <span className="text-muted-foreground">Total: </span>
              <span className="font-medium">${filteredPOs.reduce((sum, po) => sum + parseFloat(po.amount.replace(/[$,]/g, "")), 0).toFixed(2)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Tax: </span>
              <span className="font-medium">${filteredPOs.reduce((sum, po) => sum + parseFloat(po.netSalesTax.replace(/[$,]/g, "")), 0).toFixed(2)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Count: </span>
              <span className="font-medium">{filteredPOs.length}</span>
            </div>
            <div className="text-right">
              <button onClick={() => nav.push("poDetail", { id: "new" })} className="font-medium text-primary hover:underline">
                + New PO
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export function PODetailScreen({ params }: { params: { id: string } }) {
  const nav = useNav()
  const isNew = params?.id === "new"
  const po = isNew ? null : PO_DATA.find((p) => p.id === params?.id)

  const [formData, setFormData] = useState({
    poDate: po?.poDate || "",
    vendor: po?.vendor || "",
    address: "",
    city: "",
    state: "NY",
    zip: "",
    jobName: po?.jobName || "",
    billingEmail: "",
    phone: "",
    county: "",
    createdBy: "Richard Mortimore",
    poType: "quote" as "quote" | "tm" | "maintenance" | "stock" | "tooling" | "other",
    deliveryType: "delivery" as "pickup" | "delivery",
    billingLocation: "",
    notes: "",
  })

  const [lineItems, setLineItems] = useState<Array<{ qty: string; description: string; partNumber: string; unitCost: string; unitTotal: string }>>([
    { qty: "1", description: "Pump Repairs - Invoice #2474", partNumber: "", unitCost: "3500", unitTotal: "3500.00" },
  ])

  const subtotal = lineItems.reduce((sum, item) => sum + parseFloat(item.unitTotal || "0"), 0)
  const freight = 0
  const tax = 0
  const total = subtotal + freight + tax

  return (
    <div className="flex min-h-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-card/95 px-4 py-3 backdrop-blur flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-semibold text-foreground">Purchase Order{!isNew && ` #${po?.poNumber}`}</h1>
          {!isNew && <p className="text-xs text-muted-foreground">{po?.vendor}</p>}
        </div>
        <button onClick={() => nav.back()} className="rounded px-3 py-1.5 text-xs font-medium text-primary">
          Close
        </button>
      </header>

      <ScrollArea>
        <div className="space-y-4 p-4">
          {/* PO Header Section */}
          <div className="rounded border border-border bg-card p-4">
            <h3 className="mb-3 font-semibold text-foreground text-sm">PO Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-muted-foreground">PO Date</label>
                <input
                  type="text"
                  value={formData.poDate}
                  onChange={(e) => setFormData({ ...formData, poDate: e.target.value })}
                  placeholder="mm/dd/yyyy"
                  className="w-full rounded border border-input bg-yellow-50 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-muted-foreground">Vendor</label>
                <select className="w-full rounded border border-input bg-yellow-50 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Argo General Machine Works</option>
                  <option>Beardsley Transmission</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-[11px] font-medium text-muted-foreground">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded border border-input bg-yellow-50 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-muted-foreground">City/State/Zip</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="flex-1 rounded border border-input bg-yellow-50 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-12 rounded border border-input bg-yellow-50 px-1 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>NY</option>
                  </select>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    placeholder="Zip"
                    className="w-20 rounded border border-input bg-yellow-50 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-[11px] font-medium text-muted-foreground">Job Name</label>
                <input
                  type="text"
                  value={formData.jobName}
                  onChange={(e) => setFormData({ ...formData, jobName: e.target.value })}
                  className="w-full rounded border border-input bg-yellow-50 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-muted-foreground">Billing Email</label>
                <input
                  type="text"
                  value={formData.billingEmail}
                  onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })}
                  className="w-full rounded border border-input bg-yellow-50 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-muted-foreground">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(XXX) XXX-XXXX"
                  className="w-full rounded border border-input bg-yellow-50 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* PO Type Section */}
          <div className="rounded border border-border bg-card p-4">
            <h3 className="mb-3 font-semibold text-foreground text-sm">PO Type & Options</h3>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                  <span>Quote #</span>
                  <input type="text" placeholder="13303" className="w-16 rounded border border-input bg-yellow-50 px-1 py-0.5 text-xs" />
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>T&M</span>
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>Maintenance</span>
                </label>
              </div>
              <div className="flex gap-2">
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                  <span>Delivery</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="text-[11px] font-medium text-muted-foreground">Billing Location</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={formData.billingLocation}
                    onChange={(e) => setFormData({ ...formData, billingLocation: e.target.value })}
                    className="w-full rounded border border-red-300 bg-red-100 px-2 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 text-xs">*</span>
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded border border-border bg-card p-4">
            <h3 className="mb-3 font-semibold text-foreground text-sm">Line Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="border-r border-border px-2 py-1.5 text-left font-medium text-foreground">Qty</th>
                    <th className="border-r border-border px-2 py-1.5 text-left font-medium text-foreground">Description</th>
                    <th className="border-r border-border px-2 py-1.5 text-left font-medium text-foreground">Part #</th>
                    <th className="border-r border-border px-2 py-1.5 text-right font-medium text-foreground">Unit Cost</th>
                    <th className="px-2 py-1.5 text-right font-medium text-foreground">Unit Total</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, idx) => (
                    <tr key={idx} className="border-b border-border bg-yellow-50">
                      <td className="border-r border-border px-2 py-1.5">
                        <input type="text" value={item.qty} className="w-full border border-input bg-yellow-50 px-1 py-0.5 text-xs" />
                      </td>
                      <td className="border-r border-border px-2 py-1.5">
                        <input type="text" value={item.description} className="w-full border border-input bg-yellow-50 px-1 py-0.5 text-xs" />
                      </td>
                      <td className="border-r border-border px-2 py-1.5">
                        <input type="text" value={item.partNumber} className="w-full border border-input bg-yellow-50 px-1 py-0.5 text-xs" />
                      </td>
                      <td className="border-r border-border px-2 py-1.5 text-right">
                        <input type="text" value={item.unitCost} className="w-full border border-input bg-yellow-50 px-1 py-0.5 text-xs text-right" />
                      </td>
                      <td className="px-2 py-1.5 text-right font-medium">${item.unitTotal}</td>
                    </tr>
                  ))}
                  {/* Empty rows */}
                  {[...Array(10 - lineItems.length)].map((_, idx) => (
                    <tr key={`empty-${idx}`} className="border-b border-border bg-yellow-50">
                      <td className="border-r border-border px-2 py-1.5">
                        <input type="text" className="w-full border border-input bg-yellow-50 px-1 py-0.5 text-xs" />
                      </td>
                      <td className="border-r border-border px-2 py-1.5">
                        <input type="text" className="w-full border border-input bg-yellow-50 px-1 py-0.5 text-xs" />
                      </td>
                      <td className="border-r border-border px-2 py-1.5">
                        <input type="text" className="w-full border border-input bg-yellow-50 px-1 py-0.5 text-xs" />
                      </td>
                      <td className="border-r border-border px-2 py-1.5 text-right">
                        <input type="text" className="w-full border border-input bg-yellow-50 px-1 py-0.5 text-xs text-right" />
                      </td>
                      <td className="px-2 py-1.5 text-right">$0.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="rounded border border-border bg-card p-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-end gap-4">
                <span className="font-medium text-muted-foreground">Subtotal:</span>
                <span className="w-20 text-right font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-4">
                <span className="font-medium text-muted-foreground">Freight:</span>
                <span className="w-20 text-right font-medium">${freight.toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-4 border-t border-border pt-2">
                <span className="font-medium text-muted-foreground">Tax (0.000%):</span>
                <span className="w-20 text-right font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-4 border-t border-border pt-2">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="w-20 text-right font-semibold text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pb-4">
            <button className="flex-1 rounded border border-border bg-primary text-card px-4 py-2.5 text-xs font-medium hover:bg-primary/90 active:bg-primary/80">
              Update
            </button>
            <button className="flex-1 rounded border border-border bg-card text-foreground px-4 py-2.5 text-xs font-medium hover:bg-muted active:bg-muted">
              Entered in QB
            </button>
            <button className="flex-1 rounded border border-border bg-card text-foreground px-4 py-2.5 text-xs font-medium hover:bg-muted active:bg-muted">
              Send
            </button>
            <button className="flex-1 rounded border border-border bg-card text-foreground px-4 py-2.5 text-xs font-medium hover:bg-muted active:bg-muted">
              Copy
            </button>
            <button className="flex-1 rounded border border-border bg-card text-foreground px-4 py-2.5 text-xs font-medium hover:bg-muted active:bg-muted">
              Terminate
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
