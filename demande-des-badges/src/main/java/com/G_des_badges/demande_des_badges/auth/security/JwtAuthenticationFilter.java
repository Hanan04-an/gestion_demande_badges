package com.G_des_badges.demande_des_badges.auth.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        try {
            Claims claims = jwtUtils.parseToken(token);
            String email = claims.getSubject();
            String role = claims.get("role", String.class);

            if (email != null && role != null) {
                // Assurer que le rôle est bien en MAJUSCULE (même si ça devrait déjà l’être)
                String roleUpper = role.toUpperCase();

                SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + roleUpper);
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(email, null, List.of(authority));

                SecurityContextHolder.getContext().setAuthentication(authToken);

                System.out.println("Authentifié : " + email);
                System.out.println(" Rôle extrait du token : " + role);
                System.out.println(" Authority injectée : ROLE_" + roleUpper);
            }

        } catch (Exception e) {
            System.out.println("Token invalide : " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}
