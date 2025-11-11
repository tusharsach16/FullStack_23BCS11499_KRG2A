package com.example.Hospital.service;

import java.util.List;
import com.example.Hospital.entity.Patient;
import com.example.Hospital.dto.PatientSignupDTO;
import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.response.LoginResponse;

public interface PatientService {
    String signupPatient(PatientSignupDTO dto);

    LoginResponse loginPatient(LoginDTO loginDTO);

    Patient addPatient(Patient patient);
    Patient updatePatient(Patient patient);
    void deletePatient(Long id);
    List<Patient> getAllPatients();
    Patient getPatientById(Long id);
}
