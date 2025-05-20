package com.G_des_badges.demande_des_badges.rdv.service;

import com.G_des_badges.demande_des_badges.rdv.dto.ModifierRdvDTO;
import com.G_des_badges.demande_des_badges.rdv.dto.ProposerRdvDTO;
import com.G_des_badges.demande_des_badges.rdv.dto.RdvResponseDTO;
import com.G_des_badges.demande_des_badges.rdv.entity.RendezVous;
import com.G_des_badges.demande_des_badges.rdv.repository.RdvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RdvServiceImpl implements RdvService {

    @Autowired
    private RdvRepository rdvRepository;

    @Override
    public RdvResponseDTO proposerRdv(ProposerRdvDTO dto) {
        RendezVous rdv = new RendezVous();
        rdv.setDemandeId(dto.getDemandeId());
        rdv.setDateProposee(dto.getDateProposee());
        rdv.setModifie(false);
        rdv.setConfirme(false);
        return mapToDto(rdvRepository.save(rdv));
    }

    @Override
    public RdvResponseDTO modifierRdv(ModifierRdvDTO dto) {
        RendezVous rdv = rdvRepository.findById(dto.getRdvId())
                .orElseThrow(() -> new RuntimeException("RDV introuvable"));
        rdv.setDateProposee(dto.getNouvelleDate());
        rdv.setModifie(true);
        rdv.setDateModification(LocalDateTime.now());
        return mapToDto(rdvRepository.save(rdv));
    }

    @Override
    public RdvResponseDTO confirmerRdv(Long rdvId) {
        RendezVous rdv = rdvRepository.findById(rdvId)
                .orElseThrow(() -> new RuntimeException("RDV introuvable"));
        rdv.setConfirme(true);
        return mapToDto(rdvRepository.save(rdv));
    }

    @Override
    public List<RdvResponseDTO> getRdvsByDemande(Long demandeId) {
        return rdvRepository.findByDemandeId(demandeId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private RdvResponseDTO mapToDto(RendezVous rdv) {
        RdvResponseDTO dto = new RdvResponseDTO();
        dto.setId(rdv.getId());
        dto.setDemandeId(rdv.getDemandeId());
        dto.setDateProposee(rdv.getDateProposee());
        dto.setModifie(rdv.isModifie());
        dto.setConfirme(rdv.isConfirme());
        return dto;
    }
}
