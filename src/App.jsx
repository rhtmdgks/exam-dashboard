import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import ClockCard from './components/ClockCard'
import StatsCards from './components/StatsCards'
import ScheduleCard from './components/ScheduleCard'
import AbsentListCard from './components/AbsentListCard'
import TotalModal from './components/TotalModal'
import MissingModal from './components/MissingModal'
import AbsentModal from './components/AbsentModal'

function App() {
  const [currentDay, setCurrentDay] = useState(1)
  const [totalStudents, setTotalStudents] = useState(35)
  const [presentStudents, setPresentStudents] = useState(35)
  const [missingNumbers, setMissingNumbers] = useState([])
  const [absentStudents, setAbsentStudents] = useState([])
  
  const [showTotalModal, setShowTotalModal] = useState(false)
  const [showMissingModal, setShowMissingModal] = useState(false)
  const [showAbsentModal, setShowAbsentModal] = useState(false)

  const absentCount = totalStudents - presentStudents

  const changeTotalStudents = (delta) => {
    const newTotal = Math.max(0, totalStudents + delta)
    setTotalStudents(newTotal)
    if (presentStudents > newTotal) setPresentStudents(newTotal)
  }

  const changePresentStudents = (delta) => {
    setPresentStudents(Math.max(0, Math.min(totalStudents, presentStudents + delta)))
  }

  const removeAbsentStudent = (index) => {
    setAbsentStudents(prev => prev.filter((_, i) => i !== index))
    if (presentStudents < totalStudents) setPresentStudents(prev => prev + 1)
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 sm:h-16 items-center gap-4 px-4 sm:px-6">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-semibold">2025학년도 2학기 기말고사</span>
            <span className="text-xs text-muted-foreground">시험 감독관 대시보드</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Top Row: Clock + Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            <ClockCard />
            <StatsCards
              totalStudents={totalStudents}
              presentStudents={presentStudents}
              absentCount={absentCount}
              missingNumbers={missingNumbers}
              onChangeTotalStudents={changeTotalStudents}
              onChangePresentStudents={changePresentStudents}
              onOpenTotalModal={() => setShowTotalModal(true)}
              onOpenMissingModal={() => setShowMissingModal(true)}
              onOpenAbsentModal={() => setShowAbsentModal(true)}
            />
          </div>

          <Separator />

          {/* Bottom Row: Schedule + Absent List */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <ScheduleCard currentDay={currentDay} onSelectDay={setCurrentDay} />
            </div>
            <AbsentListCard
              absentStudents={absentStudents}
              onRemoveAbsentStudent={removeAbsentStudent}
              onOpenAbsentModal={() => setShowAbsentModal(true)}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      {showTotalModal && (
        <TotalModal
          totalStudents={totalStudents}
          onClose={() => setShowTotalModal(false)}
          onSave={(newTotal) => {
            setTotalStudents(newTotal)
            if (presentStudents > newTotal) setPresentStudents(newTotal)
            setShowTotalModal(false)
          }}
        />
      )}

      {showMissingModal && (
        <MissingModal
          missingNumbers={missingNumbers}
          onClose={() => setShowMissingModal(false)}
          onSave={(numbers) => {
            setMissingNumbers(numbers)
            setShowMissingModal(false)
          }}
        />
      )}

      {showAbsentModal && (
        <AbsentModal
          missingNumbers={missingNumbers}
          absentStudents={absentStudents}
          onClose={() => setShowAbsentModal(false)}
          onAddAbsent={(number, reason) => {
            setAbsentStudents(prev => 
              [...prev, { number: number.toString(), reason }].sort((a, b) => 
                parseInt(a.number) - parseInt(b.number)
              )
            )
            if (presentStudents > 0) setPresentStudents(prev => prev - 1)
          }}
        />
      )}
    </div>
  )
}

export default App
