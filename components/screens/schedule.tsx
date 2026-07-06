'use client'

import { useState, useMemo } from 'react'
import { Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react'
import { AppHeader, ScrollArea, Card } from '@/components/app/shell'
import { StatusChip } from '@/components/app/status-chip'
import type { ScreenProps } from './registry'

interface ScheduleItem {
  id: string
  technician: string
  location: string
  quoteNumber: string
  sarNumber?: string
  marNumber?: string
  service: string
  hours: number
  hoursType: 'ST' | 'OT'
  status: string
  date: string
  color?: string
}

const SCHEDULE_DATA: ScheduleItem[] = [
  {
    id: '1',
    technician: 'Christopher Bryan',
    location: 'DVM - Gotham Health - Ridgewood Clinic',
    quoteNumber: 'TAM#6230',
    sarNumber: 'SAR',
    service: 'continue repairs',
    hours: 6.92,
    hoursType: 'ST',
    status: 'Active',
    date: '2026-07-06',
    color: 'bg-yellow-100'
  },
  {
    id: '2',
    technician: 'Christopher Francois',
    location: 'Wyckoff Hospital-374 Stockholm St - Quote #12862',
    sarNumber: 'SAR',
    marNumber: 'MAR',
    service: 'Maintenance',
    hours: 50.00,
    hoursType: 'ST',
    status: 'Active',
    date: '2026-07-06',
    color: 'bg-white'
  },
  {
    id: '3',
    technician: "Collin O'Donnell",
    location: "Wyckoff Hospital-374 Stockholm St - Quote #12862",
    sarNumber: 'SAR',
    marNumber: 'MAR',
    service: 'Maintenance',
    hours: 58.00,
    hoursType: 'ST',
    status: 'Active',
    date: '2026-07-06',
    color: 'bg-white'
  },
  {
    id: '4',
    technician: 'Draniel Ramirez',
    location: "Wyckoff Hospital-374 Stockholm St - Quote #12862",
    sarNumber: 'SAR',
    marNumber: 'MAR',
    service: 'Maintenance',
    hours: 58.00,
    hoursType: 'ST',
    status: 'Active',
    date: '2026-07-06',
    color: 'bg-white'
  },
  {
    id: '5',
    technician: 'Juan Aucapachgui',
    location: "CUNY - 85 St. Nicholas Terrace - Quote #12558",
    sarNumber: 'SAR',
    marNumber: 'MAR',
    service: 'Maintenance',
    hours: 40.00,
    hoursType: 'ST',
    status: 'Active',
    date: '2026-07-06',
    color: 'bg-white'
  },
  {
    id: '6',
    technician: 'Loyd Lall',
    location: 'NY Methodist - TAM#6280',
    sarNumber: 'SAR',
    service: 'Go to Trame, Bikyn pick up PO# 12131. Endoscopy unit compressor replacement',
    hours: 0,
    hoursType: 'ST',
    status: 'Planned',
    date: '2026-07-06',
    color: 'bg-white'
  },
  {
    id: '7',
    technician: 'Lucas Stauffiger',
    location: 'DVM - Kings County Hospital - TAM#6285',
    sarNumber: '',
    service: 'SOB disconnect',
    hours: 7.0,
    hoursType: 'OT',
    status: 'On Schedule',
    date: '2026-07-06',
    color: 'bg-white'
  },
  {
    id: '8',
    technician: 'Michael Lewis',
    location: 'Pto - Planned - TAM#6160',
    sarNumber: 'SAR',
    service: 'Planned PTO',
    hours: 0,
    hoursType: 'ST',
    status: 'PTO',
    date: '2026-07-06',
    color: 'bg-white'
  }
]

export function ScheduleScreen(props: ScreenProps) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 1))
  const [expandedDate, setExpandedDate] = useState<string | null>(null)

  const handleEditClick = () => {
    setShowCalendar(false)
    setPasswordInput('')
  }

  const handlePasswordSubmit = () => {
    if (passwordInput === '1234') {
      setShowCalendar(true)
    }
  }

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const monthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: i + 1,
    fullDate: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  }))

  const getScheduleForDate = (day: number) => {
    const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      .toISOString()
      .split('T')[0]
    return SCHEDULE_DATA.filter(item => item.date === dateStr)
  }

  const todaySchedule = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return SCHEDULE_DATA.filter(item => item.date === today)
  }, [])

  return (
    <div className="flex flex-col h-full w-full bg-background">
      <AppHeader title="Schedule" />

      <ScrollArea className="flex-1 w-full">
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Default View - Today's Schedule */}
          {!showCalendar && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Date:</p>
                  <p className="text-lg font-semibold text-foreground">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </p>
                </div>
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Schedule: {todaySchedule.length > 0 ? 'Active' : 'Empty'}</p>

                <Card className="p-4 space-y-3">
                  {todaySchedule.length > 0 ? (
                    todaySchedule.map(item => (
                      <div key={item.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-foreground">{item.technician}</p>
                            <p className="text-xs text-muted-foreground">{item.location}</p>
                          </div>
                          <div className="flex gap-1.5 flex-wrap justify-end">
                            {item.sarNumber && (
                              <a href="#" className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded font-semibold hover:bg-destructive/20">
                                {item.sarNumber}
                              </a>
                            )}
                            {item.marNumber && (
                              <a href="#" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold hover:bg-blue-200">
                                {item.marNumber}
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-muted-foreground">{item.service}</p>
                          {item.hours > 0 && (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-semibold whitespace-nowrap">
                              {item.hours.toFixed(2)} hrs
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground py-4">No scheduled items for today</p>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* Password Protection Dialog */}
          {!showCalendar && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 md:hidden">
              <Card className="w-80 p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Enter Password</h2>
                    <p className="text-sm text-muted-foreground">To view calendar schedule</p>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Password"
                      className="w-full px-3 py-2 border border-input rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePasswordSubmit}
                      disabled={!passwordInput}
                      className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded hover:bg-primary/90 disabled:opacity-50"
                    >
                      View Calendar
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Calendar View */}
          {showCalendar && (
            <div className="space-y-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-muted rounded"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <h2 className="text-lg font-semibold text-foreground">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-muted rounded"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Calendar Grid */}
              <Card className="p-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-muted-foreground h-8 flex items-center justify-center">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-16 bg-muted/30 rounded" />
                  ))}

                  {monthDays.map(({ date, fullDate }) => {
                    const daySchedule = getScheduleForDate(date)
                    return (
                      <div
                        key={date}
                        onClick={() => setExpandedDate(expandedDate === date.toString() ? null : date.toString())}
                        className="h-16 border border-border rounded p-1 cursor-pointer hover:bg-muted/50 flex flex-col"
                      >
                        <p className="text-xs font-semibold text-foreground">{date}</p>
                        <div className="flex gap-1 flex-wrap mt-1">
                          {daySchedule.slice(0, 3).map(item => (
                            <div
                              key={item.id}
                              className={`w-2 h-2 rounded-full ${item.hoursType === 'OT' ? 'bg-yellow-400' : 'bg-green-500'}`}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Schedule List */}
              <Card className="p-4 space-y-3">
                <p className="text-sm font-semibold text-foreground">Schedule: Active</p>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {SCHEDULE_DATA.map(item => (
                    <div key={item.id} className={`p-3 rounded border border-border ${item.color || 'bg-white'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-foreground">{item.technician}</p>
                          <p className="text-xs text-muted-foreground">{item.location}</p>
                        </div>
                        <div className="flex gap-1.5 flex-wrap justify-end">
                          {item.sarNumber && (
                            <a href="#" className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded font-semibold hover:bg-destructive/20">
                              {item.sarNumber}
                            </a>
                          )}
                          {item.marNumber && (
                            <a href="#" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-semibold hover:bg-blue-200">
                              {item.marNumber}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">{item.service}</p>
                        {item.hours > 0 && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-semibold whitespace-nowrap">
                            {item.hours.toFixed(2)} hrs
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <button
                onClick={() => setShowCalendar(false)}
                className="w-full px-4 py-2 border border-input text-foreground text-sm font-medium rounded hover:bg-muted"
              >
                Close Calendar
              </button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
