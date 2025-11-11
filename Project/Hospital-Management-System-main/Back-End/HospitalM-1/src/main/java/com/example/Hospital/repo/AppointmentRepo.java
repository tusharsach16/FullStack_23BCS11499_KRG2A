package com.example.Hospital.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Hospital.entity.Appointment;

import java.util.List;

public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctor_DoctorId(Long doctorId); // for doctor schedule view
    List<Appointment> findByPatient_Email(String email);
}
