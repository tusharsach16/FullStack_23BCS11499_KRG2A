package com.example.Hospital.service;

import com.example.Hospital.entity.MedicalRecord;
import java.util.List;

public interface MedicalRecordService {
    MedicalRecord addRecord(Long appointmentId, String diagnosis, String prescription, String notes);
    List<MedicalRecord> getRecordsByPatient(Long patientId);
}
