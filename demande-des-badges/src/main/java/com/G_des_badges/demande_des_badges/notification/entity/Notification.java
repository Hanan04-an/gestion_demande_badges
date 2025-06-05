package com.G_des_badges.demande_des_badges.notification.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type; // BADGE_REQUEST, SIGNUP, RDV_REMINDER

    @Column(nullable = false)
    private String message;

    private LocalDateTime date = LocalDateTime.now();

    // Pour lier à un utilisateur (optionnel)
    private Long userId;

    // Pour marquer comme lue/non lue (optionnel)
    private boolean isRead = false;

    public Notification() {}

    public Notification(String type, String message, Long userId) {
        this.type = type;
        this.message = message;
        this.userId = userId;
        this.date = LocalDateTime.now();
        this.isRead = false;
    }

    // Getters et setters
    public Long getId() { return id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
}
