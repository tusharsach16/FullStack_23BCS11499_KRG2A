package com.example.Hospital.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Hospital.dto.PatientSignupDTO;
import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.entity.Patient;
import com.example.Hospital.entity.User;
import com.example.Hospital.repo.PatientRepo;
import com.example.Hospital.repo.UserRepo;
import com.example.Hospital.response.LoginResponse;
import com.example.Hospital.service.PatientService;
import com.example.Hospital.service.EmailService;
import com.example.Hospital.utils.PasswordGenerator;
import com.example.Hospital.config.JwtUtil;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private EmailService emailService; // ✅ ADDED: Autowire EmailService

    // ✅ Patient Signup (Self Registration) - NO EMAIL SENT
    @Override
    public String signupPatient(PatientSignupDTO dto) {

        // Check if email already exists
        if (patientRepo.findByEmail(dto.getEmail()).isPresent()) {
            return "Email already registered";
        }

        // ❌ REMOVED: Password generation (patient provides their own password)
        // Save into patients table with user's chosen password
        Patient patient = new Patient();
        patient.setName(dto.getName());
        patient.setEmail(dto.getEmail());
        patient.setPassword(passwordEncoder.encode(dto.getPassword())); // Use their password
        patient.setContact(dto.getContact());
        patient.setDob(dto.getDob());
        patient.setGender(dto.getGender());
        patient.setAddress(dto.getAddress());
        patientRepo.save(patient);

        // Create login account in users table
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getEmail());
        user.setPassword(patient.getPassword());
        user.setRole("ROLE_PATIENT");
        userRepo.save(user);

        // ❌ NO EMAIL SENT FOR SELF-REGISTRATION
        System.out.println("ℹ️ Patient self-registered (no email sent): " + dto.getEmail());

        return "Patient Registered Successfully";
    }

    // Patient Login
    @Override
    public LoginResponse loginPatient(LoginDTO loginDTO) {

        String email = loginDTO.getUsername().trim().toLowerCase();

        Optional<User> userOptional = userRepo.findByEmail(email);

        if (userOptional.isEmpty()) {
            LoginResponse response = new LoginResponse("User not found", false);
            response.setRole(null);
            response.setToken(null);
            response.setUserId(null);
            return response;
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            LoginResponse response = new LoginResponse("Incorrect password", false);
            response.setRole(null);
            response.setToken(null);
            response.setUserId(null);
            return response;
        }

        // Get patient ID
        Optional<Patient> patientOptional = patientRepo.findByEmail(email);
        Long patientId = patientOptional.map(Patient::getId).orElse(null);
    
        if (patientOptional.isPresent()) {
            patientId = patientOptional.get().getId();
            System.out.println("Found patient with ID: " + patientId);
        } else {
            System.out.println("Patient not found for email: " + user.getEmail());
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        String role = user.getRole().replace("ROLE_", "");

        LoginResponse response = new LoginResponse("Login Success", true, role, token, patientId);
        response.setEmail(email);

        return response;
    }

    // ✅ ADMIN adds Patient - SEND EMAIL WITH CREDENTIALS
    @Override
    public Patient addPatient(Patient patient) {
        // Check if email already exists
        if (patientRepo.findByEmail(patient.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        
        // Generate random password for admin-created patient
        String rawPassword = PasswordGenerator.generate();
        
        // Encode and save patient
        patient.setPassword(passwordEncoder.encode(rawPassword));
        Patient savedPatient = patientRepo.save(patient);
        
        // Create user account
        User user = new User();
        user.setEmail(savedPatient.getEmail());
        user.setUsername(savedPatient.getEmail());
        user.setPassword(savedPatient.getPassword());
        user.setRole("ROLE_PATIENT");
        userRepo.save(user);
        
        // ✅ Send welcome email with login credentials
        emailService.sendEmail(
            savedPatient.getEmail(),
            "Your Patient Account Login Details",
            "Welcome to the Hospital Management System!\n\n" +
            "Your account has been created by the administrator.\n\n" +
            "Login Credentials:\n" +
            "Email: " + savedPatient.getEmail() + "\n" +
            "Temporary Password: " + rawPassword + "\n\n" +
            "Please login and change your password immediately.\n\n" +
            "Best regards,\n" +
            "Hospital Management Team"
        );
        
        System.out.println("✅ Welcome email sent to patient: " + savedPatient.getEmail());
        
        return savedPatient;
    }

    @Override
    public Patient updatePatient(Patient patient) {
        Optional<Patient> existingPatient = patientRepo.findById(patient.getId());
        if (existingPatient.isPresent()) {
            Patient updatedPatient = existingPatient.get();
            updatedPatient.setName(patient.getName());
            updatedPatient.setDob(patient.getDob());
            updatedPatient.setGender(patient.getGender());
            updatedPatient.setContact(patient.getContact());
            updatedPatient.setAddress(patient.getAddress());
            return patientRepo.save(updatedPatient);
        } else {
            throw new RuntimeException("Patient not found with id: " + patient.getId());
        }
    }

    @Override
    public void deletePatient(Long id) {
        patientRepo.deleteById(id);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepo.findById(id).orElse(null);
    }
}