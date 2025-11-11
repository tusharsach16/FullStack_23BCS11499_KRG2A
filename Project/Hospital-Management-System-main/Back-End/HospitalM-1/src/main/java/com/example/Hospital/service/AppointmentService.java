package com.example.Hospital.service;

import com.example.Hospital.dto.AppointmentRequest;
import com.example.Hospital.entity.Appointment;
import java.util.List;

public interface AppointmentService {
    Appointment scheduleAppointment(AppointmentRequest request);
    List<Appointment> getAllAppointments();
    List<Appointment> getAppointmentsByDoctor(Long doctorId);
    List<Appointment> getAppointmentsByPatient(String email);
    Appointment cancelAppointment(Long id);
}
