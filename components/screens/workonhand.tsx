'use client'

import { useMemo, useState } from 'react'
import { Plus, Edit2, Trash2, Clock, MapPin, User } from 'lucide-react'
import { AppHeader, ScrollArea, Card } from "@/components/app/shell"
import { SearchBar, Segmented } from "@/components/app/widgets"
import { StatusChip } from "@/components/app/status-chip"
import type { ScreenProps } from './registry'

interface Technician {
  name: string
  date: string
}

interface WorkOnHand {
  id: string
  selected: boolean
  tamNumber: string
  category: string
  customer: string
  description: string
  asr: string
  dateArranged: string
  dateScheduled: string
  techsScheduled: Technician[]
  location: string
  estHoursST: number
  estHoursOT: number
  hrsRemST: number
  hrsRemOT: number
  po: string
  priority?: string
}

const CATEGORIES = [
  'Quotes',
  'Maintenance',
  'PTO',
  'T&M',
  'Cooling Tower Maintenance',
  'Warranty',
  'MAW-Mostly Admin Work',
  'Truck',
  'MAR'
]

const CUSTOMERS = [
  'Curry TV- 365 5th Ave',
  'NY Methodist',
  '410 Central Park South Corp',
  '135 West 50th Street',
  '14 West 58th Street - Fenris Mazars',
  '14 Wall Street',
  '144 I Broadway',
  '240 Park Avenue South Condominiums',
  '325 East 84th Street',
  '325 Lexington Avenue',
  '555 West 23rd Street',
  'DVM - Kings County Hospital',
  'DVM - Kings County - IT Room',
  'DVM Industries - Queens Health Clinic',
  'Montefiore Hospital-1250 Waters Place',
  'Montefiore Medical Park - 1625 Poplar Ave',
  'Montefiore Hospital- Westminster Square',
  'Montefiore Hospital-1825 East Chester road',
  'Start On-Call Watch'
]

const mockData: WorkOnHand[] = [
  {
    id: '1',
    selected: true,
    tamNumber: '11151',
    category: 'MAR',
    customer: 'Curry TV- 365 5th Ave',
    description: 'Maintenance Due',
    asr: '',
    dateArranged: '07/04/2026',
    dateScheduled: '07/03/2026',
    techsScheduled: [
      { name: 'Ricardo Sezzian', date: '07/04/2026' },
      { name: 'Leyd Lah', date: '07/04/2026' }
    ],
    location: 'NYC',
    estHoursST: 22,
    estHoursOT: 0,
    hrsRemST: 0,
    hrsRemOT: 0,
    po: ''
  },
  {
    id: '2',
    selected: true,
    tamNumber: 'T&M6290',
    category: 'TAM',
    customer: 'NY Methodist',
    description: '7/4 On Call',
    asr: '',
    dateArranged: '',
    dateScheduled: '07/03/2026',
    techsScheduled: [
      { name: 'Ricardo Sezzian', date: '07/04/2026' },
      { name: 'Leyd Lah', date: '07/04/2026' },
      { name: 'Rudy Flores', date: '07/03/2026' },
      { name: 'Leyd Lah', date: '07/03/2026' }
    ],
    location: 'NYC',
    estHoursST: 0,
    estHoursOT: 0,
    hrsRemST: 0,
    hrsRemOT: 0,
    po: '12134'
  },
  {
    id: '3',
    selected: true,
    tamNumber: 'T&M6289',
    category: 'TAM',
    customer: 'NY Methodist',
    description: '5th floor unit 2',
    asr: '',
    dateArranged: '',
    dateScheduled: '07/03/2026',
    techsScheduled: [
      { name: 'Rudy Flores', date: '07/03/2026' },
      { name: 'Leyd Lah', date: '07/03/2026' }
    ],
    location: 'NYC',
    estHoursST: 0,
    estHoursOT: 0,
    hrsRemST: 0,
    hrsRemOT: 0,
    po: '12133'
  },
  {
    id: '4',
    selected: true,
    tamNumber: 'T&M6288',
    category: 'TAM',
    customer: 'DVM - Kings County Hospital',
    description: 'T building Auditorium not cooling, Req by Bess',
    asr: '',
    dateArranged: '',
    dateScheduled: '07/02/2026',
    techsScheduled: [
      { name: 'Ricardo Sezzian', date: '07/02/2026' },
      { name: 'Juan Ausasagasta', date: '07/02/2026' },
      { name: 'Robert Pagan', date: '07/02/2026' },
      { name: 'Michael Lewis', date: '07/02/2026' }
    ],
    location: 'Brooklyn',
    estHoursST: 0,
    estHoursOT: 0,
    hrsRemST: 0,
    hrsRemOT: 0,
    po: ''
  }
]

