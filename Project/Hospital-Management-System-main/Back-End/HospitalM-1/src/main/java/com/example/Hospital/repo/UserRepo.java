package com.example.Hospital.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Hospital.entity.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email); 
    void deleteByUsername(String username);
}

