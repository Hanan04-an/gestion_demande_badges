package com.G_des_badges.demande_des_badges.utilisateur.controller;

import com.G_des_badges.demande_des_badges.model.Role;
import com.G_des_badges.demande_des_badges.utilisateur.dto.UtilisateurResponseDTO;
import com.G_des_badges.demande_des_badges.utilisateur.entity.Utilisateur;
import com.G_des_badges.demande_des_badges.utilisateur.repository.UtilisateurRepository;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;



    private UtilisateurResponseDTO mapToDTO(Utilisateur user) {
        UtilisateurResponseDTO dto = new UtilisateurResponseDTO();
        dto.setId(user.getId());
        dto.setNom(user.getNom());
        dto.setPrenom(user.getPrenom());
        dto.setPosition(user.getPosition());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());

        if (user.getDepartement() != null) {
            dto.setNomDepartement(user.getDepartement().getNomDepartement());
        } else {
            dto.setNomDepartement("Aucun");
        }

        return dto;
    }


    /**
     * 🔍 Affiche tous les utilisateurs (SUPERADMIN uniquement)
     */
    @GetMapping("/visible")
    @PreAuthorize("hasAnyRole('SUPERADMIN', 'ADMIN')")
    public List<UtilisateurResponseDTO> getUtilisateursVisibles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        List<Utilisateur> utilisateurs;

        boolean isSuperAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_SUPERADMIN"));

        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isSuperAdmin) {
            utilisateurs = utilisateurRepository.findAll();
        } else if (isAdmin) {
            Long departementId = user.getDepartement().getDepartement_id();
            utilisateurs = utilisateurRepository.findByDepartementIdAndRole(departementId, Role.EMPLOYEE);
        } else {
            return List.of();
        }

        return utilisateurs.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
}
