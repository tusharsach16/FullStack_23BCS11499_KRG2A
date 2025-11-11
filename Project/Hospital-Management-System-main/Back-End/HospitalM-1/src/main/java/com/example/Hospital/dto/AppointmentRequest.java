package com.example.Hospital.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequest {
    private Long doctorId;
    private String patientEmail;
    private String appointmentDate;  // e.g., "2024-01-15"
    private String appointmentTime;  // e.g., "14:30"
}