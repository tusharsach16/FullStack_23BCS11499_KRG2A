"use client"

export function BookingConfirmation({
  doctor,
  date,
  time,
  patient,
  onBookAgain,
}: {
  doctor: any
  date: string
  time: string
  patient: any
  onBookAgain: () => void
}) {
  const confirmationId = `APP${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-scale-in">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4 animate-slide-in-down">
            <svg
              className="h-12 w-12 text-green-600 animate-pulse-subtle"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-foreground">Booking Confirmed!</h2>
        <p className="text-lg text-muted-foreground">Your appointment has been successfully scheduled</p>
      </div>

      <div className="space-y-6 rounded-xl bg-white p-8 shadow-lg border-2 border-border animate-slide-in-up">
        <div className="space-y-4">
          <div className="text-center pb-4 border-b-2 border-border">
            <p className="text-sm text-muted-foreground">Confirmation ID</p>
            <p className="text-2xl font-bold text-primary">{confirmationId}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
              <p className="text-sm text-muted-foreground">Doctor</p>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{doctor.avatar}</span>
                <div>
                  <p className="font-bold text-foreground">{doctor.name}</p>
                  <p className="text-sm text-accent">{doctor.specialty}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.15s" }}>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="text-2xl font-bold text-foreground">{date}</p>
              <p className="text-xl text-primary font-semibold">{time}</p>
            </div>

            <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-sm text-muted-foreground">Patient Name</p>
              <p className="font-bold text-foreground">{patient.fullName}</p>
            </div>

            <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.25s" }}>
              <p className="text-sm text-muted-foreground">Contact</p>
              <p className="font-bold text-foreground">{patient.email}</p>
              <p className="font-bold text-foreground">{patient.phone}</p>
            </div>

            {patient.bloodType && (
              <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
                <p className="text-sm text-muted-foreground">Blood Type</p>
                <p className="font-bold text-foreground">{patient.bloodType}</p>
              </div>
            )}

            {patient.allergies && (
              <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.35s" }}>
                <p className="text-sm text-muted-foreground">Allergies</p>
                <p className="font-bold text-foreground">{patient.allergies}</p>
              </div>
            )}
          </div>
        </div>

        <div
          className="rounded-lg bg-blue-50 p-4 border-l-4 border-primary animate-slide-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-sm text-foreground">
            <span className="font-bold">📋 Reminder:</span> Please arrive 10 minutes before your appointment. Bring your
            ID and insurance card.
          </p>
        </div>
      </div>

      <div className="flex gap-4 animate-slide-in-up" style={{ animationDelay: "0.45s" }}>
        <button
          onClick={onBookAgain}
          className="flex-1 rounded-lg border-2 border-primary px-6 py-4 text-lg font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all transform hover:scale-105"
        >
          Book Another Appointment
        </button>
        <button className="flex-1 rounded-lg bg-primary px-6 py-4 text-lg font-bold text-primary-foreground hover:shadow-lg transition-all transform hover:scale-105">
          Download Confirmation
        </button>
      </div>
    </div>
  )
}
