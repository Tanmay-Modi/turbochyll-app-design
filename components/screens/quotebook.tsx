'use client'

import { useMemo, useState } from 'react'
import { Plus, Edit2, Trash2, Eye, MoreVertical, TrendingUp, DollarSign, Calendar, Users } from 'lucide-react'
import { AppHeader, ScrollArea, Card, EmptyState } from "@/components/app/shell"
import { SearchBar, Segmented } from "@/components/app/widgets"
import { StatusChip } from "@/components/app/status-chip"
import { Button } from "@/components/ui/button"
import type { ScreenProps } from './registry'

interface Quote {
  id: string
  quoteNumber: string
  status: "Pending" | "Approved" | "Submitted" | "Lost" | "Won"
  type: string
  quarter: string
  customer: string
  presenter: string
  description: string
  dateSent: string
  amount: number
  receiptDate?: string
  followUpDate?: string
  note?: string
  estMaterialAmount?: number
  estLaborAmount?: number
  estProfitAmount?: number
  marginProfit?: number
  approvedDate?: string
  daysApproval?: number
  netTerms?: string
  quoteLead?: string
  owner: string
  probability?: number
}

const mockData: Quote[] = [
  {
    id: '1',
    quoteNumber: 'Q-2024-001',
    status: 'Won',
    type: 'Risky',
    quarter: 'Q2 2024',
    customer: 'ABC Manufacturing LLC',
    presenter: 'Ricky',
    description: 'DAM Industries - Harem Hospital',
    dateSent: '06/15/2026',
    amount: 15500,
    receiptDate: '06/20/2026',
    followUpDate: '06/25/2026',
    note: 'First order, pending contract review',
    estMaterialAmount: 8857,
    estLaborAmount: 1320,
    estProfitAmount: 9075,
    marginProfit: 47,
    approvedDate: '06/28/2026',
    daysApproval: 4,
    netTerms: 'Net 30',
    quoteLead: '100% Upon Completion',
    owner: 'Ricky / Sales',
    probability: 100
  },
  {
    id: '2',
    quoteNumber: 'Q-2024-002',
    status: 'Submitted',
    type: 'Risky',
    quarter: 'Q2 2024',
    customer: 'Tech Solutions Inc',
    presenter: 'Sarah',
    description: 'DAM - Kings County - IT Room',
    dateSent: '06/18/2026',
    amount: 8750,
    receiptDate: '06/23/2026',
    followUpDate: '07/02/2026',
    note: 'Requires IT approval',
    estMaterialAmount: 1000,
    estLaborAmount: 4800,
    estProfitAmount: 8040,
    marginProfit: 58,
    approvedDate: '07/01/2026',
    daysApproval: 4,
    netTerms: 'Net 45',
    quoteLead: 'Bi-Annual Maintenance',
    owner: 'Sarah / Sales',
    probability: 75
  },
  {
    id: '3',
    quoteNumber: 'Q-2024-003',
    status: 'Pending',
    type: 'Risky',
    quarter: 'Q3 2024',
    customer: 'Global Facilities Group',
    presenter: 'Mike',
    description: 'DAM - Kings County - HVAC Unit',
    dateSent: '07/01/2026',
    amount: 3200,
    receiptDate: '07/05/2026',
    followUpDate: '07/08/2026',
    note: 'Waiting for budget approval',
    estMaterialAmount: 1000,
    estLaborAmount: 3840,
    estProfitAmount: 6220,
    marginProfit: 57,
    approvedDate: '07/06/2026',
    daysApproval: 4,
    netTerms: 'Net 30',
    quoteLead: 'Bi-Annual Maintenance',
    owner: 'Mike / Support',
    probability: 45
  },
]

