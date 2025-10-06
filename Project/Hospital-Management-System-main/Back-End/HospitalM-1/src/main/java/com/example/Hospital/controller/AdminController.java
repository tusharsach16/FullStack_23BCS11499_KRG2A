package com.example.Hospital.controller;

import com.example.Hospital.dto.AdminDTO;
import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.response.LoginResponse;
import com.example.Hospital.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/admin")
public class AdminController {
 
    @Autowired
    private AdminService adminService;

    @PostMapping(path = "/register")
    public ResponseEntity<String> registerAdmin(@RequestBody AdminDTO adminDTO) {
        String adminUsername = adminService.addadmin(adminDTO);
        return ResponseEntity.ok("Admin Registered Successfully: " + adminUsername);
    }
 
    @PostMapping(path = "/login")
    public ResponseEntity<LoginResponse> loginAdmin(@RequestBody LoginDTO loginDTO) {
        LoginResponse loginResponse = adminService.loginAdmin(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}