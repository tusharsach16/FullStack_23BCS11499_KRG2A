"use client"

import { useState } from "react"

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
]

const dates = ["Mon, Dec 11", "Tue, Dec 12", "Wed, Dec 13", "Thu, Dec 14", "Fri, Dec 15"]

export function TimeSlotSelector({
  doctor,
  onSelect,
  onBack,
}: {
  doctor: any
  onSelect: (date: string, time: string) => void
  onBack: () => void
}) {
  const [selectedDate, setSelectedDate] = useState<string>(dates[0])
  const [selectedTime, setSelectedTime] = useState<string>("")

  const handleConfirm = () => {
    if (selectedTime) {
      onSelect(selectedDate, selectedTime)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-slide-in-up">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="rounded-lg border-2 border-border px-4 py-2 text-foreground hover:bg-muted transition-colors"
          >
            ← Back
          </button>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground">Book with {doctor.name}</h2>
            <p className="text-muted-foreground">{doctor.specialty}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Select Date</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {dates.map((date, index) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`rounded-lg border-2 px-4 py-3 font-medium transition-all transform hover:scale-105 ${
                selectedDate === date
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-white text-foreground hover:border-primary"
              }`}
              style={{
                animation: `slideInUp 0.5s ease-out ${0.15 + index * 0.1}s both`,
              }}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Select Time</h3>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
          {timeSlots.map((time, index) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`rounded-lg border-2 px-3 py-3 font-medium transition-all transform hover:scale-105 ${
                selectedTime === time
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-white text-foreground hover:border-accent"
              }`}
              style={{
                animation: `slideInUp 0.5s ease-out ${0.2 + index * 0.05}s both`,
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={!selectedTime}
        className="w-full rounded-lg bg-primary px-6 py-4 text-lg font-bold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all transform hover:scale-105 animate-slide-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        Continue to Patient Details
      </button>
    </div>
  )
}