const formatDate = (date: string) => date || '—'

export function WorkOnHandScreen({ params }: ScreenProps) {
  const [data, setData] = useState(mockData)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<WorkOnHand>>({})

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.tamNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [data, searchQuery])

  const handleEdit = (item: WorkOnHand) => {
    setEditingId(item.id)
    setEditForm(item)
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

  const stats = useMemo(() => {
    return {
      totalWorks: filteredData.length,
      totalHoursST: filteredData.reduce((sum, item) => sum + item.estHoursST, 0),
      totalHoursOT: filteredData.reduce((sum, item) => sum + item.estHoursOT, 0),
      pendingCount: filteredData.filter(item => !item.dateScheduled).length
    }
  }, [filteredData])

  return (
    <div className="w-full h-full flex flex-col bg-background">
      <AppHeader title="Work On Hand" subtitle="Manage field service work schedules and technician assignments" />
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="p-3 md:p-4">
              <p className="text-xs text-muted-foreground font-medium">Total Work Items</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{stats.totalWorks}</p>
            </Card>
            <Card className="p-3 md:p-4">
              <p className="text-xs text-muted-foreground font-medium">Pending Schedules</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{stats.pendingCount}</p>
            </Card>
            <Card className="p-3 md:p-4">
              <p className="text-xs text-muted-foreground font-medium">Est. ST Hours</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{stats.totalHoursST}</p>
            </Card>
            <Card className="p-3 md:p-4">
              <p className="text-xs text-muted-foreground font-medium">Est. OT Hours</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{stats.totalHoursOT}</p>
            </Card>
          </div>

          {/* Search */}
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by T&M number, customer, category..."
          />

          {/* Mobile View */}
          <div className="md:hidden space-y-2">
            {filteredData.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-bold text-foreground">{item.tamNumber}</p>
                        <span className="inline-block bg-muted px-2 py-0.5 rounded text-xs font-medium text-muted-foreground">{item.category}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground line-clamp-2">{item.customer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Scheduled</p>
                      <p className="text-xs font-semibold text-foreground mt-0.5">{formatDate(item.dateScheduled)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">EST Hours</p>
                      <p className="text-xs font-semibold text-foreground mt-0.5">{item.estHoursST + item.estHoursOT}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">PO</p>
                      <p className="text-xs font-semibold text-foreground mt-0.5">{item.po || '—'}</p>
                    </div>
                  </div>

                  {/* Technicians */}
                  <div className="py-2 border-t border-border">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Technicians ({item.techsScheduled.length})</p>
                    <div className="space-y-1">
                      {item.techsScheduled.slice(0, 2).map((tech, idx) => (
                        <div key={idx} className="text-xs text-foreground flex items-center gap-1">
                          <User className="h-3 w-3 text-primary" />
                          <span>{tech.name}</span>
                          <span className="text-muted-foreground">({tech.date})</span>
                        </div>
                      ))}
                      {item.techsScheduled.length > 2 && (
                        <button onClick={() => setExpandedId(expandedId === item.id ? null : item.id)} className="text-xs text-primary hover:underline">
                          +{item.techsScheduled.length - 2} more
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <button onClick={() => handleEdit(item)} className="flex-1 px-2 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-primary/90 transition-colors">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="flex-1 px-2 py-1.5 border border-destructive text-destructive text-xs font-medium rounded hover:bg-destructive/10 transition-colors">Delete</button>
                  </div>
                </div>

                {/* Mobile Expanded View */}
                {expandedId === item.id && editingId !== item.id && (
                  <div className="px-3.5 py-3 bg-muted/30 border-t border-border space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div><p className="text-muted-foreground">Arranged Date</p><p className="text-foreground font-medium mt-0.5">{formatDate(item.dateArranged)}</p></div>
                      <div><p className="text-muted-foreground">Location</p><p className="text-foreground font-medium mt-0.5">{item.location}</p></div>
                      <div><p className="text-muted-foreground">ST Hours</p><p className="text-foreground font-semibold mt-0.5">{item.estHoursST}</p></div>
                      <div><p className="text-muted-foreground">OT Hours</p><p className="text-foreground font-semibold mt-0.5">{item.estHoursOT}</p></div>
                      <div><p className="text-muted-foreground">Rem ST</p><p className="text-foreground font-semibold mt-0.5">{item.hrsRemST}</p></div>
                      <div><p className="text-muted-foreground">Rem OT</p><p className="text-foreground font-semibold mt-0.5">{item.hrsRemOT}</p></div>
                    </div>
                    {item.techsScheduled.length > 2 && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-muted-foreground font-medium mb-1">All Technicians</p>
                        {item.techsScheduled.map((tech, idx) => (
                          <div key={idx} className="text-foreground flex items-center gap-1 py-0.5">
                            <User className="h-3 w-3 text-primary" />
                            <span>{tech.name}</span>
                            <span className="text-muted-foreground">({tech.date})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Edit Form */}
                {editingId === item.id && (
                  <div className="px-3.5 py-3 bg-muted/30 border-t border-border space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-xs font-medium text-muted-foreground block mb-1">T&M Number</label><input type="text" value={editForm.tamNumber || ''} onChange={(e) => setEditForm({ ...editForm, tamNumber: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                      <div><label className="text-xs font-medium text-muted-foreground block mb-1">Category</label><select value={editForm.category || ''} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"><option value="">Select Category</option>{CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                      <div><label className="text-xs font-medium text-muted-foreground block mb-1">Customer</label><select value={editForm.customer || ''} onChange={(e) => setEditForm({ ...editForm, customer: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"><option value="">Select Customer</option>{CUSTOMERS.map(cust => <option key={cust} value={cust}>{cust}</option>)}</select></div>
                      <div><label className="text-xs font-medium text-muted-foreground block mb-1">Location</label><input type="text" value={editForm.location || ''} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                    </div>
                    <div><label className="text-xs font-medium text-muted-foreground block mb-1">Description</label><input type="text" value={editForm.description || ''} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className="text-xs font-medium text-muted-foreground block mb-1">Date Arranged</label><input type="text" value={editForm.dateArranged || ''} onChange={(e) => setEditForm({ ...editForm, dateArranged: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                      <div><label className="text-xs font-medium text-muted-foreground block mb-1">Date Scheduled</label><input type="text" value={editForm.dateScheduled || ''} onChange={(e) => setEditForm({ ...editForm, dateScheduled: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                      <div><label className="text-xs font-medium text-muted-foreground block mb-1">ST Hours</label><input type="number" value={editForm.estHoursST || ''} onChange={(e) => setEditForm({ ...editForm, estHoursST: parseInt(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                      <div><label className="text-xs font-medium text-muted-foreground block mb-1">OT Hours</label><input type="number" value={editForm.estHoursOT || ''} onChange={(e) => setEditForm({ ...editForm, estHoursOT: parseInt(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                      <div><label className="text-xs font-medium text-muted-foreground block mb-1">PO</label><input type="text" value={editForm.po || ''} onChange={(e) => setEditForm({ ...editForm, po: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                    </div>
                    <div className="flex gap-2 pt-1.5">
                      <button onClick={handleSave} className="flex-1 px-3 py-2 bg-primary text-primary-foreground text-xs font-medium rounded hover:bg-primary/90">Save</button>
                      <button onClick={handleCancel} className="flex-1 px-3 py-2 border border-input text-foreground text-xs font-medium rounded hover:bg-muted">Cancel</button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border sticky top-0">
                  <tr>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">T&M #</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Category</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Customer</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Description</th>
                    <th className="px-3 py-2.5 text-center font-semibold text-foreground whitespace-nowrap text-xs">Arranged</th>
                    <th className="px-3 py-2.5 text-center font-semibold text-foreground whitespace-nowrap text-xs">Scheduled</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Technicians</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">Location</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">ST Hours</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">OT Hours</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Rem ST</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-foreground whitespace-nowrap text-xs">Rem OT</th>
                    <th className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap text-xs">PO</th>
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
                        <td className="px-3 py-2.5 font-semibold text-foreground text-xs">{item.tamNumber}</td>
                        <td className="px-3 py-2.5 text-xs font-medium text-foreground">{item.category}</td>
                        <td className="px-3 py-2.5 text-xs font-medium text-foreground max-w-xs truncate">{item.customer}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground max-w-xs truncate">{item.description}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground text-center">{formatDate(item.dateArranged)}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground text-center">{formatDate(item.dateScheduled)}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground">
                          <div className="space-y-0.5 max-w-xs">
                            {item.techsScheduled.slice(0, 2).map((tech, idx) => (
                              <div key={idx} className="text-foreground text-xs">{tech.name}</div>
                            ))}
                            {item.techsScheduled.length > 2 && (
                              <button onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === item.id ? null : item.id); }} className="text-primary hover:underline text-xs">
                                +{item.techsScheduled.length - 2} more
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground">{item.location}</td>
                        <td className="px-3 py-2.5 text-xs font-semibold text-foreground text-right">{item.estHoursST}</td>
                        <td className="px-3 py-2.5 text-xs font-semibold text-foreground text-right">{item.estHoursOT}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground text-right">{item.hrsRemST}</td>
                        <td className="px-3 py-2.5 text-xs text-muted-foreground text-right">{item.hrsRemOT}</td>
                        <td className="px-3 py-2.5 text-xs text-foreground">{item.po || '—'}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={(e) => { e.stopPropagation(); handleEdit(item); }} className="p-1.5 hover:bg-primary/10 rounded text-primary transition-colors" title="Edit">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="p-1.5 hover:bg-destructive/10 rounded text-destructive transition-colors" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {expandedId === item.id && editingId !== item.id && (
                        <tr className="border-b border-border bg-muted/30">
                          <td colSpan={14} className="px-4 py-3">
                            <div className="grid grid-cols-6 gap-4 text-xs">
                              <div>
                                <p className="text-muted-foreground font-medium">ASR</p>
                                <p className="text-foreground mt-1">{item.asr || '—'}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-medium">All Technicians</p>
                                <div className="space-y-1 mt-1">
                                  {item.techsScheduled.map((tech, idx) => (
                                    <div key={idx} className="text-foreground text-xs">{tech.name} - {tech.date}</div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-muted-foreground font-medium">Remaining Hours</p>
                                <p className="text-foreground mt-1">ST: {item.hrsRemST} | OT: {item.hrsRemOT}</p>
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
                              <div className="grid grid-cols-6 gap-3">
                                <div><label className="text-xs font-medium text-muted-foreground block mb-1">T&M #</label><input type="text" value={editForm.tamNumber || ''} onChange={(e) => setEditForm({ ...editForm, tamNumber: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Category</label><select value={editForm.category || ''} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"><option value="">Select Category</option>{CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Customer</label><select value={editForm.customer || ''} onChange={(e) => setEditForm({ ...editForm, customer: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"><option value="">Select Customer</option>{CUSTOMERS.map(cust => <option key={cust} value={cust}>{cust}</option>)}</select></div>
                                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Location</label><input type="text" value={editForm.location || ''} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                                <div><label className="text-xs font-medium text-muted-foreground block mb-1">ST Hours</label><input type="number" value={editForm.estHoursST || ''} onChange={(e) => setEditForm({ ...editForm, estHoursST: parseInt(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                                <div><label className="text-xs font-medium text-muted-foreground block mb-1">OT Hours</label><input type="number" value={editForm.estHoursOT || ''} onChange={(e) => setEditForm({ ...editForm, estHoursOT: parseInt(e.target.value) })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                              </div>
                              <div><label className="text-xs font-medium text-muted-foreground block mb-1">Description</label><input type="text" value={editForm.description || ''} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                              <div className="grid grid-cols-3 gap-3">
                                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Date Arranged</label><input type="text" value={editForm.dateArranged || ''} onChange={(e) => setEditForm({ ...editForm, dateArranged: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                                <div><label className="text-xs font-medium text-muted-foreground block mb-1">Date Scheduled</label><input type="text" value={editForm.dateScheduled || ''} onChange={(e) => setEditForm({ ...editForm, dateScheduled: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
                                <div><label className="text-xs font-medium text-muted-foreground block mb-1">PO</label><input type="text" value={editForm.po || ''} onChange={(e) => setEditForm({ ...editForm, po: e.target.value })} className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" /></div>
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
