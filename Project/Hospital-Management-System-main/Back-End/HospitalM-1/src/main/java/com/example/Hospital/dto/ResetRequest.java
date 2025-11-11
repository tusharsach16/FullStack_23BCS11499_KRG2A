package com.example.Hospital.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResetRequest {
    private String email;
    private String newPassword;
}
