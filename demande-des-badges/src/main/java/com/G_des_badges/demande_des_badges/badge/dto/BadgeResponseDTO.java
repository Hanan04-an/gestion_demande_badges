package com.G_des_badges.demande_des_badges.badge.dto;

import lombok.Data;

@Data
public class BadgeResponseDTO {
    private Long id;
    private String numero;
    private boolean actif;
    private Long utilisateurId;
}