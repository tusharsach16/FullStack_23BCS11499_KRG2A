package com.example.Hospital.controller;

import com.example.Hospital.dto.AdminDTO;
import com.example.Hospital.dto.LoginDTO;
import com.example.Hospital.response.LoginResponse;
import com.example.Hospital.response.ApiResponse;
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
    public ResponseEntity<ApiResponse<String>> registerAdmin(@RequestBody AdminDTO adminDTO) {
        String adminUsername = adminService.addadmin(adminDTO);
        ApiResponse<String> api = new ApiResponse<>(true, "Admin Registered Successfully", adminUsername);
        return ResponseEntity.ok(api);
    }
 
    @PostMapping(path = "/login")
    public ResponseEntity<ApiResponse<LoginResponse>> loginAdmin(@RequestBody LoginDTO loginDTO) {
        LoginResponse loginResponse = adminService.loginAdmin(loginDTO);
        ApiResponse<LoginResponse> api = new ApiResponse<>(true, loginResponse.getMessage(), loginResponse);
        return ResponseEntity.ok(api);
    }
}