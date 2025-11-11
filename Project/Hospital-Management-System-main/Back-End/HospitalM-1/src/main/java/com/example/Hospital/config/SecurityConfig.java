package com.example.Hospital.config;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/v1/admin/login",
                    "/api/v1/admin/register",
                    "/api/v1/patients/signup",
                    "/api/v1/patients/login",
                    "/api/doctors/login" ,
                    "api/doctors",
                    "api/appointments",
                    "api/doctors/{id}",
                    "api/appointments/doctor/{doctorId}",
                    "api/appointments/patient/{email}",
                    "api/appointments/{appointmentId}/cancel"
                ).permitAll()

                .requestMatchers("/api/doctors/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_PATIENT")
                .requestMatchers("/api/v1/patients/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_RECEPTIONIST", "ROLE_PATIENT")

                .requestMatchers("/api/appointments/doctor/**").hasAuthority("ROLE_DOCTOR")
                .requestMatchers("/api/appointments/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_RECEPTIONIST", "ROLE_PATIENT")

                .requestMatchers("/api/medical-records/**").hasAnyAuthority("ROLE_DOCTOR", "ROLE_PATIENT")

                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
