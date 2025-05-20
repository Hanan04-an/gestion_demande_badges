package com.G_des_badges.demande_des_badges.demande.service;

import com.G_des_badges.demande_des_badges.demande.dto.DemandeRequestDTO;
import com.G_des_badges.demande_des_badges.demande.dto.DemandeResponseDTO;
import com.G_des_badges.demande_des_badges.demande.entity.Demande;
import com.G_des_badges.demande_des_badges.demande.repository.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DemandeServiceImpl implements DemandeService {

    @Autowired
    private DemandeRepository demandeRepository;

    @Override
    public DemandeResponseDTO demanderBadge(DemandeRequestDTO dto) {
        Demande demande = new Demande();
        demande.setUtilisateurId(dto.getUtilisateurId());
        demande.setFormulaire(dto.getFormulaire());
        demande.setStatut("EN_ATTENTE");
        demande.setDateDemande(LocalDateTime.now());
        return mapToDto(demandeRepository.save(demande));
    }

    @Override
    public DemandeResponseDTO validerParAdmin(Long id) {
        Demande demande = demandeRepository.findById(id).orElseThrow();
        demande.setStatut("VALIDE_ADMIN");
        demande.setDateValidationAdmin(LocalDateTime.now());
        return mapToDto(demandeRepository.save(demande));
    }

    @Override
    public DemandeResponseDTO validerParSuperAdmin(Long id) {
        Demande demande = demandeRepository.findById(id).orElseThrow();
        demande.setStatut("VALIDE_SUPERADMIN");
        demande.setDateValidationSuperAdmin(LocalDateTime.now());
        return mapToDto(demandeRepository.save(demande));
    }

    @Override
    public List<DemandeResponseDTO> getAll() {
        return demandeRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<DemandeResponseDTO> getByUtilisateur(Long utilisateurId) {
        return demandeRepository.findByUtilisateurId(utilisateurId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private DemandeResponseDTO mapToDto(Demande demande) {
        DemandeResponseDTO dto = new DemandeResponseDTO();
        dto.setId(demande.getId());
        dto.setUtilisateurId(demande.getUtilisateurId());
        dto.setFormulaire(demande.getFormulaire());
        dto.setStatut(demande.getStatut());
        return dto;
    }
}
