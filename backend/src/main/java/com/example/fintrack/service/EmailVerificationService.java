package com.example.fintrack.service;

import com.example.fintrack.entity.EmailVerification;
import com.example.fintrack.entity.User;
import com.example.fintrack.exception.InvalidTokenException;
import com.example.fintrack.repository.EmailVerificationRepository;
import com.example.fintrack.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
@RequiredArgsConstructor
@Transactional
public class EmailVerificationService {

    private final EmailVerificationRepository emailVerificationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    private static final int TOKEN_EXPIRATION_MINUTES = 15;

    public void createVerificationToken(User user) {

        emailVerificationRepository.deleteByUserId(user.getId());

        String token = generateToken();

        EmailVerification verification = EmailVerification.builder()
                .token(token)
                .user(user)
                .expiresAt(
                        LocalDateTime.now()
                                .plusMinutes(TOKEN_EXPIRATION_MINUTES)
                )
                .build();

        emailVerificationRepository.save(verification);

        String verificationLink =
                frontendUrl + "/verify-email?token=" + token;

        emailService.sendVerificationEmail(
                user.getEmail(),
                verificationLink
        );
    }

    private String generateToken() {

        byte[] randomBytes = new byte[32];

        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(randomBytes);

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(randomBytes);
    }

    public void verifyEmail(String token) {

        EmailVerification verification = emailVerificationRepository
                .findByToken(token)
                .orElseThrow(() ->
                        new InvalidTokenException("Invalid verification token"));

        if (verification.getExpiresAt().isBefore(LocalDateTime.now())) {

            emailVerificationRepository.delete(verification);

            throw new InvalidTokenException(
                    "Verification token has expired"
            );
        }

        User user = verification.getUser();

        user.setEmailVerified(true);

        userRepository.save(user);

        emailVerificationRepository.delete(verification);
    }


}