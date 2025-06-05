package com.G_des_badges.demande_des_badges.auth.dto;


import lombok.Data;

@Data

public class LoginRequestDTO {
    private String email;
    private String password;
}

