'use client'

import { useState } from 'react'
import type { ScreenProps } from './registry'

interface Opportunity {
  id: string
  name: string
  asr?: string
  contents: string[]
  date: string
  owner: string
  pic?: boolean
  doc?: boolean
  editing?: boolean
}

const mockData: Opportunity[] = [
  {
    id: '1',
    name: 'Albert Einstein School of Medicine',
    contents: [
      'Animal Feed Storage Room',
      '7/2 - Ricky set up site visit for Tuesday 7/5 to look at this room.',
      'DI Water Various Upgrades',
      '7/2 - Ricky is working on a Quote for (3) Tech Specs for repairs.'
    ],
    date: '07/02/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: true
  },
  {
    id: '2',
    name: 'Lockheed Martin',
    contents: [
      'Brian Kenny - LIFON - Catholic Health & other Ops',
      '6/30 - Ricky is waiting for copy of quote for repairs, Brian Kenny to get pricing'
    ],
    date: '07/02/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: true
  },
  {
    id: '3',
    name: 'Brian Kenny',
    contents: [
      'Brian Kenny - LIFON - Catholic Health & other Ops',
      '6/30 - Ricky is waiting for copy of quote for repairs on July 15'
    ],
    date: '06/26/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: true
  },
  {
    id: '4',
    name: 'Silverstein Properties - 3 World Trade Center',
    contents: [
      'Update on Repairs / Replacement Unit - AC-13.1',
      '6/25 - Ricky is working on Revised Quote #13055 for Repairs and updated quote for replacement option.'
    ],
    date: '06/25/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: true
  },
  {
    id: '5',
    name: 'New York Academy Of Medicine-1216 5th Ave.',
    contents: [
      'Updated Pumps & VFDS',
      '6/18 - Ricky reached out to the subs to get updated pricing. Quote #12788'
    ],
    date: '06/25/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: true
  }
]

export function OpportunitiesScreen({ params }: ScreenProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [sortBy] = useState<'name' | 'date'>('date')

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const handleEdit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingId(editingId === id ? null : id)
  }

  return (
    <div className="bg-background min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Opportunities</h1>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {mockData.map((item) => (
          <div key={item.id} className="border border-border rounded bg-card overflow-hidden">
            {/* Main Card */}
            <div 
              onClick={() => toggleRow(item.id)}
              className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors border-b border-border`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-input mt-0.5"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground break-words">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.contents[0]}</p>
                </div>
                <div className="flex gap-1 ml-2">
                  {item.pic && <span className="text-primary text-lg">📄</span>}
                  {item.doc && <span className="text-primary text-lg">📋</span>}
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{item.date}</span>
                <span>{item.owner}</span>
              </div>
            </div>

            {/* Edit Button */}
            <div className="px-3 py-2 border-b border-border bg-muted/30 flex gap-2">
              <button
                onClick={(e) => handleEdit(item.id, e)}
                className="flex-1 px-2 py-1.5 text-xs font-medium bg-primary text-card rounded hover:bg-primary/90 active:bg-primary/80"
              >
                {editingId === item.id ? 'Done' : 'Edit'}
              </button>
            </div>

            {/* Expanded Details */}
            {expandedRows.has(item.id) && (
              <div className="px-3 py-3 bg-yellow-50 space-y-2 text-xs">
                {item.contents.map((content, i) => (
                  <div 
                    key={i} 
                    className={i > 0 ? 'text-muted-foreground' : 'font-medium text-foreground'}
                  >
                    {content}
                  </div>
                ))}
              </div>
            )}

            {/* Edit Mode */}
            {editingId === item.id && (
              <div className="px-3 py-3 bg-blue-50 space-y-2 text-xs border-t border-border">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Name</label>
                  <input 
                    type="text" 
                    defaultValue={item.name}
                    className="w-full px-2 py-1 border border-input rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Owner</label>
                  <input 
                    type="text" 
                    defaultValue={item.owner}
                    className="w-full px-2 py-1 border border-input rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Date</label>
                  <input 
                    type="text" 
                    defaultValue={item.date}
                    className="w-full px-2 py-1 border border-input rounded text-xs"
                  />
                </div>
                <button className="w-full px-2 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block border border-border rounded bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Sort</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Name</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">ASR</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Contents</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Date</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Owner</th>
              <th className="px-3 py-2 text-center font-semibold text-foreground">Pic</th>
              <th className="px-3 py-2 text-center font-semibold text-foreground">Doc</th>
              <th className="px-3 py-2 text-center font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, idx) => (
              <div key={item.id} className="contents">
                {/* Main Row */}
                <tr 
                  className={`border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-muted/20'
                  }`}
                  onClick={() => toggleRow(item.id)}
                >
                  <td className="px-3 py-2">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-input"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-3 py-2 font-medium text-foreground text-xs sm:text-sm">{item.name}</td>
                  <td className="px-3 py-2 text-muted-foreground text-xs">{item.asr || '-'}</td>
                  <td className="px-3 py-2 text-muted-foreground text-xs">
                    {item.contents[0]}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground text-xs whitespace-nowrap">{item.date}</td>
                  <td className="px-3 py-2 text-muted-foreground text-xs">{item.owner}</td>
                  <td className="px-3 py-2 text-center">
                    {item.pic && <span className="text-primary">📄</span>}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {item.doc && <span className="text-primary">📄</span>}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={(e) => handleEdit(item.id, e)}
                      className="px-2 py-1 text-xs font-medium bg-primary text-card rounded hover:bg-primary/90 active:bg-primary/80"
                    >
                      {editingId === item.id ? 'Done' : 'Edit'}
                    </button>
                  </td>
                </tr>

                {/* Expanded Content Row */}
                {expandedRows.has(item.id) && !editingId && (
                  <tr className="border-b border-border bg-yellow-50">
                    <td colSpan={9} className="px-3 py-3">
                      <div className="space-y-1 text-xs sm:text-sm">
                        {item.contents.map((content, i) => (
                          <div 
                            key={i} 
                            className={i > 0 ? 'text-muted-foreground' : 'font-medium text-foreground'}
                          >
                            {content}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}

                {/* Edit Form Row */}
                {editingId === item.id && (
                  <tr className="border-b border-border bg-blue-50">
                    <td colSpan={9} className="px-3 py-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1">Name</label>
                          <input 
                            type="text" 
                            defaultValue={item.name}
                            className="w-full px-2 py-1 border border-input rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1">Owner</label>
                          <input 
                            type="text" 
                            defaultValue={item.owner}
                            className="w-full px-2 py-1 border border-input rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1">Date</label>
                          <input 
                            type="text" 
                            defaultValue={item.date}
                            className="w-full px-2 py-1 border border-input rounded text-xs"
                          />
                        </div>
                      </div>
                      <button className="mt-3 px-4 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700">
                        Save Changes
                      </button>
                    </td>
                  </tr>
                )}
              </div>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-xs text-muted-foreground">
        <p>Total Records: {mockData.length}</p>
      </div>
    </div>
  )
}
