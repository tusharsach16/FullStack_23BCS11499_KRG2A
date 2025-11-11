"use client"

import type React from "react"

import { useState } from "react"

export function PatientForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: any) => void
  onBack: () => void
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    allergies: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.fullName) newErrors.fullName = "Full name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.phone) newErrors.phone = "Phone is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.gender) newErrors.gender = "Gender is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-slide-in-up">
      <div>
        <button
          onClick={onBack}
          className="rounded-lg border-2 border-border px-4 py-2 text-foreground hover:bg-muted transition-colors mb-4"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-foreground">Patient Information</h2>
        <p className="text-muted-foreground">Please provide your details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
            <label className="block text-sm font-medium text-foreground">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition-colors ${
                errors.fullName ? "border-destructive" : "border-input"
              } focus:border-primary`}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
          </div>

          <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.15s" }}>
            <label className="block text-sm font-medium text-foreground">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition-colors ${
                errors.email ? "border-destructive" : "border-input"
              } focus:border-primary`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            <label className="block text-sm font-medium text-foreground">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition-colors ${
                errors.phone ? "border-destructive" : "border-input"
              } focus:border-primary`}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.25s" }}>
            <label className="block text-sm font-medium text-foreground">Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition-colors ${
                errors.dateOfBirth ? "border-destructive" : "border-input"
              } focus:border-primary`}
            />
            {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
          </div>

          <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
            <label className="block text-sm font-medium text-foreground">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full rounded-lg border-2 px-4 py-3 outline-none transition-colors ${
                errors.gender ? "border-destructive" : "border-input"
              } focus:border-primary`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
          </div>

          <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.35s" }}>
            <label className="block text-sm font-medium text-foreground">Blood Type</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-input px-4 py-3 outline-none transition-colors focus:border-primary"
            >
              <option value="">Select Blood Type</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
          <label className="block text-sm font-medium text-foreground">Allergies</label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg border-2 border-input px-4 py-3 outline-none transition-colors focus:border-primary"
            placeholder="List any allergies (optional)"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-6 py-4 text-lg font-bold text-primary-foreground hover:shadow-lg transition-all transform hover:scale-105 animate-slide-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  )
}
