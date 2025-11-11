package com.example.Hospital.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointments")

public class Appointment {

    public enum AppointmentStatus {
        SCHEDULED,
        CANCELLED,
        COMPLETED,
        PENDING
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    @ManyToOne(fetch = FetchType.EAGER)  
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonIgnoreProperties({"password", "email"}) 
    private Patient patient;

    @ManyToOne(fetch = FetchType.EAGER)  
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonIgnoreProperties({"password"})  
    private Doctor doctor;

    @Column(nullable = false)
    private LocalDateTime appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status;
}
