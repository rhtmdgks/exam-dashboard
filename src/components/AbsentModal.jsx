import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IconUserX, IconVirus, IconX, IconCheck, IconQuestionMark } from '@tabler/icons-react'

const reasons = [
  { label: '질병', icon: IconVirus, color: 'bg-blue-500 hover:bg-blue-600' },
  { label: '미인정', icon: IconX, color: 'bg-red-500 hover:bg-red-600' },
  { label: '인정', icon: IconCheck, color: 'bg-emerald-500 hover:bg-emerald-600' },
  { label: '기타', icon: IconQuestionMark, color: 'bg-gray-500 hover:bg-gray-600' },
]

function AbsentModal({ missingNumbers, absentStudents, onClose, onAddAbsent }) {
  const [selectedNum, setSelectedNum] = useState(null)

  const handleReason = (reason) => {
    if (!selectedNum) return alert('번호를 먼저 선택하세요')
    onAddAbsent(selectedNum, reason)
    setSelectedNum(null)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <IconUserX className="h-5 w-5" />
            결시자 등록
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            번호를 선택한 후 사유를 선택하세요.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 py-4 overflow-y-auto">
          {/* 번호 선택 */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">1단계</Badge>
              <span className="text-xs sm:text-sm font-medium">번호 선택</span>
            </div>
            <Card className="p-2 sm:p-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 sm:gap-2">
                {Array.from({ length: 36 }, (_, i) => i + 1).map(num => {
                  const isMissing = missingNumbers.includes(num)
                  const isAbsent = absentStudents.some(s => parseInt(s.number) === num)
                  const isSelected = selectedNum === num

                  let variant = 'outline'
                  let className = 'h-9 sm:h-11 text-xs sm:text-sm font-semibold'

                  if (isMissing) {
                    className += ' opacity-30 cursor-not-allowed'
                  } else if (isSelected) {
                    variant = 'default'
                  } else if (isAbsent) {
                    className += ' bg-red-100 border-red-300 text-red-700'
                  }

                  return (
                    <Button
                      key={num}
                      size="sm"
                      variant={variant}
                      disabled={isMissing}
                      onClick={() => !isAbsent && setSelectedNum(num)}
                      className={className}
                    >
                      {num}
                    </Button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* 사유 선택 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">2단계</Badge>
              <span className="text-xs sm:text-sm font-medium">사유 선택</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {reasons.map(({ label, icon: Icon, color }) => (
                <Button
                  key={label}
                  variant="secondary"
                  className={`h-12 sm:h-14 justify-start gap-2 sm:gap-3 text-sm sm:text-base font-medium ${selectedNum ? color + ' text-white' : ''}`}
                  disabled={!selectedNum}
                  onClick={() => handleReason(label)}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  {label}
                </Button>
              ))}
            </div>
            
            <Separator className="my-3 sm:my-4" />
            
            {selectedNum ? (
              <Card className="p-3 sm:p-4 bg-primary/5 border-primary/20">
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">선택된 번호</p>
                <Badge className="text-sm sm:text-lg px-2 sm:px-3 py-0.5 sm:py-1">{selectedNum}번</Badge>
              </Card>
            ) : (
              <Card className="p-3 sm:p-4 bg-muted/50">
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  번호를 선택하세요
                </p>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AbsentModal
