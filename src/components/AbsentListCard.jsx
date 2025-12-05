import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { IconUserX, IconPlus, IconX } from '@tabler/icons-react'

function AbsentListCard({ absentStudents, onRemoveAbsentStudent, onOpenAbsentModal }) {
  const reasonColors = {
    '질병': 'bg-blue-100 text-blue-800 border-blue-200',
    '미인정': 'bg-red-100 text-red-800 border-red-200',
    '인정': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    '기타': 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <IconUserX className="h-4 w-4 sm:h-5 sm:w-5" />
              결시자 명단
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {absentStudents.length > 0 
                ? `총 ${absentStudents.length}명 결시`
                : '등록된 결시자가 없습니다'
              }
            </CardDescription>
          </div>
          <Button size="sm" onClick={onOpenAbsentModal} className="h-8 text-xs sm:text-sm">
            <IconPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            등록
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {absentStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
            <div className="rounded-full bg-muted p-2 sm:p-3 mb-2 sm:mb-3">
              <IconUserX className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">결시자가 없습니다</p>
            <Button variant="link" size="sm" onClick={onOpenAbsentModal} className="text-xs sm:text-sm">
              결시자 등록하기
            </Button>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {absentStudents.map((student, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-1.5 sm:py-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-muted font-semibold text-xs sm:text-sm">
                      {student.number}
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{student.number}번</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Badge variant="outline" className={`text-[10px] sm:text-xs ${reasonColors[student.reason]}`}>
                      {student.reason}
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemoveAbsentStudent(i)}
                    >
                      <IconX className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                {i < absentStudents.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AbsentListCard
