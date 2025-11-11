package com.example.Hospital.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.example.Hospital.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${frontend.resetUrl:http://localhost:5173/reset-password}")
    private String resetUrl; // Default value if not in application.properties

    @Override
    public void sendEmail(String to, String subject, String msg) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(msg);
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("❌ Failed to send email to: " + to);
            e.printStackTrace();
            // Don't throw exception to prevent registration failure
        }
    }

    @Override
    public void sendWelcomeEmail(String toEmail, String tempPassword) {
        String subject = "Your Account Login Details";
        String message = """
                Welcome to Hospital Management System!

                Your temporary login password: %s

                Please reset your password using the link below:
                %s/%s

                Thank you!
                """.formatted(tempPassword, resetUrl, toEmail);

        sendEmail(toEmail, subject, message);
    }
}