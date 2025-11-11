package com.example.Hospital.impl;

import com.example.Hospital.entity.Appointment;
import com.example.Hospital.entity.MedicalRecord;
import com.example.Hospital.repo.AppointmentRepo;
import com.example.Hospital.repo.MedicalRecordRepo;
import com.example.Hospital.service.MedicalRecordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final MedicalRecordRepo medicalRecordRepo;

    public MedicalRecordServiceImpl(MedicalRecordRepo medicalRecordRepo) {
        this.medicalRecordRepo = medicalRecordRepo;
    }

    @Autowired
    private AppointmentRepo appointmentRepo;
    
    @Override
    public MedicalRecord addRecord(Long appointmentId, String diagnosis, String prescription, String notes) {
        Appointment appointment = appointmentRepo.findById(appointmentId)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
    
        MedicalRecord record = new MedicalRecord();
        record.setAppointment(appointment);
        record.setDiagnosis(diagnosis);
        record.setPrescription(prescription);
        record.setNotes(notes);
    
        return medicalRecordRepo.save(record);
    }

    @Override
    public List<MedicalRecord> getRecordsByPatient(Long patientId) {
        return medicalRecordRepo.findByAppointment_Patient_Id(patientId);
    }
}
