package com.G_des_badges.demande_des_badges.demande.service;

import com.G_des_badges.demande_des_badges.demande.dto.DemandeRequestDTO;
import com.G_des_badges.demande_des_badges.demande.dto.DemandeResponseDTO;

import java.util.List;

public interface DemandeService {
    DemandeResponseDTO demanderBadge(DemandeRequestDTO dto);
    DemandeResponseDTO validerParAdmin(Long demandeId);
    DemandeResponseDTO validerParSuperAdmin(Long demandeId);
    List<DemandeResponseDTO> getAll();
    List<DemandeResponseDTO> getByUtilisateur(Long utilisateurId);
}