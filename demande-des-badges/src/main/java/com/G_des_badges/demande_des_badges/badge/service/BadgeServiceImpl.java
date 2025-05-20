package com.G_des_badges.demande_des_badges.badge.service;

import com.G_des_badges.demande_des_badges.badge.dto.BadgeRequestDTO;
import com.G_des_badges.demande_des_badges.badge.dto.BadgeResponseDTO;
import com.G_des_badges.demande_des_badges.badge.entity.Badge;
import com.G_des_badges.demande_des_badges.badge.repository.BadgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BadgeServiceImpl implements BadgeService {

    @Autowired
    private BadgeRepository badgeRepository;

    @Override
    public BadgeResponseDTO createBadge(BadgeRequestDTO request) {
        Badge badge = new Badge();
        badge.setNumero(request.getNumero());
        badge.setUtilisateurId(request.getUtilisateurId());
        badge.setActif(true); // actif par défaut

        Badge saved = badgeRepository.save(badge);

        return mapToDTO(saved);
    }

    @Override
    public List<BadgeResponseDTO> getAllBadges() {
        return badgeRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BadgeResponseDTO getBadgeById(Long id) {
        Badge badge = badgeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Badge introuvable"));
        return mapToDTO(badge);
    }

    @Override
    public void deleteBadge(Long id) {
        badgeRepository.deleteById(id);
    }

    private BadgeResponseDTO mapToDTO(Badge badge) {
        BadgeResponseDTO dto = new BadgeResponseDTO();
        dto.setId(badge.getId());
        dto.setNumero(badge.getNumero());
        dto.setActif(badge.isActif());
        dto.setUtilisateurId(badge.getUtilisateurId());
        return dto;
    }
}
