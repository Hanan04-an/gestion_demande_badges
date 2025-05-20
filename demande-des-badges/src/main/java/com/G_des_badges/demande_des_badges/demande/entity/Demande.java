package com.G_des_badges.demande_des_badges.demande.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "demandes")
@Data
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long utilisateurId;

    private String statut; // EN_ATTENTE, VALIDE_ADMIN, VALIDE_SUPERADMIN, REFUSEE

    private String formulaire; // contenu ou URL

    private LocalDateTime dateDemande;
    private LocalDateTime dateValidationAdmin;
    private LocalDateTime dateValidationSuperAdmin;
}
