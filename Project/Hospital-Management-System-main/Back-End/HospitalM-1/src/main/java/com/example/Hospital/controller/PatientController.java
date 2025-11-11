package com.example.Hospital.controller;

import com.example.Hospital.dto.PatientSignupDTO;
import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.entity.Patient;
import com.example.Hospital.response.LoginResponse;
import com.example.Hospital.response.ApiResponse;
import com.example.Hospital.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // Patient Signup (Self Registration)
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<String>> signupPatient(@RequestBody PatientSignupDTO dto) {
        String response = patientService.signupPatient(dto);
        ApiResponse<String> api = new ApiResponse<>(true, "Patient registered successfully", response);
        return ResponseEntity.ok(api);
    }

    // Patient Login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginPatient(@RequestBody LoginDTO loginDTO) {
        LoginResponse response = patientService.loginPatient(loginDTO);
        ApiResponse<LoginResponse> api = new ApiResponse<>(true, response.getMessage(), response);
        return ResponseEntity.ok(api);
    }

    // Admin / Receptionist Add Patient manually
    @PostMapping
    public ResponseEntity<ApiResponse<Patient>> addPatient(@RequestBody Patient patient) {
        Patient saved = patientService.addPatient(patient);
        ApiResponse<Patient> api = new ApiResponse<>(true, "Patient added", saved);
        return ResponseEntity.ok(api);
    }

    // Update Patient (patient can update only themselves — FE will pass same id)
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Patient>> updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        patient.setId(id);
        Patient updated = patientService.updatePatient(patient);
        ApiResponse<Patient> api = new ApiResponse<>(true, "Patient updated", updated);
        return ResponseEntity.ok(api);
    }

    // Delete Patient (patient can delete own account)
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        ApiResponse<Object> api = new ApiResponse<>(true, "Patient deleted", null);
        return ResponseEntity.ok(api);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Patient>>> getAllPatients() {
        List<Patient> list = patientService.getAllPatients();
        ApiResponse<List<Patient>> api = new ApiResponse<>(true, "Patients retrieved", list);
        return ResponseEntity.ok(api);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Patient>> getPatientById(@PathVariable Long id) {
        Patient p = patientService.getPatientById(id);
        ApiResponse<Patient> api = new ApiResponse<>(true, "Patient retrieved", p);
        return ResponseEntity.ok(api);
    }
}
