package com.example.Hospital.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Hospital.entity.MedicalRecord;

import java.util.List;

public interface MedicalRecordRepo extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByAppointment_Patient_Id(Long patientId);
}
