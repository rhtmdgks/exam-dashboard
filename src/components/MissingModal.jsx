import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { IconUserMinus } from '@tabler/icons-react'

function MissingModal({ missingNumbers, onClose, onSave }) {
  const [selected, setSelected] = useState([...missingNumbers])

  const toggle = (num) => {
    setSelected(prev => 
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    )
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <IconUserMinus className="h-5 w-5" />
            결번 선택
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            학급에 없는 번호를 선택하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 sm:gap-2 py-4 max-h-[50vh] overflow-y-auto">
          {Array.from({ length: 36 }, (_, i) => i + 1).map(num => (
            <Button
              key={num}
              size="sm"
              variant={selected.includes(num) ? 'default' : 'outline'}
              onClick={() => toggle(num)}
              className="h-9 sm:h-10 text-xs sm:text-sm font-semibold"
            >
              {num}
            </Button>
          ))}
        </div>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 p-2 sm:p-3 bg-muted rounded-lg">
            <span className="text-xs sm:text-sm text-muted-foreground mr-1 sm:mr-2">선택됨:</span>
            {selected.sort((a, b) => a - b).map(num => (
              <Badge key={num} variant="secondary" className="text-xs">{num}번</Badge>
            ))}
          </div>
        )}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="text-sm">취소</Button>
          <Button onClick={() => onSave(selected.sort((a, b) => a - b))} className="text-sm">확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MissingModal
