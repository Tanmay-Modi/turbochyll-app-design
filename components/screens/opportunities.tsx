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
    asr: '',
    contents: ['Animal Feed Storage Room', '7/2 - Ricky set up site visit for Tuesday 7/5 to look at this room.', 'DI Water Various Upgrades', '7/2 - Ricky is working on a Quote for (3) Tech Specs for repairs.'],
    date: '07/02/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: true
  },
  {
    id: '2',
    name: 'Lockheed Martin',
    asr: '',
    contents: ['Brian Kenny - LIFON - Catholic Health & other Ops', '6/30 - Ricky is waiting for copy of quote for repairs, Brian Kenny to get pricing'],
    date: '07/02/2026',
    owner: 'ricky / AL',
    pic: true,
    doc: true
  },
  {
    id: '3',
    name: 'Brian Kenny',
    asr: '',
    contents: ['Brian Kenny - LIFON - Catholic Health & other Ops', '6/26 - Sean told Ricky to remind him to follow up with Brian Kenny on July 15.'],
    date: '06/26/2026',
    owner: 'ricky / AL',
    pic: false,
    doc: true
  },
]

export function OpportunitiesScreen({ params }: ScreenProps) {
  const [data, setData] = useState<Opportunity[]>(mockData)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Opportunity>>({})

  const handleEdit = (item: Opportunity) => {
    setEditingId(item.id)
    setEditForm({ ...item })
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
    <div className="w-full h-full overflow-auto bg-background p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Opportunities</h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Manage and track business opportunities</p>
          <button className="px-4 py-2 bg-primary text-card text-sm font-medium rounded hover:bg-primary/90">
            + New Opportunity
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <div key={item.id} className="border border-border rounded-lg bg-card overflow-hidden">
            {/* Card Header */}
            <div 
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b border-border"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm break-words">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.contents[0]}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {item.pic && <button className="text-lg hover:scale-110" title="Picture">📷</button>}
                  {item.doc && <button className="text-lg hover:scale-110" title="Document">📄</button>}
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{item.date}</span>
                <span>{item.owner}</span>
              </div>
            </div>

            {/* Card Actions */}
            <div className="px-4 py-2 bg-muted/30 flex gap-2 flex-wrap border-b border-border">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 min-w-[80px] px-2 py-1.5 text-xs font-medium bg-primary text-card rounded hover:bg-primary/90"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex-1 min-w-[80px] px-2 py-1.5 text-xs font-medium border border-input text-foreground rounded hover:bg-muted"
              >
                Delete
              </button>
              <button
                onClick={() => handleArchive(item.id)}
                className="flex-1 min-w-[80px] px-2 py-1.5 text-xs font-medium border border-input text-foreground rounded hover:bg-muted"
              >
                Archive
              </button>
            </div>

            {/* Expanded Content */}
            {expandedId === item.id && !editingId && (
              <div className="px-4 py-3 bg-yellow-50 space-y-1 text-xs border-t border-border">
                {item.contents.map((content, i) => (
                  <p key={i} className={i === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                    {content}
                  </p>
                ))}
              </div>
            )}

            {/* Edit Form */}
            {editingId === item.id && (
              <div className="px-4 py-4 bg-blue-50 space-y-3 border-t border-border text-xs">
                <div>
                  <label className="font-medium text-foreground block mb-1">Name</label>
                  <input 
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-2 py-1.5 border border-input rounded text-xs"
                  />
                </div>
                <div>
                  <label className="font-medium text-foreground block mb-1">ASR</label>
                  <input 
                    type="text"
                    value={editForm.asr || ''}
                    onChange={(e) => setEditForm({ ...editForm, asr: e.target.value })}
                    className="w-full px-2 py-1.5 border border-input rounded text-xs"
                  />
                </div>
                <div>
                  <label className="font-medium text-foreground block mb-1">Owner</label>
                  <input 
                    type="text"
                    value={editForm.owner || ''}
                    onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })}
                    className="w-full px-2 py-1.5 border border-input rounded text-xs"
                  />
                </div>
                <div>
                  <label className="font-medium text-foreground block mb-1">Date</label>
                  <input 
                    type="text"
                    value={editForm.date || ''}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    className="w-full px-2 py-1.5 border border-input rounded text-xs"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-3 py-1.5 border border-input text-foreground text-xs font-medium rounded hover:bg-muted"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block border border-border rounded-lg bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-foreground w-8">#</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground min-w-[200px]">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground min-w-[100px]">ASR</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground flex-1">Contents</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground min-w-[120px]">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground min-w-[120px]">Owner</th>
              <th className="px-4 py-3 text-center font-semibold text-foreground w-10">Pic</th>
              <th className="px-4 py-3 text-center font-semibold text-foreground w-10">Doc</th>
              <th className="px-4 py-3 text-center font-semibold text-foreground min-w-[150px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tbody key={item.id}>
                {/* Main Row */}
                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-center">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="text-foreground hover:underline text-left font-medium"
                    >
                      {item.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {editingId === item.id ? (
                      <input 
                        type="text"
                        value={editForm.asr || ''}
                        onChange={(e) => setEditForm({ ...editForm, asr: e.target.value })}
                        className="w-full px-2 py-1 border border-input rounded text-xs"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      item.asr || '-'
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs line-clamp-2">
                    {item.contents[0]}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {editingId === item.id ? (
                      <input 
                        type="text"
                        value={editForm.date || ''}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="w-full px-2 py-1 border border-input rounded text-xs"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      item.date
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {editingId === item.id ? (
                      <input 
                        type="text"
                        value={editForm.owner || ''}
                        onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })}
                        className="w-full px-2 py-1 border border-input rounded text-xs"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      item.owner
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.pic && (
                      <button className="text-lg hover:scale-110" title="Upload Picture">
                        📷
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.doc && (
                      <button className="text-lg hover:scale-110" title="Upload Document">
                        📄
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5 justify-center">
                      {editingId === item.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="px-2 py-1 text-xs font-medium bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-2 py-1 text-xs font-medium border border-input rounded hover:bg-muted"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-2 py-1 text-xs font-medium bg-primary text-card rounded hover:bg-primary/90"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-2 py-1 text-xs font-medium border border-input rounded hover:bg-muted"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleArchive(item.id)}
                            className="px-2 py-1 text-xs font-medium border border-input rounded hover:bg-muted"
                          >
                            Archive
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {expandedId === item.id && editingId !== item.id && (
                  <tr className="bg-yellow-50 border-b border-border">
                    <td colSpan={9} className="px-4 py-3">
                      <div className="space-y-1 text-xs">
                        {item.contents.map((content, i) => (
                          <p key={i} className={i === 0 ? 'font-medium text-foreground' : 'text-muted-foreground'}>
                            {content}
                          </p>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No opportunities found</p>
        </div>
      )}
    </div>
  )
}
