package com.G_des_badges.demande_des_badges.badge.service;

import com.G_des_badges.demande_des_badges.badge.dto.BadgeRequestDTO;
import com.G_des_badges.demande_des_badges.badge.dto.BadgeResponseDTO;
import java.util.List;

public interface BadgeService {
    BadgeResponseDTO createBadge(BadgeRequestDTO request);
    List<BadgeResponseDTO> getAllBadges();
    BadgeResponseDTO getBadgeById(Long id);
    void deleteBadge(Long id);
}
