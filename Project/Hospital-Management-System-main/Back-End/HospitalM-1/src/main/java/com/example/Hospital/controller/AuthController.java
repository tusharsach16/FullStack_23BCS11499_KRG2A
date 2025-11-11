package com.example.Hospital.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.Hospital.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.Hospital.repo.UserRepo;
import com.example.Hospital.service.EmailService;
import com.example.Hospital.dto.ResetRequest; 
import com.example.Hospital.response.ApiResponse;




@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetRequest req) {

        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepo.save(user);

        return ResponseEntity.ok(new ApiResponse<>(true, "Password updated successfully", null));
    }
}
