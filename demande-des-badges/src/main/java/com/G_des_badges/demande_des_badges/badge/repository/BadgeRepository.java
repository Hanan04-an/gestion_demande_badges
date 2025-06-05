package com.G_des_badges.demande_des_badges.badge.repository;

import com.G_des_badges.demande_des_badges.badge.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
    boolean existsByNumero(String numero);
}