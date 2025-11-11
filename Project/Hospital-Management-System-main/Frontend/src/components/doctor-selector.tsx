"use client"

import { useState } from "react"

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "12 years",
    rating: 4.8,
    available: true,
    avatar: "👩‍⚕️",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "General Practitioner",
    experience: "8 years",
    rating: 4.9,
    available: true,
    avatar: "👨‍⚕️",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    experience: "10 years",
    rating: 4.7,
    available: true,
    avatar: "👩‍⚕️",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    experience: "15 years",
    rating: 4.9,
    available: true,
    avatar: "👨‍⚕️",
  },
]

export function DoctorSelector({ onSelect }: { onSelect: (doctor: any) => void }) {
  const [hoveredDoctor, setHoveredDoctor] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      <div className="text-center animate-slide-in-up">
        <h2 className="text-4xl font-bold text-foreground mb-3">Select a Doctor</h2>
        <p className="text-lg text-muted-foreground">Choose from our experienced healthcare professionals</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
        {doctors.map((doctor, index) => (
          <div
            key={doctor.id}
            className="group relative cursor-pointer"
            onMouseEnter={() => setHoveredDoctor(doctor.id)}
            onMouseLeave={() => setHoveredDoctor(null)}
            onClick={() => onSelect(doctor)}
            style={{
              animation: `slideInUp 0.5s ease-out ${0.15 + index * 0.1}s both`,
            }}
          >
            <div className="relative h-full rounded-xl border-2 border-transparent bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-accent">
              <div className="mb-4 flex items-start justify-between">
                <div className="text-5xl">{doctor.avatar}</div>
                <div className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground flex items-center gap-1">
                  ⭐ {doctor.rating}
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">{doctor.name}</h3>
              <p className="text-sm font-medium text-accent mb-2">{doctor.specialty}</p>
              <p className="text-xs text-muted-foreground mb-4">{doctor.experience} experience</p>

              <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse-subtle"></span>
                Available Now
              </div>

              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 transition-opacity duration-300 ${
                  hoveredDoctor === doctor.id ? "opacity-100" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
