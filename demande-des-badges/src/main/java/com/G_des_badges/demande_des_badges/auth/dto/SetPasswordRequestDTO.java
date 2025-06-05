package com.G_des_badges.demande_des_badges.auth.dto;


import lombok.Data;

@Data
public class SetPasswordRequestDTO {
    private String token;
    private String newPassword;
}

