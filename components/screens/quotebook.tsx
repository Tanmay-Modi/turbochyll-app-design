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
  customer: string
  description: string
  amount: number
  status: "Pending" | "Approved" | "Submitted" | "Lost" | "Won"
  date: string
  owner: string
  probability?: number // in percentage
  followUpDate?: string
}

const mockData: Quote[] = [
  {
    id: '1',
    quoteNumber: 'Q-2024-001',
    customer: 'ABC Manufacturing LLC',
    description: 'HVAC System Upgrade - 3 units with installation',
    amount: 15500,
    status: 'Won',
    date: '06/15/2026',
    owner: 'Ricky / Sales',
    probability: 100,
    followUpDate: '06/20/2026'
  },
  {
    id: '2',
    quoteNumber: 'Q-2024-002',
    customer: 'Tech Solutions Inc',
    description: 'Cooling Tower Maintenance & Parts Replacement',
    amount: 8750,
    status: 'Submitted',
    date: '06/18/2026',
    owner: 'Sarah / Sales',
    probability: 75,
    followUpDate: '06/28/2026'
  },
  {
    id: '3',
    quoteNumber: 'Q-2024-003',
    customer: 'Global Facilities Group',
    description: 'Emergency Service Call with Repair Kit',
    amount: 3200,
    status: 'Pending',
    date: '07/01/2026',
    owner: 'Mike / Support',
    probability: 45,
    followUpDate: '07/05/2026'
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
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      
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
                    <div className="px-3.5 py-3 bg-muted/30 border-b border-border space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Owner:</span>
                        <span className="font-medium text-foreground">{item.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium text-foreground">{item.date}</span>
                      </div>
                      {item.followUpDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Follow-up:</span>
                          <span className="font-medium text-foreground">{item.followUpDate}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Edit Form */}
                  {editingId === item.id && (
                    <div className="px-3.5 py-3 bg-muted/30 border-b border-border space-y-2.5">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Quote #</label>
                        <input 
                          type="text"
                          value={editForm.quoteNumber || ''}
                          onChange={(e) => setEditForm({ ...editForm, quoteNumber: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Amount</label>
                        <input 
                          type="number"
                          value={editForm.amount || ''}
                          onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })}
                          className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Status</label>
                        <select 
                          value={editForm.status || 'Pending'}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                          className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <option>Pending</option>
                          <option>Submitted</option>
                          <option>Approved</option>
                          <option>Won</option>
                          <option>Lost</option>
                        </select>
                      </div>
                      <div className="flex gap-2 pt-1.5">
                        <button
                          onClick={handleSave}
                          className="flex-1 px-3 py-2 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-primary/90"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 px-3 py-2 border border-input text-foreground text-xs font-medium rounded hover:bg-muted"
                        >
                          Cancel
                        </button>
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
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Quote #</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Description</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">Amount</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Status</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Prob.</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">Owner</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Actions</th>
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
                        <td className="px-4 py-3 font-semibold text-foreground">{item.quoteNumber}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{item.customer}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs max-w-sm truncate">{item.description}</td>
                        <td className="px-4 py-3 font-bold text-foreground text-right">{formatCurrency(item.amount)}</td>
                        <td className="px-4 py-3 text-center">
                          <StatusChip status={item.status} size="sm" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          {item.probability && (
                            <span className="inline-block bg-primary/10 text-primary px-2.5 py-1 rounded font-semibold text-xs">
                              {item.probability}%
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{item.owner}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(item)
                              }}
                              className="p-2 hover:bg-primary/10 rounded text-primary transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(item.id)
                              }}
                              className="p-2 hover:bg-destructive/10 rounded text-destructive transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setExpandedId(expandedId === item.id ? null : item.id)
                              }}
                              className="p-2 hover:bg-muted rounded text-muted-foreground transition-colors"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {expandedId === item.id && editingId !== item.id && (
                        <tr className="border-b border-border bg-muted/30">
                          <td colSpan={8} className="px-4 py-3">
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Description</p>
                                <p className="text-foreground mt-1">{item.description}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Date Created</p>
                                <p className="text-foreground mt-1">{item.date}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Follow-up Date</p>
                                <p className="text-foreground mt-1">{item.followUpDate || '—'}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-medium">Win Probability</p>
                                <p className="text-foreground mt-1">{item.probability || 0}%</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* Edit Form Row */}
                      {editingId === item.id && (
                        <tr className="border-b border-border bg-muted/30">
                          <td colSpan={8} className="px-4 py-4">
                            <div className="grid grid-cols-4 gap-3">
                              <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">Quote #</label>
                                <input 
                                  type="text"
                                  value={editForm.quoteNumber || ''}
                                  onChange={(e) => setEditForm({ ...editForm, quoteNumber: e.target.value })}
                                  className="w-full px-2.5 py-1.5 text-sm border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">Amount</label>
                                <input 
                                  type="number"
                                  value={editForm.amount || ''}
                                  onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })}
                                  className="w-full px-2.5 py-1.5 text-sm border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">Status</label>
                                <select 
                                  value={editForm.status || 'Pending'}
                                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                                  className="w-full px-2.5 py-1.5 text-sm border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                  <option>Pending</option>
                                  <option>Submitted</option>
                                  <option>Approved</option>
                                  <option>Won</option>
                                  <option>Lost</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">Probability %</label>
                                <input 
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={editForm.probability || ''}
                                  onChange={(e) => setEditForm({ ...editForm, probability: parseInt(e.target.value) })}
                                  className="w-full px-2.5 py-1.5 text-sm border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-input text-foreground text-sm font-medium rounded hover:bg-muted"
                              >
                                Cancel
                              </button>
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
