'use client'

import { useMemo, useState } from 'react'
import { Plus, Edit2, Trash2, Archive, FileText, Camera } from 'lucide-react'
import { AppHeader, ScrollArea, Card, EmptyState } from "@/components/app/shell"
import { SearchBar } from "@/components/app/widgets"
import { Button } from "@/components/ui/button"
import type { ScreenProps } from './registry'

interface Opportunity {
  id: string
  name: string
  asr?: string
  contents: string
  date: string
  owner: string
  pic?: boolean
  doc?: boolean
}

const mockData: Opportunity[] = [
  {
    id: '1',
    name: 'Albert Einstein School of Medicine',
    asr: '',
    contents: 'Animal Feed Storage Room - 7/2 - Ricky set up site visit for Tuesday 7/5 to look at this room. DI Water Various Upgrades - 7/2 - Ricky is working on a Quote for (3) Tech Specs for repairs.',
    date: '07/02/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: true
  },
  {
    id: '2',
    name: 'Lockheed Martin',
    asr: '',
    contents: 'Brian Kenny - LIFON - Catholic Health & other Ops - 6/30 - Ricky is waiting for copy of quote for repairs.',
    date: '07/02/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: true
  },
  {
    id: '3',
    name: 'Brian Kenny',
    asr: 'LIFON',
    contents: 'Brian Kenny - LIFON - Catholic Health & other Ops - 6/26 - Sean told Ricky to remind him to follow up with Brian Kenny on July 15.',
    date: '06/26/2026',
    owner: 'ricky / AL',
    pic: false,
    doc: true
  },
  {
    id: '4',
    name: 'Silverstein Properties - 3 World Trade Center',
    asr: 'AC-13.1',
    contents: 'Update on Repairs / Replacement Unit - 6/25 - Ricky is working on Revised Quote #13055 for Repairs and updated quote for replacement option.',
    date: '06/25/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: false
  },
  {
    id: '5',
    name: 'New York Academy Of Medicine-1216 5th Ave.',
    asr: '',
    contents: 'Updated Pumps & VFDS - 6/18 - Ricky reached out to the subs to get updated pricing. Quote #12788',
    date: '06/25/2026',
    owner: 'ricky / AL',
    pic: false,
    doc: true
  },
]

export function OpportunitiesScreen({ params }: ScreenProps) {
  const [data, setData] = useState<Opportunity[]>(mockData)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [editForm, setEditForm] = useState<Partial<Opportunity>>({})

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contents.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [data, searchQuery])

  const handleEdit = (item: Opportunity) => {
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

  const handleArchive = (id: string) => {
    console.log(`[v0] Archived opportunity: ${id}`)
  }

  return (
    <div className="flex min-h-full flex-col">
      <AppHeader 
        title="Opportunities" 
        subtitle={`${filteredData.length} items`}
        action={<Button size="sm" variant="default"><Plus className="h-4 w-4" /> New</Button>}
      />
      
      <ScrollArea>
        <div className="space-y-3">
          <SearchBar 
            placeholder="Search by name or content" 
            value={searchQuery} 
            onChange={setSearchQuery} 
          />

          {/* Mobile Card View */}
          <div className="md:hidden space-y-2.5">
            {filteredData.length === 0 ? (
              <EmptyState 
                icon={<FileText className="h-7 w-7" />} 
                title="No opportunities" 
                hint="Try a different search." 
              />
            ) : (
              filteredData.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  {/* Card Header */}
                  <div 
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="p-3.5 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground break-words">{item.name}</h3>
                        {item.asr && <p className="text-xs text-muted-foreground mt-0.5">ASR: {item.asr}</p>}
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        {item.pic && <Camera className="h-4 w-4 text-primary" />}
                        {item.doc && <FileText className="h-4 w-4 text-primary" />}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.contents}</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                      <span>{item.date}</span>
                      <span>{item.owner}</span>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedId === item.id && editingId !== item.id && (
                    <div className="px-3.5 py-2.5 bg-muted/50 border-t border-border text-xs text-muted-foreground">
                      {item.contents}
                    </div>
                  )}

                  {/* Edit Form */}
                  {editingId === item.id && (
                    <div className="px-3.5 py-3 bg-muted/50 border-t border-border space-y-2">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Name</label>
                        <input 
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Owner</label>
                        <input 
                          type="text"
                          value={editForm.owner || ''}
                          onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Date</label>
                        <input 
                          type="text"
                          value={editForm.date || ''}
                          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
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
                    <div className="px-3.5 py-2.5 border-t border-border flex gap-1.5 bg-muted/30">
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
                      <button 
                        onClick={() => handleArchive(item.id)}
                        className="p-2 border border-input text-muted-foreground text-xs font-medium rounded hover:bg-muted"
                        title="Archive"
                      >
                        <Archive className="h-3.5 w-3.5" />
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
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">ASR</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Contents</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Owner</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Attachments</th>
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
                        <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.asr || '—'}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs max-w-sm truncate">{item.contents}</td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{item.date}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.owner}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {item.pic && <Camera className="h-4 w-4 text-primary" title="Picture" />}
                            {item.doc && <FileText className="h-4 w-4 text-primary" title="Document" />}
                          </div>
                        </td>
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
                                handleArchive(item.id)
                              }}
                              className="p-2 hover:bg-muted rounded text-muted-foreground transition-colors"
                              title="Archive"
                            >
                              <Archive className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {expandedId === item.id && editingId !== item.id && (
                        <tr className="border-b border-border bg-muted/30">
                          <td colSpan={7} className="px-4 py-3 text-sm text-muted-foreground">{item.contents}</td>
                        </tr>
                      )}

                      {/* Edit Form Row */}
                      {editingId === item.id && (
                        <tr className="border-b border-border bg-muted/30">
                          <td colSpan={7} className="px-4 py-4">
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">Name</label>
                                <input 
                                  type="text"
                                  value={editForm.name || ''}
                                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                  className="w-full px-2.5 py-1.5 text-sm border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">Owner</label>
                                <input 
                                  type="text"
                                  value={editForm.owner || ''}
                                  onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })}
                                  className="w-full px-2.5 py-1.5 text-sm border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">Date</label>
                                <input 
                                  type="text"
                                  value={editForm.date || ''}
                                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
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
