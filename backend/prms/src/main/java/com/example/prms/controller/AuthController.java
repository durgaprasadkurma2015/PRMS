package com.example.prms.controller;

//package com.example.login.controller;

import com.example.prms.entity.User;
import com.example.prms.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public Map<String, String> register(
            @RequestBody Map<String, String> data) {

        User user = new User();

        user.setUsername(data.get("username"));
        user.setName(data.get("name"));
        user.setRole(data.get("role"));

        if (data.get("dob") != null &&
            !data.get("dob").isEmpty()) {

            user.setDateOfBirth(
                java.time.LocalDate.parse(
                    data.get("dob")
                )
            );
        }

        user.setGender(data.get("gender"));
        user.setPassword(data.get("password"));
        user.setContact(data.get("contact"));
        user.setEmail(data.get("email"));
        user.setAddress(data.get("address"));

        String result =
                authService.register(
                    user,
                    data.get("confirmPassword")
                );

        if (result.equals(
                "Registration successful.")) {

            return Map.of(
                "success", "true",
                "message", result
            );
        }

        return Map.of(
            "success", "false",
            "message", result
        );
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody Map<String, String> data) {

        String username =
                data.get("username");

        String password =
                data.get("password");

        String result =
                authService.login(
                    username,
                    password
                );

        if (result.equals(
                "Login successful.")) {

            return Map.of(
                "success", "true",
                "message", result
            );
        }

        return Map.of(
            "success", "false",
            "message", result
        );
    }


    // =========================
    // RESET PASSWORD
    // =========================

    @PostMapping("/reset-password")
    public Map<String, String> resetPassword(
            @RequestBody Map<String, String> data) {

        String result =
                authService.resetPassword(
                    data.get("username"),
                    data.get("password"),
                    data.get("confirmPassword")
                );

        if (result.equals(
                "Password reset successful.")) {

            return Map.of(
                "success", "true",
                "message", result
            );
        }

        return Map.of(
            "success", "false",
            "message", result
        );
    }
}