export function QuoteBookScreen({ params }: ScreenProps) {
  const [data, setData] = useState<Quote[]>(mockData)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [editForm, setEditForm] = useState<Partial<Quote>>({})

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.presenter.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus
      
      return matchesSearch && matchesStatus
    })
  }, [data, searchQuery, filterStatus])

  const stats = useMemo(() => {
    const totalAmount = data.reduce((sum, item) => sum + item.amount, 0)
    const wonAmount = data.filter(item => item.status === 'Won').reduce((sum, item) => sum + item.amount, 0)
    const avgProbability = data.filter(item => item.probability).reduce((sum, item) => sum + (item.probability || 0), 0) / data.length

    return {
      total: totalAmount,
      won: wonAmount,
      pending: data.length,
      avgProb: avgProbability.toFixed(0)
    }
  }, [data])

  const handleEdit = (item: Quote) => {
    setEditingId(item.id)
    setEditForm({ ...item })
    setExpandedId(null)
  }

  const handleSave = () => {
    if (editingId) {
      setData(data.map(item => item.id === editingId ? { ...item, ...editForm } : item))
      setEditingId(null)
      setEditForm({})
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id))
  }

  const formatCurrency = (amount: number) => `$${(amount / 1000).toFixed(1)}k`

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader 
        title="Quote Book" 
        subtitle={`${filteredData.length} of ${data.length} quotes`}
        right={<Button size="sm" variant="default"><Plus className="h-4 w-4" /> New</Button>}
      />
      
      <ScrollArea>
        <div className="space-y-4">
          {/* Stats Grid - Mobile & Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-primary/10 rounded-xl p-3 border border-primary/20">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">Pipeline</p>
              <p className="text-lg md:text-xl font-bold text-foreground mt-1">{formatCurrency(stats.total)}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 border border-green-200">
              <p className="text-[11px] text-green-700 font-medium uppercase tracking-wide">Won</p>
              <p className="text-lg md:text-xl font-bold text-green-700 mt-1">{formatCurrency(stats.won)}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
              <p className="text-[11px] text-amber-700 font-medium uppercase tracking-wide">Active</p>
              <p className="text-lg md:text-xl font-bold text-amber-700 mt-1">{stats.pending}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
              <p className="text-[11px] text-blue-700 font-medium uppercase tracking-wide">Avg Prob.</p>
              <p className="text-lg md:text-xl font-bold text-blue-700 mt-1">{stats.avgProb}%</p>
            </div>
          </div>

          {/* Filters */}
          <Segmented
            options={[
              { value: 'all', label: 'All' },
              { value: 'Pending', label: 'Pending' },
              { value: 'Submitted', label: 'Submitted' },
              { value: 'Won', label: 'Won' },
              { value: 'Lost', label: 'Lost' },
            ]}
            value={filterStatus}
            onChange={setFilterStatus}
          />

          <SearchBar 
            placeholder="Search quotes, customer, or number" 
            value={searchQuery} 
            onChange={setSearchQuery} 
          />

          {/* Mobile Card View */}
          <div className="md:hidden space-y-2.5">
            {filteredData.length === 0 ? (
              <EmptyState 
                icon={<DollarSign className="h-7 w-7" />} 
                title="No quotes found" 
                hint="Try a different filter or search." 
              />
            ) : (
              filteredData.map((item) => (
                <Card key={item.id} className="overflow-hidden p-0">
                  {/* Card Header - Always visible */}
                  <div 
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="p-3.5 cursor-pointer hover:bg-muted/40 transition-colors border-b border-border"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-muted-foreground">{item.quoteNumber}</span>
                          <StatusChip status={item.status} size="sm" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground break-words">{item.customer}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-base font-bold text-foreground">{formatCurrency(item.amount)}</span>
                      {item.probability && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                          {item.probability}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedId === item.id && editingId !== item.id && (
                    <div className="px-3.5 py-3 bg-muted/30 border-b border-border space-y-2.5 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex justify-between"><span className="text-muted-foreground">Type:</span><span className="font-medium text-foreground">{item.type}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Quarter:</span><span className="font-medium text-foreground">{item.quarter}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Presenter:</span><span className="font-medium text-foreground">{item.presenter}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Owner:</span><span className="font-medium text-foreground">{item.owner}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Date Sent:</span><span className="font-medium text-foreground">{item.dateSent}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Follow-up:</span><span className="font-medium text-foreground">{item.followUpDate || '—'}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Receipt:</span><span className="font-medium text-foreground">{item.receiptDate || '—'}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Net Terms:</span><span className="font-medium text-foreground">{item.netTerms || '—'}</span></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border">
                        <div className="flex justify-between"><span className="text-muted-foreground">Est. Material:</span><span className="font-semibold text-foreground">{item.estMaterialAmount ? formatCurrency(item.estMaterialAmount) : '—'}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Est. Labor:</span><span className="font-semibold text-foreground">{item.estLaborAmount ? formatCurrency(item.estLaborAmount) : '—'}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Est. Profit:</span><span className="font-semibold text-foreground">{item.estProfitAmount ? formatCurrency(item.estProfitAmount) : '—'}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Margin %:</span><span className="font-semibold text-foreground">{item.marginProfit ? `${item.marginProfit}%` : '—'}</span></div>
                      </div>
                      {item.note && (
                        <div className="pt-1 border-t border-border">
                          <span className="text-muted-foreground text-xs">Note:</span>
                          <p className="text-foreground mt-1">{item.note}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Edit Form */}
                  {editingId === item.id && (
                    <div className="px-3.5 py-3 bg-muted/30 border-b border-border space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Quote #</label><input type="text" value={editForm.quoteNumber || ''} onChange={(e) => setEditForm({ ...editForm, quoteNumber: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Status</label><select value={editForm.status || 'Pending'} onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"><option>Pending</option><option>Submitted</option><option>Approved</option><option>Won</option><option>Lost</option></select></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Type</label><input type="text" value={editForm.type || ''} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Quarter</label><input type="text" value={editForm.quarter || ''} onChange={(e) => setEditForm({ ...editForm, quarter: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Customer</label><input type="text" value={editForm.customer || ''} onChange={(e) => setEditForm({ ...editForm, customer: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Presenter</label><input type="text" value={editForm.presenter || ''} onChange={(e) => setEditForm({ ...editForm, presenter: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Amount</label><input type="number" value={editForm.amount || ''} onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Probability %</label><input type="number" min="0" max="100" value={editForm.probability || ''} onChange={(e) => setEditForm({ ...editForm, probability: parseInt(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Date Sent</label><input type="text" value={editForm.dateSent || ''} onChange={(e) => setEditForm({ ...editForm, dateSent: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Receipt Date</label><input type="text" value={editForm.receiptDate || ''} onChange={(e) => setEditForm({ ...editForm, receiptDate: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Follow-up</label><input type="text" value={editForm.followUpDate || ''} onChange={(e) => setEditForm({ ...editForm, followUpDate: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                        <div><label className="text-xs font-medium text-muted-foreground block mb-1">Est. Profit</label><input type="number" value={editForm.estProfitAmount || ''} onChange={(e) => setEditForm({ ...editForm, estProfitAmount: parseFloat(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Description</label>
                        <input type="text" value={editForm.description || ''} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Note</label>
                        <textarea value={editForm.note || ''} onChange={(e) => setEditForm({ ...editForm, note: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" rows={2} />
                      </div>
                      <div className="flex gap-2 pt-1.5">
                        <button onClick={handleSave} className="flex-1 px-3 py-2 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-primary/90">Save</button>
                        <button onClick={handleCancel} className="flex-1 px-3 py-2 border border-input text-foreground text-xs font-medium rounded hover:bg-muted">Cancel</button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {editingId !== item.id && (
                    <div className="px-3.5 py-2.5 flex gap-1.5 bg-muted/20">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-primary/90"
                      >
                        <Edit2 className="h-3 w-3" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 border border-destructive text-destructive text-xs font-medium rounded hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border sticky top-0">
                  <tr>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Quote #</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Status</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Type</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Customer</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Presenter</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Description</th>
                    <th className="px-3 py-2.5 text-center font-semibold text-foreground whitespace-nowrap text-xs">Date Sent</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Total Amount</th>
                    <th className="px-3 py-2.5 text-center font-semibold text-foreground whitespace-nowrap text-xs">Receipt Date</th>
                    <th className="px-3 py-2.5 text-center font-semibold text-foreground whitespace-nowrap text-xs">Follow-up</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Est. Profit</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Margin %</th>
                    <th className="px-3 py-2.5 text-center font-semibold text-foreground whitespace-nowrap text-xs">Prob.</th>
                    <th className="px-3 py-2.5 text-center font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <>
                      <tr 
                        key={item.id}
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        className="border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <td className="px-3 py-2.5 font-semibold text-foreground text-xs">{item.quoteNumber}</td>
                        <td className="px-3 py-2.5"><StatusChip status={item.status} size="sm" /></td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground">{item.type}</td>
                        <td className="px-3 py-2.5 text-xs font-medium text-foreground max-w-xs truncate">{item.customer}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground">{item.presenter}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground max-w-xs truncate">{item.description}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground text-center">{item.dateSent}</td>
                        <td className="px-3 py-2.5 text-xs font-semibold text-foreground text-right">{formatCurrency(item.amount)}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground text-center">{item.receiptDate || '—'}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground text-center">{item.followUpDate || '—'}</td>
                        <td className="px-3 py-2.5 text-xs font-semibold text-foreground text-right">{item.estProfitAmount ? formatCurrency(item.estProfitAmount) : '—'}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground text-right">{item.marginProfit ? `${item.marginProfit}%` : '—'}</td>
                        <td className="px-3 py-2.5 text-xs text-center">
                          {item.probability && (
                            <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded font-semibold">
                              {item.probability}%
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(item)
                              }}
                              className="p-1.5 hover:bg-primary/10 rounded text-primary transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(item.id)
                              }}
                              className="p-1.5 hover:bg-destructive/10 rounded text-destructive transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {expandedId === item.id && editingId !== item.id && (
                        <tr className="border-b border-border bg-muted/30">
                          <td colSpan={14} className="px-4 py-3">
                            <div className="grid grid-cols-7 gap-4 text-xs">
                              <div>
                                <p className="text-muted-foreground font-medium">Quarter</p>
                                <p className="text-foreground mt-1 font-medium">{item.quarter}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-medium">Date Sent</p>
                                <p className="text-foreground mt-1">{item.dateSent}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-medium">Receipt Date</p>
                                <p className="text-foreground mt-1">{item.receiptDate || '—'}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-medium">Est. Material</p>
                                <p className="text-foreground mt-1 font-semibold">{item.estMaterialAmount ? formatCurrency(item.estMaterialAmount) : '—'}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-medium">Est. Labor</p>
                                <p className="text-foreground mt-1 font-semibold">{item.estLaborAmount ? formatCurrency(item.estLaborAmount) : '—'}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-medium">Margin Profit</p>
                                <p className="text-foreground mt-1 font-semibold">{item.marginProfit ? `${item.marginProfit}%` : '—'}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-medium">Net Terms</p>
                                <p className="text-foreground mt-1">{item.netTerms || '—'}</p>
                              </div>
                              <div className="col-span-7">
                                <p className="text-muted-foreground font-medium">Note</p>
                                <p className="text-foreground mt-1">{item.note || '—'}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Edit Form Row */}
                      {editingId === item.id && (
                        <tr className="border-b border-border bg-muted/30">
                          <td colSpan={14} className="px-4 py-4">
                            <div className="space-y-3">
                              <div className="grid grid-cols-7 gap-3">
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Quote #</label>
                                  <input type="text" value={editForm.quoteNumber || ''} onChange={(e) => setEditForm({ ...editForm, quoteNumber: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Status</label>
                                  <select value={editForm.status || 'Pending'} onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50">
                                    <option>Pending</option>
                                    <option>Submitted</option>
                                    <option>Approved</option>
                                    <option>Won</option>
                                    <option>Lost</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Type</label>
                                  <input type="text" value={editForm.type || ''} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Quarter</label>
                                  <input type="text" value={editForm.quarter || ''} onChange={(e) => setEditForm({ ...editForm, quarter: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Customer</label>
                                  <input type="text" value={editForm.customer || ''} onChange={(e) => setEditForm({ ...editForm, customer: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Presenter</label>
                                  <input type="text" value={editForm.presenter || ''} onChange={(e) => setEditForm({ ...editForm, presenter: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Probability %</label>
                                  <input type="number" min="0" max="100" value={editForm.probability || ''} onChange={(e) => setEditForm({ ...editForm, probability: parseInt(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                              </div>
                              <div className="grid grid-cols-7 gap-3">
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Total Amount</label>
                                  <input type="number" value={editForm.amount || ''} onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Est. Material</label>
                                  <input type="number" value={editForm.estMaterialAmount || ''} onChange={(e) => setEditForm({ ...editForm, estMaterialAmount: parseFloat(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Est. Labor</label>
                                  <input type="number" value={editForm.estLaborAmount || ''} onChange={(e) => setEditForm({ ...editForm, estLaborAmount: parseFloat(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Est. Profit</label>
                                  <input type="number" value={editForm.estProfitAmount || ''} onChange={(e) => setEditForm({ ...editForm, estProfitAmount: parseFloat(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Margin %</label>
                                  <input type="number" value={editForm.marginProfit || ''} onChange={(e) => setEditForm({ ...editForm, marginProfit: parseInt(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Net Terms</label>
                                  <input type="text" value={editForm.netTerms || ''} onChange={(e) => setEditForm({ ...editForm, netTerms: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Quote Lead</label>
                                  <input type="text" value={editForm.quoteLead || ''} onChange={(e) => setEditForm({ ...editForm, quoteLead: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                              </div>
                              <div className="grid grid-cols-7 gap-3">
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Date Sent</label>
                                  <input type="text" value={editForm.dateSent || ''} onChange={(e) => setEditForm({ ...editForm, dateSent: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Receipt Date</label>
                                  <input type="text" value={editForm.receiptDate || ''} onChange={(e) => setEditForm({ ...editForm, receiptDate: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Follow-up Date</label>
                                  <input type="text" value={editForm.followUpDate || ''} onChange={(e) => setEditForm({ ...editForm, followUpDate: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Approved Date</label>
                                  <input type="text" value={editForm.approvedDate || ''} onChange={(e) => setEditForm({ ...editForm, approvedDate: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Days Approval</label>
                                  <input type="number" value={editForm.daysApproval || ''} onChange={(e) => setEditForm({ ...editForm, daysApproval: parseInt(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Description</label>
                                  <input type="text" value={editForm.description || ''} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground block mb-1">Owner</label>
                                  <input type="text" value={editForm.owner || ''} onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                              </div>
                              <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">Note</label>
                                <textarea value={editForm.note || ''} onChange={(e) => setEditForm({ ...editForm, note: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" rows={2} />
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button onClick={handleSave} className="px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-primary/90">Save</button>
                              <button onClick={handleCancel} className="px-4 py-2 border border-input text-foreground text-xs font-medium rounded hover:bg-muted">Cancel</button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
