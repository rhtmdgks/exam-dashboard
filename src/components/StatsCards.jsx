import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconUsers, IconUserCheck, IconUserX, IconPlus, IconMinus } from '@tabler/icons-react'

function StatCard({ title, value, subtitle, icon: Icon, trend, onClick, onIncrement, onDecrement }) {
  return (
    <Card className={onClick ? 'cursor-pointer hover:bg-accent/50 transition-colors' : ''} onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-2 px-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-2 pt-1 px-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="text-3xl font-bold leading-none">{value}</div>
            {subtitle && <p className="text-xs text-muted-foreground truncate leading-tight mt-1">{subtitle}</p>}
            {trend && (
              <p className={`text-xs truncate leading-tight mt-1 ${trend.type === 'up' ? 'text-primary' : trend.type === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                {trend.text}
              </p>
            )}
          </div>
          {(onIncrement || onDecrement) && (
            <div className="flex flex-col gap-1 ml-2">
              <Button size="icon" variant="outline" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onIncrement?.() }}>
                <IconPlus className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="outline" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onDecrement?.() }}>
                <IconMinus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function StatsCards({
  totalStudents,
  presentStudents,
  absentCount,
  onChangeTotalStudents,
  onChangePresentStudents,
  onOpenTotalModal,
  onOpenAbsentModal
}) {
  const attendanceRate = totalStudents > 0 ? ((presentStudents / totalStudents) * 100).toFixed(1) : 0

  return (
    <>
      <StatCard
        title="재적 인원"
        value={totalStudents}
        subtitle="클릭하여 수정"
        icon={IconUsers}
        onClick={onOpenTotalModal}
        onIncrement={() => onChangeTotalStudents(1)}
        onDecrement={() => onChangeTotalStudents(-1)}
      />
      <StatCard
        title="응시 인원"
        value={presentStudents}
        trend={{ type: 'up', text: `출석률 ${attendanceRate}%` }}
        icon={IconUserCheck}
        onIncrement={() => onChangePresentStudents(1)}
        onDecrement={() => onChangePresentStudents(-1)}
      />
      <StatCard
        title="결시"
        value={absentCount}
        trend={absentCount > 0 ? { type: 'down', text: `${absentCount}명 결시` } : undefined}
        icon={IconUserX}
        onClick={onOpenAbsentModal}
      />
    </>
  )
}

export default StatsCards
