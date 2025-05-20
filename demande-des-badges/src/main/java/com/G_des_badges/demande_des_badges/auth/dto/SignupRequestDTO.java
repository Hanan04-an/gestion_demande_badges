package com.G_des_badges.demande_des_badges.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SignupRequestDTO {
    @NotBlank
    private String nom;

    @NotBlank
    private String prenom;

    private String position;

    @NotBlank
    @Email
    private String email;

    @NotNull
    private Long departementId;
}
