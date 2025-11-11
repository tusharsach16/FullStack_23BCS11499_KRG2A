package com.example.Hospital.controller;

import com.example.Hospital.dto.AppointmentRequest;
import com.example.Hospital.entity.Appointment;
import com.example.Hospital.service.AppointmentService;
import com.example.Hospital.response.ApiResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // CHANGE THIS METHOD - Accept AppointmentRequest instead of Appointment
    @PostMapping
    public ResponseEntity<ApiResponse<Appointment>> schedule(@RequestBody AppointmentRequest request) {
        Appointment a = appointmentService.scheduleAppointment(request);
        ApiResponse<Appointment> api = new ApiResponse<>(true, "Appointment scheduled", a);
        return ResponseEntity.ok(api);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Appointment>>> getAll() {
        List<Appointment> list = appointmentService.getAllAppointments();
        ApiResponse<List<Appointment>> api = new ApiResponse<>(true, "Appointments retrieved", list);
        return ResponseEntity.ok(api);
    }

    @GetMapping("/patient/{email}")
    public ResponseEntity<ApiResponse<List<Appointment>>> getByPatient(@PathVariable String email) {
        List<Appointment> list = appointmentService.getAppointmentsByPatient(email);
        ApiResponse<List<Appointment>> api = new ApiResponse<>(true, "Appointments for patient retrieved", list);
        return ResponseEntity.ok(api);
    }
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<ApiResponse<List<Appointment>>> getByDoctor(@PathVariable Long doctorId) {
        List<Appointment> list = appointmentService.getAppointmentsByDoctor(doctorId);
        ApiResponse<List<Appointment>> api = new ApiResponse<>(true, "Appointments for doctor retrieved", list);
        return ResponseEntity.ok(api);
    }

    @PutMapping("/{appointmentId}/cancel")
    public ResponseEntity<ApiResponse<Appointment>> cancel(@PathVariable Long appointmentId) {
        Appointment a = appointmentService.cancelAppointment(appointmentId);
        ApiResponse<Appointment> api = new ApiResponse<>(true, "Appointment cancelled", a);
        return ResponseEntity.ok(api);
    }
}