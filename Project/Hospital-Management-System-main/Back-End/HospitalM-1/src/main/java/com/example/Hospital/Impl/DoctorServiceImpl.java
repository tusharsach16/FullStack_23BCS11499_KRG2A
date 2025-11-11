package com.example.Hospital.impl;

import com.example.Hospital.entity.Doctor;
import com.example.Hospital.entity.User;
import com.example.Hospital.repo.DoctorRepo;
import com.example.Hospital.repo.UserRepo;
import com.example.Hospital.service.DoctorService;
import com.example.Hospital.service.EmailService;
import com.example.Hospital.utils.PasswordGenerator;
import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.response.LoginResponse;
import com.example.Hospital.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepo doctorRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private EmailService emailService; // ✅ ADDED: Autowire EmailService

    public DoctorServiceImpl(DoctorRepo doctorRepo, UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.doctorRepo = doctorRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Doctor addDoctor(Doctor doctor) {
        // Generate random password
        String rawPassword = PasswordGenerator.generate();

        // Encode and save doctor
        doctor.setPassword(passwordEncoder.encode(rawPassword));
        Doctor savedDoctor = doctorRepo.save(doctor);

        // Create user account
        User user = new User();
        user.setUsername(savedDoctor.getEmail());
        user.setEmail(savedDoctor.getEmail());
        user.setPassword(savedDoctor.getPassword());
        user.setRole("ROLE_DOCTOR");
        userRepo.save(user);

        // ✅ Send welcome email with login credentials
        emailService.sendEmail(
            savedDoctor.getEmail(),
            "Your Doctor Account Login Details",
            "Welcome to the Hospital Management System!\n\n" +
            "Your account has been created by the administrator.\n\n" +
            "Login Credentials:\n" +
            "Email: " + savedDoctor.getEmail() + "\n" +
            "Temporary Password: " + rawPassword + "\n\n" +
            "Please login and change your password immediately.\n\n" +
            "Best regards,\n" +
            "Hospital Management Team"
        );
        
        System.out.println("✅ Welcome email sent to doctor: " + savedDoctor.getEmail());
        
        return savedDoctor;
    }

    @Override
    public LoginResponse loginDoctor(LoginDTO loginDTO) {
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

        if (!user.getRole().equals("ROLE_DOCTOR")) {
            LoginResponse response = new LoginResponse("Not authorized as doctor", false);
            response.setRole(null);
            response.setToken(null);
            response.setUserId(null);
            return response;
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            LoginResponse response = new LoginResponse("Incorrect password", false);
            response.setRole(null);
            response.setToken(null);
            response.setUserId(null);
            return response;
        }
        
        Optional<Doctor> doctorOptional = doctorRepo.findByEmail(email);
        Long doctorId = doctorOptional.map(Doctor::getDoctorId).orElse(null);

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        String role = user.getRole().replace("ROLE_", "");

        LoginResponse response = new LoginResponse("Login Success", true);
        response.setToken(token);
        response.setRole(role);
        response.setUserId(doctorId); 
        response.setEmail(email);
        return response;
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }
    
    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {
        Doctor existing = doctorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        existing.setName(doctor.getName());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setContact(doctor.getContact());
        existing.setEmail(doctor.getEmail());
        return doctorRepo.save(existing);
    }

    @Override
    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        doctorRepo.deleteById(id);
        userRepo.deleteByUsername(doctor.getEmail());
    }
}