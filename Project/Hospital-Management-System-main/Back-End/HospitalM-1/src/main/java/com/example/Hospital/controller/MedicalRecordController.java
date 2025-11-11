package com.example.Hospital.controller;

import com.example.Hospital.dto.MedicalRecordDTO;
import com.example.Hospital.entity.MedicalRecord;
import com.example.Hospital.response.ApiResponse;
import com.example.Hospital.service.MedicalRecordService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin(origins = "*")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MedicalRecord>> addRecord(@RequestBody MedicalRecordDTO dto) {
    
        MedicalRecord saved = medicalRecordService.addRecord(
                dto.getAppointmentId(),
                dto.getDiagnosis(),
                dto.getPrescription(),
                dto.getNotes()
        );
    
        ApiResponse<MedicalRecord> api = new ApiResponse<>(true, "Medical record added", saved);
        return ResponseEntity.ok(api);
    }
    

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<com.example.Hospital.response.ApiResponse<List<MedicalRecord>>> getByPatient(@PathVariable Long patientId) {
        List<MedicalRecord> list = medicalRecordService.getRecordsByPatient(patientId);
        com.example.Hospital.response.ApiResponse<List<MedicalRecord>> api = new com.example.Hospital.response.ApiResponse<>(true, "Medical records retrieved", list);
        return ResponseEntity.ok(api);
    }
}
