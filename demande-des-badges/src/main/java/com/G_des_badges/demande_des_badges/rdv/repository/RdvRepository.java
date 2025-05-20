package com.G_des_badges.demande_des_badges.rdv.repository;

import com.G_des_badges.demande_des_badges.rdv.entity.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RdvRepository extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findByDemandeId(Long demandeId);
}
