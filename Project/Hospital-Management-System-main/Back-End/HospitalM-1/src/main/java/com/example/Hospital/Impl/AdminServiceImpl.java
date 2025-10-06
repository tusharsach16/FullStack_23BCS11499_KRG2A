package com.example.Hospital.Impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Hospital.dto.AdminDTO;
import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.entity.Admin;
import com.example.Hospital.repo.AdminRepo;
import com.example.Hospital.response.LoginResponse;
import com.example.Hospital.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addadmin(AdminDTO adminDTO) {
        // Use the constructor that doesn't require an ID
        Admin admin = new Admin(
                adminDTO.getUsername(),
                this.passwordEncoder.encode(adminDTO.getPassword())
        );
        adminRepo.save(admin);
        return admin.getUsername();
    }
    
    @Override
    public LoginResponse loginAdmin(LoginDTO loginDTO) {
        Optional<Admin> adminOptional = adminRepo.findByUsername(loginDTO.getUsername());

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            String rawPassword = loginDTO.getPassword();
            String encodedPassword = admin.getPassword();

            if (passwordEncoder.matches(rawPassword, encodedPassword)) {
                return new LoginResponse("Login Success", true);
            } else {
                return new LoginResponse("Password does not match", false);
            }
        } else {
            return new LoginResponse("Username does not exist", false);
        }
    }
}