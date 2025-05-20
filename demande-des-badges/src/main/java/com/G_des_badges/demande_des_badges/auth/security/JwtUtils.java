package com.G_des_badges.demande_des_badges.auth.security;


import com.G_des_badges.demande_des_badges.utilisateur.entity.Utilisateur;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${app.jwtSecret:Cyi6023LVzSo8MJxTcXqNoZy2xNCa6TFi0ZzvoOnA1iYuI0QuN0oeU9OHjauI0KzX3h8rhURwWaL36m/KMrnww==}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs:86400000}")
    private int jwtExpirationMs;

    public String generateToken(Utilisateur utilisateur) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        return Jwts.builder()
                .setSubject(utilisateur.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .claim("id", utilisateur.getId())
                .claim("role", utilisateur.getRole().name()) // OK
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims parseToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


}