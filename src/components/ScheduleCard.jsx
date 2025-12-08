import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { IconCalendar, IconClock, IconPlayerPlay, IconCheck, IconClockHour3 } from '@tabler/icons-react'

// 시험 날짜: 12월 8일(1일차), 9일(2일차), 10일(3일차), 11일(4일차)
const examDates = {
  1: { month: 12, day: 8 },
  2: { month: 12, day: 9 },
  3: { month: 12, day: 10 },
  4: { month: 12, day: 11 }
}

const scheduleData = {
  1: ['사회문화/생명과학II', '영어II', '지구과학I/영어권문화'],
  2: ['화학II', '일본어I', '세계지리/데이터과학'],
  3: ['기하', '생활과 윤리', '독서', '독서 재시험'],
  4: ['경제', '수학II', '물리학II']
}

const periods = [
  { period: '1교시', prep: '08:45', start: '08:50', end: '09:40' },
  { period: '2교시', prep: '10:05', start: '10:10', end: '11:00' },
  { period: '3교시', prep: '11:25', start: '11:30', end: '12:20' },
  { period: '재시험', prep: '12:20', start: '12:25', end: '12:35' }
]

function ScheduleCard({ currentDay, onSelectDay }) {
  const [, forceUpdate] = useState()

  useEffect(() => {
    const interval = setInterval(() => forceUpdate({}), 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatus = (prep, start, end) => {
    const now = new Date()
    const koreaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }))
    const currentMonth = koreaTime.getMonth() + 1
    const currentDate = koreaTime.getDate()
    const currentMinutes = koreaTime.getHours() * 60 + koreaTime.getMinutes()
    
    const examDate = examDates[currentDay]
    
    if (currentMonth < examDate.month || (currentMonth === examDate.month && currentDate < examDate.day)) {
      return { status: 'scheduled', progress: 0 }
    }
    
    if (currentMonth > examDate.month || (currentMonth === examDate.month && currentDate > examDate.day)) {
      return { status: 'done', progress: 100 }
    }
    
    const toMinutes = (t) => {
      const [h, m] = t.split(':').map(Number)
      return h * 60 + m
    }

    const startMin = toMinutes(start)
    const endMin = toMinutes(end)

    if (currentMinutes > endMin) return { status: 'done', progress: 100 }
    if (currentMinutes >= startMin) {
      const progress = ((currentMinutes - startMin) / (endMin - startMin)) * 100
      return { status: 'active', progress }
    }
    return { status: 'scheduled', progress: 0 }
  }

  const subjects = scheduleData[currentDay] || []

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'done': return <IconCheck className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
      case 'active': return <IconPlayerPlay className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
      case 'scheduled': return <IconClockHour3 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
      default: return <IconClock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
    }
  }

  const StatusBadge = ({ status }) => {
    const variants = {
      done: { variant: 'secondary', text: '종료' },
      active: { variant: 'default', text: '진행중', className: 'bg-emerald-600 hover:bg-emerald-600' },
      scheduled: { variant: 'outline', text: '예정', className: 'border-blue-500 text-blue-600' }
    }
    const config = variants[status] || variants.scheduled
    return <Badge variant={config.variant} className={`text-[10px] sm:text-xs ${config.className || ''}`}>{config.text}</Badge>
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm">
              <IconCalendar className="h-4 w-4" />
              시험 일정
            </CardTitle>
            <CardDescription className="text-xs">12월 {examDates[currentDay]?.day}일 시험 시간표</CardDescription>
          </div>
          <Tabs value={currentDay.toString()} onValueChange={(v) => onSelectDay(parseInt(v))}>
            <TabsList className="h-8 sm:h-9">
              <TabsTrigger value="1" className="text-xs sm:text-sm px-2 sm:px-3">1일차</TabsTrigger>
              <TabsTrigger value="2" className="text-xs sm:text-sm px-2 sm:px-3">2일차</TabsTrigger>
              <TabsTrigger value="3" className="text-xs sm:text-sm px-2 sm:px-3">3일차</TabsTrigger>
              <TabsTrigger value="4" className="text-xs sm:text-sm px-2 sm:px-3">4일차</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {periods.map((item, index) => {
            const { status, progress } = getStatus(item.prep, item.start, item.end)
            const subject = subjects[index] || '-'
            
            // 3일차가 아닌 경우 재시험 교시는 건너뛰기
            if (currentDay !== 3 && item.period === '재시험') return null
            
            // 재시험 교시는 더 작게 표시
            const isRetest = item.period === '재시험'

            return (
              <div
                key={index}
                className={`rounded-lg border transition-all ${
                  isRetest ? 'p-2' : 'p-3 sm:p-4'
                } ${
                  status === 'active' ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' :
                  status === 'scheduled' ? 'border-blue-200 bg-blue-50/30' :
                  status === 'done' ? 'opacity-60' : ''
                }`}
              >
                <div className={`flex items-center justify-between ${isRetest ? 'mb-0' : 'mb-2'}`}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <StatusIcon status={status} />
                    <span className={`font-medium ${isRetest ? 'text-xs' : 'text-sm sm:text-base'}`}>{item.period}</span>
                    <StatusBadge status={status} />
                  </div>
                  <div className={`font-semibold text-muted-foreground text-right ${isRetest ? 'text-sm' : 'text-base sm:text-lg md:text-xl'}`}>
                    <span className="font-mono">{item.start} - {item.end}</span>
                    {!isRetest && <span className="hidden sm:inline ml-2 text-xs font-normal">(준비령 {item.prep})</span>}
                  </div>
                </div>
                <div className={`font-semibold ${isRetest ? 'text-sm inline ml-2' : 'text-base sm:text-lg md:text-xl mb-2'}`}>{subject}</div>
                {status === 'active' && !isRetest && (
                  <Progress value={progress} className="h-1.5 sm:h-2" />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default ScheduleCard
