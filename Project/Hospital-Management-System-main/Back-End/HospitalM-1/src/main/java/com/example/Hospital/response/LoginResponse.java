package com.example.Hospital.response;

public class LoginResponse {

    private String message;
    private Boolean status;
    private String role;   // NEW
    private String token;  // NEW
    private Long userId;
    private String email;

    public LoginResponse() {}

    // Old constructor (for backward compatibility)
    public LoginResponse(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }

    // New constructor (used when login is successful)
    public LoginResponse(String message, Boolean status, String role, String token, Long userId) {
        this.message = message;
        this.status = status;
        this.role = role;
        this.token = token;
        this.userId = userId;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email; 
    }
}
