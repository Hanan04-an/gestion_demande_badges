package com.G_des_badges.demande_des_badges.departement.repository;

import com.G_des_badges.demande_des_badges.departement.entity.Departement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartementRepository extends JpaRepository<Departement, Long> {
}