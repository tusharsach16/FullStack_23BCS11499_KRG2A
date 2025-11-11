package com.example.Hospital.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    // Username is optional for patients, so NOT unique
    @Column(nullable = true)
    private String username;

    // Email must remain unique (main login key)
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // Should be stored as: ROLE_ADMIN / ROLE_PATIENT / ROLE_DOCTOR
    @Column(nullable = false)
    private String role;
}
