package com.example.Hospital.controller;

import com.example.Hospital.entity.Doctor;
import com.example.Hospital.service.DoctorService;
import org.springframework.web.bind.annotation.*;
import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.response.ApiResponse;
import com.example.Hospital.response.LoginResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginDoctor(@RequestBody LoginDTO loginDTO) {
        LoginResponse response = doctorService.loginDoctor(loginDTO);
        ApiResponse<LoginResponse> api = new ApiResponse<>(true, response.getMessage(), response);
        return ResponseEntity.ok(api);
    }
    @PostMapping
    public ResponseEntity<com.example.Hospital.response.ApiResponse<Doctor>> addDoctor(@RequestBody Doctor doctor) {
        Doctor saved = doctorService.addDoctor(doctor);
        com.example.Hospital.response.ApiResponse<Doctor> api = new com.example.Hospital.response.ApiResponse<>(true, "Doctor added", saved);
        return ResponseEntity.ok(api);
    }

    @GetMapping
    public ResponseEntity<com.example.Hospital.response.ApiResponse<List<Doctor>>> getAllDoctors() {
        List<Doctor> list = doctorService.getAllDoctors();
        com.example.Hospital.response.ApiResponse<List<Doctor>> api = new com.example.Hospital.response.ApiResponse<>(true, "Doctors retrieved", list);
        return ResponseEntity.ok(api);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Doctor>> getById(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        ApiResponse<Doctor> response = new ApiResponse<>(true, "Doctor retrieved", doctor);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{doctorId}")
    public ResponseEntity<com.example.Hospital.response.ApiResponse<Doctor>> updateDoctor(@PathVariable Long doctorId, @RequestBody Doctor doctor) {
        Doctor updated = doctorService.updateDoctor(doctorId, doctor);
        com.example.Hospital.response.ApiResponse<Doctor> api = new com.example.Hospital.response.ApiResponse<>(true, "Doctor updated", updated);
        return ResponseEntity.ok(api);
    }

    @DeleteMapping("/{doctorId}")
    public ResponseEntity<com.example.Hospital.response.ApiResponse<Object>> deleteDoctor(@PathVariable Long doctorId) {
        doctorService.deleteDoctor(doctorId);
        com.example.Hospital.response.ApiResponse<Object> api = new com.example.Hospital.response.ApiResponse<>(true, "Doctor deleted", null);
        return ResponseEntity.ok(api);
    }
}
