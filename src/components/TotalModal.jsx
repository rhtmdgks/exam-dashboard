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
import { Input } from '@/components/ui/input'
import { IconUsers } from '@tabler/icons-react'

function TotalModal({ totalStudents, onClose, onSave }) {
  const [value, setValue] = useState(totalStudents)

  const handleSave = () => {
    const newVal = parseInt(value)
    if (!isNaN(newVal) && newVal >= 0) {
      onSave(newVal)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconUsers className="h-5 w-5" />
            재적 인원 설정
          </DialogTitle>
          <DialogDescription>
            학급의 총 재적 인원을 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min="0"
            className="text-center text-4xl font-bold h-16"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TotalModal
