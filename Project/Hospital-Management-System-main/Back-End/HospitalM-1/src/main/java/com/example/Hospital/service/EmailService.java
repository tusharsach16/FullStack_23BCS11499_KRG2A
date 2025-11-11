package com.example.Hospital.service;

public interface EmailService {
    /**
     * Send a simple email
     * @param to recipient email address
     * @param subject email subject
     * @param msg email message body
     */
    void sendEmail(String to, String subject, String msg);
    
    /**
     * Send welcome email with temporary password (optional method for password reset feature)
     * @param toEmail recipient email
     * @param tempPassword temporary password
     */
    void sendWelcomeEmail(String toEmail, String tempPassword);
}