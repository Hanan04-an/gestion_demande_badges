package com.G_des_badges.demande_des_badges.exception;

import com.G_des_badges.demande_des_badges.auth.dto.MessageResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<MessageResponseDTO> handleRuntime(RuntimeException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new MessageResponseDTO(e.getMessage()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<MessageResponseDTO> handleBadCredentials(BadCredentialsException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponseDTO("Email ou mot de passe incorrect"));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<MessageResponseDTO> handleUserNotFound(UsernameNotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new MessageResponseDTO("Utilisateur non trouvé"));
    }

    @ExceptionHandler(CustomNotFoundException.class)
    public ResponseEntity<MessageResponseDTO> handleCustomNotFound(CustomNotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new MessageResponseDTO(e.getMessage()));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<MessageResponseDTO> handleUnauthorized(UnauthorizedException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponseDTO(e.getMessage()));
    }
}
