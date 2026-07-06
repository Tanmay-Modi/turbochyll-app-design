'use client'

import { useState } from 'react'
import type { ScreenProps } from './registry'

interface OfficeItem {
  id: string
  date: string
  contents: string[]
  owner: string
}

const mockData: OfficeItem[] = [
  {
    id: '1',
    date: '12/12/2025',
    contents: [
      'Baskets Received - 2025',
      '- A&R Electric',
      '- ADS',
      '- Johnstone',
      '- RightClick',
      '- Brooklyn Fan'
    ],
    owner: 'Amanda'
  },
  {
    id: '2',
    date: '01/24/2025',
    contents: [
      'Donation to St. Joseph of Yorkville for Vito\'s wife',
      'Amanda sent email to school asking the best way to go about donations',
      '1/31 sending out donation of $3,000.00',
      'Baskets - 2024 Received from the Following Subs',
      '- A&R Electric',
      '- DVM',
      '- Protect',
      '- RightClick',
      '- Johnstone',
      '- TechRiver'
    ],
    owner: 'Al/Amanda/Sean'
  },
  {
    id: '3',
    date: '12/05/2024',
    contents: [
      'Baskets - 2024 Received from the Following Subs',
      '- A&R Electric',
      '- DVM',
      '- Protect',
      '- RightClick',
      '- Johnstone',
      '- TechRiver'
    ],
    owner: 'Office'
  }
]

export function OfficeTTDScreen({ params }: ScreenProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

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
          <h1 className="text-2xl font-bold text-foreground">Office TTD</h1>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Select Module:</label>
            <select className="px-3 py-1.5 border border-input bg-card text-foreground text-sm rounded">
              <option>Office TTD</option>
              <option>Opportunities</option>
              <option>Purchase Orders</option>
            </select>
          </div>
        </div>
        <a href="#" className="text-sm text-primary hover:underline">(Refresh)</a>
      </div>

      {/* Table Container */}
      <div className="border border-border rounded bg-card overflow-hidden">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Sort</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Date (mm/dd/yyyy)</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Contents</th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">Owner</th>
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
                  <td className="px-3 py-2 text-muted-foreground text-xs whitespace-nowrap font-medium">{item.date}</td>
                  <td className="px-3 py-2 text-foreground text-xs sm:text-sm">
                    {item.contents[0]}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground text-xs">{item.owner}</td>
                </tr>

                {/* Expanded Content Row */}
                {expandedRows.has(item.id) && (
                  <tr className="border-b border-border bg-yellow-50">
                    <td colSpan={4} className="px-3 py-3">
                      <div className="space-y-1 text-xs sm:text-sm">
                        {item.contents.map((content, i) => (
                          <div 
                            key={i} 
                            className={i === 0 ? 'font-medium text-foreground' : 'text-muted-foreground ml-4'}
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
