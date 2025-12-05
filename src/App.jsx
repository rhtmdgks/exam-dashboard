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
    <div className="min-h-screen bg-muted/40">
      {/* Main Content */}
      <main className="p-2 sm:p-3 md:p-4">
        <div className="max-w-7xl mx-auto space-y-2">
          {/* Top Row: Clock + Schedule */}
          <div className="grid gap-4 md:grid-cols-2">
            <ClockCard />
            <ScheduleCard currentDay={currentDay} onSelectDay={setCurrentDay} />
          </div>

          <Separator />

          {/* Bottom Row: Stats + Absent List */}
          <div className="grid gap-2 sm:gap-3 grid-cols-[repeat(3,minmax(0,1fr))_2fr] md:grid-cols-[repeat(3,minmax(0,140px))_1fr]">
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
