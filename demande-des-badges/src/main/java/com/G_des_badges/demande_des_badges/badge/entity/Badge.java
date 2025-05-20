package com.G_des_badges.demande_des_badges.badge.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "badges")
@Data
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;

    private boolean actif;

    private Long utilisateurId; // Lien vers l'utilisateur concerné
}