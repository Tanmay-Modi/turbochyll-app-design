'use client'

import { useState, useMemo } from 'react'
import { Eye, EyeOff, Download, RotateCcw } from 'lucide-react'
import { AppHeader, ScrollArea, Card } from '@/components/app/shell'
import { StatusChip } from '@/components/app/status-chip'
import type { ScreenProps } from './registry'

interface TMItem {
  id: string
  tamNumber: string
  jobName: string
  invoiceNumber: string
  dateCompleted: string
  materialCost: number
  materialPrice: number
  laborCost: number
  totalLaborInvoiced: number
  materialProfit: number
  laborProfit: number
  totalProfit: number
  profitPercent: number
}

const mockData: TMItem[] = [
  {
    id: '1',
    tamNumber: 'T&M#5347',
    jobName: 'BAM - KBH Building',
    invoiceNumber: '20882',
    dateCompleted: '11/06/2025',
    materialCost: 1207.36,
    materialPrice: 2140.75,
    laborCost: 1350.00,
    totalLaborInvoiced: 3325,
    materialProfit: 933.39,
    laborProfit: 1975,
    totalProfit: 2823.39,
    profitPercent: 52.47
  },
  {
    id: '2',
    tamNumber: 'T&M#5359',
    jobName: 'Rogosin Institute',
    invoiceNumber: '20812',
    dateCompleted: '10/09/2025',
    materialCost: 183.60,
    materialPrice: 498.27,
    laborCost: 1350.00,
    totalLaborInvoiced: 3060,
    materialProfit: 314.67,
    laborProfit: 1710,
    totalProfit: 2109.67,
    profitPercent: 57.91
  },
  {
    id: '3',
    tamNumber: 'T&M#5364',
    jobName: 'DVM Industries - Cumberland Hospital',
    invoiceNumber: '20855',
    dateCompleted: '10/24/2025',
    materialCost: 634.70,
    materialPrice: 1597.83,
    laborCost: 937.50,
    totalLaborInvoiced: 2275,
    materialProfit: 963.13,
    laborProfit: 1337.5,
    totalProfit: 2300.63,
    profitPercent: 59.40
  }
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value)
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`
}

export function TMNowScreen(props: ScreenProps) {
  const [dateFrom, setDateFrom] = useState('07/01/2025')
  const [dateTo, setDateTo] = useState('07/06/2026')
  const [data, setData] = useState(mockData)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id))
  }

  const handleApplyFilter = () => {
    console.log('Filter applied:', dateFrom, dateTo)
  }

  const handleReset = () => {
    setDateFrom('07/01/2025')
    setDateTo('07/06/2026')
  }

  const handleExportExcel = () => {
    console.log('Export to Excel')
  }

  const handleExportPDF = () => {
    console.log('Export to PDF')
  }

  const totals = useMemo(() => {
    return {
      materialCost: data.reduce((sum, item) => sum + item.materialCost, 0),
      materialPrice: data.reduce((sum, item) => sum + item.materialPrice, 0),
      laborCost: data.reduce((sum, item) => sum + item.laborCost, 0),
      totalLaborInvoiced: data.reduce((sum, item) => sum + item.totalLaborInvoiced, 0),
      materialProfit: data.reduce((sum, item) => sum + item.materialProfit, 0),
      laborProfit: data.reduce((sum, item) => sum + item.laborProfit, 0),
      totalProfit: data.reduce((sum, item) => sum + item.totalProfit, 0),
      profitPercent: data.length > 0 ? (data.reduce((sum, item) => sum + item.profitPercent, 0) / data.length) : 0
    }
  }, [data])

  return (
    <div className="w-full h-full flex flex-col bg-background">
      <AppHeader title="T&M Now" subtitle="Time & Material Billing Records" />
      
      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 space-y-4">
          {/* Filter Section */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-2">From (Date Completed)</label>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-2">To (Date Completed)</label>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="col-span-2 md:col-span-2 flex gap-2">
                  <button
                    onClick={handleApplyFilter}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90"
                  >
                    Apply Filter
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-input text-foreground text-sm font-medium rounded hover:bg-muted"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleExportExcel}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Excel
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export PDF
                </button>
              </div>
            </div>
          </Card>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {data.map((item) => (
              <div key={item.id}>
                <Card className="p-4 border-l-4 border-l-primary">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <a href="#" className="text-primary font-semibold hover:underline">{item.tamNumber}</a>
                        <p className="text-sm text-foreground font-medium">{item.jobName}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive text-sm font-medium hover:text-destructive/80"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-muted-foreground">Invoice:</span> <span className="font-semibold">{item.invoiceNumber}</span></div>
                      <div><span className="text-muted-foreground">Date:</span> <span className="font-semibold">{item.dateCompleted}</span></div>
                      <div><span className="text-muted-foreground">Mat. Cost:</span> <span className="font-semibold">{formatCurrency(item.materialCost)}</span></div>
                      <div><span className="text-muted-foreground">Lab. Cost:</span> <span className="font-semibold">{formatCurrency(item.laborCost)}</span></div>
                      <div><span className="text-muted-foreground">Total Profit:</span> <span className="font-bold text-primary">{formatCurrency(item.totalProfit)}</span></div>
                      <div><span className="text-muted-foreground">Profit %:</span> <span className="font-bold text-primary">{formatPercent(item.profitPercent)}</span></div>
                    </div>
                    {expandedId === item.id && (
                      <div className="pt-3 border-t border-border space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div><span className="text-muted-foreground">Mat. Price:</span> <span className="font-semibold">{formatCurrency(item.materialPrice)}</span></div>
                          <div><span className="text-muted-foreground">Total Lab Inv:</span> <span className="font-semibold">{item.totalLaborInvoiced}</span></div>
                          <div><span className="text-muted-foreground">Mat. Profit:</span> <span className="font-semibold">{formatCurrency(item.materialProfit)}</span></div>
                          <div><span className="text-muted-foreground">Lab. Profit:</span> <span className="font-semibold">{formatCurrency(item.laborProfit)}</span></div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="text-xs text-primary font-medium hover:underline"
                    >
                      {expandedId === item.id ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">T&M #</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Job Name</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Invoice #</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Date Completed</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Material Cost</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Material Price</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Labor Cost</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Total Labor Invoiced</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Material Profit</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Labor Profit</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Total Profit</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Profit %</th>
                    <th className="px-3 py-2.5 text-center font-semibold text-foreground whitespace-nowrap text-xs">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-3 py-2.5"><a href="#" className="text-primary font-semibold hover:underline">{item.tamNumber}</a></td>
                      <td className="px-3 py-2.5 text-foreground">{item.jobName}</td>
                      <td className="px-3 py-2.5 text-foreground">{item.invoiceNumber}</td>
                      <td className="px-3 py-2.5 text-foreground">{item.dateCompleted}</td>
                      <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(item.materialCost)}</td>
                      <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(item.materialPrice)}</td>
                      <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(item.laborCost)}</td>
                      <td className="px-3 py-2.5 text-right text-foreground">{item.totalLaborInvoiced}</td>
                      <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(item.materialProfit)}</td>
                      <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(item.laborProfit)}</td>
                      <td className="px-3 py-2.5 text-right font-semibold text-primary">{formatCurrency(item.totalProfit)}</td>
                      <td className="px-3 py-2.5 text-right font-semibold text-primary">{formatPercent(item.profitPercent)}</td>
                      <td className="px-3 py-2.5 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-destructive text-sm font-medium hover:text-destructive/80"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Totals Section */}
                  <tr className="bg-primary/5 border-t-2 border-border font-semibold">
                    <td colSpan={4} className="px-3 py-2.5 text-foreground">Totals</td>
                    <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(totals.materialCost)}</td>
                    <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(totals.materialPrice)}</td>
                    <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(totals.laborCost)}</td>
                    <td className="px-3 py-2.5 text-right text-foreground">{totals.totalLaborInvoiced}</td>
                    <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(totals.materialProfit)}</td>
                    <td className="px-3 py-2.5 text-right text-foreground">{formatCurrency(totals.laborProfit)}</td>
                    <td className="px-3 py-2.5 text-right text-primary">{formatCurrency(totals.totalProfit)}</td>
                    <td className="px-3 py-2.5 text-right text-primary">{formatPercent(totals.profitPercent)}</td>
                    <td className="px-3 py-2.5"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Totals */}
          <div className="md:hidden bg-primary/5 rounded-lg p-4 border border-border">
            <div className="space-y-2 text-sm">
              <h3 className="font-semibold text-foreground">Totals</h3>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Material Cost:</span> <span className="font-semibold">{formatCurrency(totals.materialCost)}</span></div>
                <div><span className="text-muted-foreground">Material Price:</span> <span className="font-semibold">{formatCurrency(totals.materialPrice)}</span></div>
                <div><span className="text-muted-foreground">Labor Cost:</span> <span className="font-semibold">{formatCurrency(totals.laborCost)}</span></div>
                <div><span className="text-muted-foreground">Lab. Invoiced:</span> <span className="font-semibold">{totals.totalLaborInvoiced}</span></div>
                <div><span className="text-muted-foreground">Material Profit:</span> <span className="font-semibold">{formatCurrency(totals.materialProfit)}</span></div>
                <div><span className="text-muted-foreground">Labor Profit:</span> <span className="font-semibold">{formatCurrency(totals.laborProfit)}</span></div>
                <div className="col-span-2"><span className="text-muted-foreground">Total Profit:</span> <span className="font-bold text-primary text-lg">{formatCurrency(totals.totalProfit)}</span></div>
                <div className="col-span-2"><span className="text-muted-foreground">Profit %:</span> <span className="font-bold text-primary text-lg">{formatPercent(totals.profitPercent)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
