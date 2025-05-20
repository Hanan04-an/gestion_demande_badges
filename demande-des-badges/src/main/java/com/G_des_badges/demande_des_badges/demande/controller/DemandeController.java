package com.G_des_badges.demande_des_badges.demande.controller;

import com.G_des_badges.demande_des_badges.demande.dto.DemandeRequestDTO;
import com.G_des_badges.demande_des_badges.demande.dto.DemandeResponseDTO;
import com.G_des_badges.demande_des_badges.demande.service.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/demandes")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;

    @PostMapping
    public DemandeResponseDTO demanderBadge(@RequestBody DemandeRequestDTO dto) {
        return demandeService.demanderBadge(dto);
    }

    @PutMapping("/valider/admin/{id}")
    public DemandeResponseDTO validerParAdmin(@PathVariable Long id) {
        return demandeService.validerParAdmin(id);
    }

    @PutMapping("/valider/superadmin/{id}")
    public DemandeResponseDTO validerParSuperAdmin(@PathVariable Long id) {
        return demandeService.validerParSuperAdmin(id);
    }

    @GetMapping
    public List<DemandeResponseDTO> getAll() {
        return demandeService.getAll();
    }

    @GetMapping("/utilisateur/{userId}")
    public List<DemandeResponseDTO> getByUtilisateur(@PathVariable Long userId) {
        return demandeService.getByUtilisateur(userId);
    }
}
