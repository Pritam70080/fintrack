package com.example.fintrack.service;

import com.example.fintrack.dto.auth.LoginRequest;
import com.example.fintrack.dto.auth.LoginResponse;
import com.example.fintrack.dto.auth.RegisterRequest;
import com.example.fintrack.dto.auth.UserProfileResponse;
import com.example.fintrack.entity.User;
import com.example.fintrack.enums.AuthProvider;
import com.example.fintrack.enums.Role;
import com.example.fintrack.exception.BadRequestException;
import com.example.fintrack.exception.ResourceNotFoundException;
import com.example.fintrack.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
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
                .profileImage(user.getProfileImage())
                .build();
    }
    public LoginResponse loginWithGoogle(OAuth2User oauth2User) {

        String email = oauth2User.getAttribute("email");
        String googleName = oauth2User.getAttribute("name");
        String profileImage = oauth2User.getAttribute("picture");

        if (email == null || email.isBlank()) {
            throw new BadRequestException(
                    "Unable to retrieve email from Google"
            );
        }

        if (googleName == null || googleName.isBlank()) {
            String givenName = oauth2User.getAttribute("given_name");
            if (givenName != null && !givenName.isBlank()) {
                googleName = givenName;
            } else {
                int emailSeparator = email.indexOf('@');
                googleName = emailSeparator > 0
                        ? email.substring(0, emailSeparator)
                        : email;
            }
        }
        String resolvedName = googleName;

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> createGoogleUser(
                        resolvedName,
                        email,
                        profileImage
                ));

        if (user.getProvider() != AuthProvider.GOOGLE) {
            throw new BadRequestException(
                    "An account already exists with this email. " +
                            "Please login using email and password."
            );
        }

        if (profileImage != null
                && !profileImage.equals(user.getProfileImage())) {
            user.setProfileImage(profileImage);
            userRepository.save(user);
        }

        String accessToken = jwtService.generateToken(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .tokenType("Bearer")
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .profileImage(user.getProfileImage())
                .build();
    }

    public UserProfileResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with id: " + userId
                ));

        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .profileImage(user.getProfileImage())
                .build();
    }

    private User createGoogleUser(
            String name,
            String email,
            String profileImage
    ) {

        User user = User.builder()
                .name(name)
                .email(email)
                .profileImage(profileImage)
                .password(null)
                .role(Role.USER)
                .provider(AuthProvider.GOOGLE)
                .emailVerified(true)
                .build();

        return userRepository.save(user);
    }
}
