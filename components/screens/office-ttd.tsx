'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, X, RefreshCw } from 'lucide-react'
import type { ScreenProps } from './registry'

interface TTDItem {
  id: string
  date: string
  contents: string
  owner: string
}

const SAMPLE_DATA: TTDItem[] = [
  {
    id: '1',
    date: '12/12/2025',
    contents: 'Baskets Received - 2025\n-A&R Electric\n-DVM\n-Johnstone\n-RightClick\n-Brooklyn Fan',
    owner: 'Amanda'
  },
  {
    id: '2',
    date: '01/24/2025',
    contents: 'Donation to St. Joseph of Yorkville for Vito\'s wife\nAmanda sent email to school asking the best way to go about donations\n1/31 sending out donation of $3,000.00',
    owner: 'Al/Amanda/Sean'
  },
  {
    id: '3',
    date: '12/05/2024',
    contents: 'Baskets - 2024 Received from the Following Subs\n-A&R Electric\n-DVM\n-Project\n-RightClick\n-Johnstone\n-TechRiver',
    owner: 'Office'
  }
]

export function OfficeTTDScreen(props: ScreenProps) {
  const [items, setItems] = useState<TTDItem[]>(SAMPLE_DATA)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    date: '',
    contents: '',
    owner: ''
  })

  const handleOpenCreate = () => {
    setEditingId(null)
    setFormData({ date: '', contents: '', owner: '' })
    setShowForm(true)
  }

  const handleOpenEdit = (item: TTDItem) => {
    setEditingId(item.id)
    setFormData({
      date: item.date,
      contents: item.contents,
      owner: item.owner
    })
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ date: '', contents: '', owner: '' })
  }

  const handleSubmit = () => {
    if (!formData.date || !formData.contents || !formData.owner) return

    if (editingId) {
      setItems(items.map(item =>
        item.id === editingId ? { ...item, ...formData } : item
      ))
    } else {
      const newItem: TTDItem = {
        id: Date.now().toString(),
        ...formData
      }
      setItems([newItem, ...items])
    }
    handleCloseForm()
  }

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleRefresh = () => {
    setItems([...SAMPLE_DATA])
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, date: e.target.value })
  }

  const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, contents: e.target.value })
  }

  const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, owner: e.target.value })
  }

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-none border-b border-border px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Office TTD</h1>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:flex flex-1 overflow-auto">
        <div className="w-full">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-muted">
              <tr className="border-b border-border">
                <th className="border-r border-border p-3 text-left font-semibold w-8">
                  <input type="checkbox" className="cursor-pointer" />
                </th>
                <th className="border-r border-border p-3 text-left font-semibold w-32">Date</th>
                <th className="border-r border-border p-3 text-left font-semibold flex-1">Contents</th>
                <th className="border-r border-border p-3 text-left font-semibold w-32">Owner</th>
                <th className="p-3 text-center font-semibold w-20">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`border-b border-border hover:bg-muted/50 transition-colors ${
                    idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  }`}
                >
                  <td className="border-r border-border p-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="border-r border-border p-3 text-primary font-medium cursor-pointer hover:underline">
                    {item.date}
                  </td>
                  <td className="border-r border-border p-3 whitespace-pre-wrap max-w-md">{item.contents}</td>
                  <td className="border-r border-border p-3">{item.owner}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 hover:bg-primary/10 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4 text-primary" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 hover:bg-destructive/10 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex-1 overflow-auto">
        <div className="p-3 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-border rounded-lg bg-card p-3 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="cursor-pointer mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-primary font-semibold text-sm">{item.date}</div>
                    <div className="text-foreground text-xs whitespace-pre-wrap mt-1">{item.contents}</div>
                    <div className="text-muted-foreground text-xs mt-2">Owner: {item.owner}</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2 border-t border-border">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 hover:bg-primary/10 rounded text-primary text-xs font-medium transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 hover:bg-destructive/10 rounded text-destructive text-xs font-medium transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Form Dialog */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                {editingId ? 'Edit TTD Item' : 'Create New TTD Item'}
              </h2>
              <button
                onClick={handleCloseForm}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  value={formData.date}
                  onChange={handleDateChange}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Contents</label>
                <textarea
                  placeholder="Describe the task or item..."
                  value={formData.contents}
                  onChange={handleContentsChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Owner</label>
                <input
                  type="text"
                  placeholder="Owner name"
                  value={formData.owner}
                  onChange={handleOwnerChange}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="flex gap-2 p-4 border-t border-border">
              <button
                onClick={handleCloseForm}
                className="flex-1 px-4 py-2 border border-input text-foreground text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.date || !formData.contents || !formData.owner}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
