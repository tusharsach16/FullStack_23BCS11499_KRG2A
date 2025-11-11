package com.example.Hospital.controller;

import com.example.Hospital.dto.ResetRequest;
import com.example.Hospital.entity.User;
import com.example.Hospital.repo.UserRepo;
import com.example.Hospital.response.ApiResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import com.example.Hospital.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class PasswordController {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public PasswordController(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/send-reset-link")
    public ResponseEntity<?> sendResetLink(@RequestBody Map<String, String> req) {
        String email = req.get("email");

        String resetLink = "http://localhost:5173/reset-password?email=" + email;
        emailService.sendEmail(email, "Reset Your Password", 
            "Click the link to reset password:\n" + resetLink);

        return ResponseEntity.ok(new ApiResponse<>(true, "Reset Email Sent", null));
    }
}
