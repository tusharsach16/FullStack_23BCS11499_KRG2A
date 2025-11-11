package com.example.Hospital.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Hospital.entity.Doctor;
import java.util.Optional;

public interface DoctorRepo extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);
}
