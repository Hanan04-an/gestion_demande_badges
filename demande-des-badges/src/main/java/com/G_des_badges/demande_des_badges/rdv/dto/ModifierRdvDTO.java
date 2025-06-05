
package com.G_des_badges.demande_des_badges.rdv.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ModifierRdvDTO {
    private Long rdvId;
    private LocalDateTime nouvelleDate;
}
