package com.example.Hospital.impl;

import com.example.Hospital.dto.AppointmentRequest;
import com.example.Hospital.entity.Appointment;
import com.example.Hospital.entity.Doctor;
import com.example.Hospital.entity.Patient;
import com.example.Hospital.repo.AppointmentRepo;
import com.example.Hospital.repo.DoctorRepo;
import com.example.Hospital.repo.PatientRepo;
import com.example.Hospital.service.AppointmentService;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepo appointmentRepository;
    private final DoctorRepo doctorRepository;
    private final PatientRepo patientRepository;

    public AppointmentServiceImpl(AppointmentRepo appointmentRepository, 
                            DoctorRepo doctorRepository,
                            PatientRepo patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    // CHANGE THIS METHOD - Accept AppointmentRequest instead of Appointment
    public Appointment scheduleAppointment(AppointmentRequest request) {
        // Find doctor
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + request.getDoctorId()));
        
        // Find patient by email
        Patient patient = patientRepository.findByEmail(request.getPatientEmail())
            .orElseThrow(() -> new RuntimeException("Patient not found with email: " + request.getPatientEmail()));
        
        // Combine date and time into LocalDateTime
        LocalDate date = LocalDate.parse(request.getAppointmentDate());
        LocalTime time = LocalTime.parse(request.getAppointmentTime());
        LocalDateTime appointmentDateTime = LocalDateTime.of(date, time);
        
        // Create appointment
        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentTime(appointmentDateTime);
        appointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);
        
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByPatient(String email) {
        return appointmentRepository.findByPatient_Email(email);
    }

    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctor_DoctorId(doctorId);
    }

    public Appointment cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + appointmentId));
        appointment.setStatus(Appointment.AppointmentStatus.CANCELLED);
        return appointmentRepository.save(appointment);
    }
}