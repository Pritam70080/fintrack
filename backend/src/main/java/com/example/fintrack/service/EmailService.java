package com.example.fintrack.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String from;

    public void sendVerificationEmail(
            String recipientEmail,
            String verificationLink
    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(from);
        message.setTo(recipientEmail);
        message.setSubject("Verify your FinTrack account");

        message.setText("""
                Hello,

                Thank you for registering with FinTrack.

                Please verify your email address by clicking the link below:

                %s

                This verification link will expire in 15 minutes.

                If you did not create this account, you can safely ignore this email.

                Regards,
                FinTrack Team
                """.formatted(verificationLink));

        mailSender.send(message);
    }
}
