import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { IconUserX, IconPlus, IconX } from '@tabler/icons-react'

function AbsentListCard({ absentStudents, onRemoveAbsentStudent, onOpenAbsentModal }) {
  const reasonColors = {
    '질병': 'bg-primary/10 text-primary border-primary/20',
    '미인정': 'bg-destructive/10 text-destructive border-destructive/20',
    '인정': 'bg-primary/20 text-primary border-primary/30',
    '기타': 'bg-muted text-muted-foreground border-border'
  }

  return (
    <Card>
      <CardHeader className="pb-1 pt-2 px-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm leading-none mb-1">
              <IconUserX className="h-4 w-4" />
              결시자 명단
            </CardTitle>
            <CardDescription className="text-xs leading-tight">
              {absentStudents.length > 0 
                ? `총 ${absentStudents.length}명 결시`
                : '등록된 결시자가 없습니다'
              }
            </CardDescription>
          </div>
          <Button size="sm" onClick={onOpenAbsentModal} className="h-7 text-xs px-2">
            <IconPlus className="h-3 w-3 mr-1" />
            등록
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-1 px-3">
        {absentStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <div className="rounded-full bg-muted p-2 mb-1">
              <IconUserX className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground leading-tight">결시자가 없습니다</p>
            <Button variant="link" size="sm" onClick={onOpenAbsentModal} className="text-xs h-6 p-0">
              결시자 등록하기
            </Button>
          </div>
        ) : (
          <div className="space-y-0 max-h-28 overflow-y-auto">
            {absentStudents.map((student, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted font-semibold text-xs">
                      {student.number}
                    </div>
                    <p className="font-medium text-sm leading-none">{student.number}번</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className={`text-xs h-5 px-2 ${reasonColors[student.reason]}`}>
                      {student.reason}
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-5 w-5 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemoveAbsentStudent(i)}
                    >
                      <IconX className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {i < absentStudents.length - 1 && <Separator className="my-0" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AbsentListCard
