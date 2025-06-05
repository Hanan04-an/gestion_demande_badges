package com.G_des_badges.demande_des_badges.document;

@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;     // Nom du document
    private String url;     // URL ou chemin d'accès (relatif ou complet)

    @ManyToOne
    @JoinColumn(name = "id_formulaire")
    private Formulaire formulaire;

    // Getters et setters
}

