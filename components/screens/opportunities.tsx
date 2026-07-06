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

  return (
    <div className="bg-background min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-foreground">Opportunities</h1>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Select Module:</label>
            <select className="px-3 py-1.5 border border-input bg-card text-foreground text-sm rounded">
              <option>Opportunities</option>
              <option>Office TTD</option>
              <option>Purchase Orders</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-border rounded bg-card overflow-hidden">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Sort</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Name</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">ASR</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Contents</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Date (mm/dd/yyyy)</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Owner</th>
              <th className="px-3 py-2 text-center font-semibold text-foreground">Pic</th>
              <th className="px-3 py-2 text-center font-semibold text-foreground">Doc</th>
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
                </tr>

                {/* Expanded Content Row */}
                {expandedRows.has(item.id) && (
                  <tr className="border-b border-border bg-yellow-50">
                    <td colSpan={8} className="px-3 py-3">
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
