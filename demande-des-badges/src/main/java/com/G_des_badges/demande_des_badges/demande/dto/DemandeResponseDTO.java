package com.G_des_badges.demande_des_badges.demande.dto;

import lombok.Data;

@Data
public class DemandeResponseDTO {
    private Long id;
    private Long utilisateurId;
    private String statut;
    private String formulaire;
}