package com.example.Hospital.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Hospital.dto.AdminDTO;
import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.entity.Admin;
import com.example.Hospital.entity.User;
import com.example.Hospital.repo.AdminRepo;
import com.example.Hospital.repo.UserRepo;
import com.example.Hospital.response.LoginResponse;
import com.example.Hospital.service.AdminService;
import com.example.Hospital.config.JwtUtil;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public String addadmin(AdminDTO adminDTO) {

        if (userRepo.findByEmail(adminDTO.getEmail()).isPresent()) {
            return "Email already registered";
        }
        String encodedPassword = passwordEncoder.encode(adminDTO.getPassword());
        Admin admin = new Admin(
                adminDTO.getEmail(),
                adminDTO.getEmail(),
                encodedPassword
        );
        adminRepo.save(admin);

        User user = new User();
        user.setEmail(adminDTO.getEmail());
        user.setUsername(adminDTO.getEmail());
        user.setPassword(encodedPassword);
        user.setRole("ROLE_ADMIN");
        userRepo.save(user);

        return admin.getUsername();
    }

    @Override
    public LoginResponse loginAdmin(LoginDTO loginDTO) {

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

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        String role = user.getRole().replace("ROLE_", "");

        return new LoginResponse("Login Success", true, role, token, null);
    }
}
