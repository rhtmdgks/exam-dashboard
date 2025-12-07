import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconClock } from '@tabler/icons-react'

function ClockCard() {
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const koreaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }))
      
      setCurrentDate(koreaTime.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }))
      
      setCurrentTime(koreaTime.toLocaleTimeString('ko-KR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium">현재 시간</CardTitle>
        <IconClock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-start pt-8">
        <div className="text-7xl sm:text-8xl md:text-9xl font-bold tabular-nums mb-4" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>{currentTime}</div>
        <p className="text-sm sm:text-base text-muted-foreground text-center">{currentDate}</p>
      </CardContent>
    </Card>
  )
}

export default ClockCard
