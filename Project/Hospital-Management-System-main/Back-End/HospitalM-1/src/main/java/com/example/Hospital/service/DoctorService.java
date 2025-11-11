package com.example.Hospital.service;

import com.example.Hospital.entity.Doctor;

import java.util.List;

import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.response.LoginResponse;
public interface DoctorService {
    Doctor addDoctor(Doctor doctor);
    List<Doctor> getAllDoctors();
    Doctor getDoctorById(Long id);
    Doctor updateDoctor(Long id, Doctor doctor);
    void deleteDoctor(Long id);
    LoginResponse loginDoctor(LoginDTO loginDTO);
}
