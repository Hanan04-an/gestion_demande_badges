package com.G_des_badges.demande_des_badges.departement.entity;


import com.G_des_badges.demande_des_badges.utilisateur.entity.Utilisateur;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "departement")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Departement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long departement_id;

    @Column(name = "nomdepartement", nullable = false, unique = true)
    private String nomDepartement;

    @OneToMany(mappedBy = "departement", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Utilisateur> utilisateurs;
}