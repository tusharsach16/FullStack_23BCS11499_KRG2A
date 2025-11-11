
import { useState } from "react"
import { Header } from "../components/header"
import { DoctorSelector } from "../components/doctor-selector"
import { TimeSlotSelector } from "../components/time-slot-selector"
import { BookingConfirmation } from "../components/booking-confirmation"
import { PatientForm } from "../components/patient-form"

export default function Home() {
  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [patientData, setPatientData] = useState<any>(null)

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor)
    setStep(2)
  }

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
    setStep(3)
  }

  const handlePatientSubmit = (data: any) => {
    setPatientData(data)
    setStep(4)
  }

  const handleBookAgain = () => {
    setStep(1)
    setSelectedDoctor(null)
    setSelectedDate("")
    setSelectedTime("")
    setPatientData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {step === 1 && <DoctorSelector onSelect={handleDoctorSelect} />}
        {step === 2 && selectedDoctor && (
          <TimeSlotSelector doctor={selectedDoctor} onSelect={handleTimeSelect} onBack={() => setStep(1)} />
        )}
        {step === 3 && <PatientForm onSubmit={handlePatientSubmit} onBack={() => setStep(2)} />}
        {step === 4 && patientData && (
          <BookingConfirmation
            doctor={selectedDoctor}
            date={selectedDate}
            time={selectedTime}
            patient={patientData}
            onBookAgain={handleBookAgain}
          />
        )}
      </main>
    </div>
  )
}
