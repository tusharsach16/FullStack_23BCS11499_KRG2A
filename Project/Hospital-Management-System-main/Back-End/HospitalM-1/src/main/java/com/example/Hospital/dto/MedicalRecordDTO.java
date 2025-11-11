package com.example.Hospital.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MedicalRecordDTO {
    private Long appointmentId;
    private String diagnosis;
    private String prescription;
    private String notes;
}
