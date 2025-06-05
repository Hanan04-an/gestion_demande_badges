package com.G_des_badges.demande_des_badges.badge.controller;

import com.G_des_badges.demande_des_badges.badge.dto.BadgeRequestDTO;
import com.G_des_badges.demande_des_badges.badge.dto.BadgeResponseDTO;
import com.G_des_badges.demande_des_badges.badge.service.BadgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
public class BadgeController {

    @Autowired
    private BadgeService badgeService;

    @PostMapping
    public BadgeResponseDTO createBadge(@RequestBody BadgeRequestDTO dto) {
        return badgeService.createBadge(dto);
    }

    @GetMapping
    public List<BadgeResponseDTO> getAllBadges() {
        return badgeService.getAllBadges();
    }

    @GetMapping("/{id}")
    public BadgeResponseDTO getBadgeById(@PathVariable Long id) {
        return badgeService.getBadgeById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteBadge(@PathVariable Long id) {
        badgeService.deleteBadge(id);
    }
}
