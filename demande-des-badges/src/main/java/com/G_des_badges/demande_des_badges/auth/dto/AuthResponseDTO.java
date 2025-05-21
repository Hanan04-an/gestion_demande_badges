package com.G_des_badges.demande_des_badges.auth.dto;

import com.G_des_badges.demande_des_badges.departement.dto.DepartementDTO;
import lombok.Data;

@Data
public class AuthResponseDTO {
    private String token;
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String role;
    private DepartementDTO departement;
}