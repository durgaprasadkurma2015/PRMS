package com.example.prms.service;

//package com.example.prms.service;

import com.example.prms.entity.User;
import com.example.prms.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // =========================
    // REGISTER
    // =========================

    public String register(User user, String confirmPassword) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already exists.";
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists.";
        }

        if (!user.getPassword().equals(confirmPassword)) {
            return "Passwords do not match.";
        }

        // Encrypt password before saving
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        userRepository.save(user);

        return "Registration successful.";
    }


    // =========================
    // LOGIN
    // =========================

    public String login(
            String username,
            String password) {

        User user =
                userRepository
                        .findByUsername(username)
                        .orElse(null);

        if (user == null) {
            return "Invalid username or password.";
        }

        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            return "Invalid username or password.";
        }

        return "Login successful.";
    }


    // =========================
    // RESET PASSWORD
    // =========================

    public String resetPassword(
            String username,
            String password,
            String confirmPassword) {

        User user =
                userRepository
                        .findByUsername(username)
                        .orElse(null);

        if (user == null) {
            return "Username not found.";
        }

        if (!password.equals(confirmPassword)) {
            return "Passwords do not match.";
        }

        if (password.length() < 6) {
            return "Password must contain at least 6 characters.";
        }

        user.setPassword(
                passwordEncoder.encode(password)
        );

        userRepository.save(user);

        return "Password reset successful.";
    }
}

