package com.example.fintrack.service;

import com.example.fintrack.dto.auth.LoginRequest;
import com.example.fintrack.dto.auth.LoginResponse;
import com.example.fintrack.dto.auth.RegisterRequest;
import com.example.fintrack.entity.User;
import com.example.fintrack.enums.AuthProvider;
import com.example.fintrack.enums.Role;
import com.example.fintrack.exception.BadRequestException;
import com.example.fintrack.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailVerificationService emailVerificationService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .provider(AuthProvider.LOCAL)
                .emailVerified(false)
                .build();

        userRepository.save(user);
        emailVerificationService.createVerificationToken(user);
    }

    public void verifyEmail(String token) {
        emailVerificationService.verifyEmail(token);
    }

    public LoginResponse login(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new BadRequestException("User not found")
                );

        String accessToken = jwtService.generateToken(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .tokenType("Bearer")
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
