package project.backendmueblar.modules.auth.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backendmueblar.modules.auth.dtos.EmailAuthDTO;
import project.backendmueblar.modules.auth.dtos.ResetPasswordDTO;
import project.backendmueblar.modules.auth.dtos.UserAuthDTO;
import project.backendmueblar.modules.auth.dtos.UserCreateDTO;
import project.backendmueblar.modules.auth.services.AuthService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RestControllerAuth {
    private final AuthService authService;

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserCreateDTO userCreateDTO) {
        authService.registerUser(userCreateDTO);

        return ResponseEntity.status(201).body("User registered successfully");
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<Map<String, String>> authenticationUser(@Valid @RequestBody UserAuthDTO userAuthDTO) {
        String tokenJWT = authService.authenticationUser(userAuthDTO);

        Map<String, String> mapJWT = new HashMap<>();
        mapJWT.put("token", tokenJWT);

        return ResponseEntity.status(200).body(mapJWT);
    }

    @PostMapping(value = "/recovery-email", consumes = "application/json")
    public ResponseEntity<?> recoveryEmail(@Valid @RequestBody EmailAuthDTO emailAuthDTO) {
        authService.recoveryEmail(emailAuthDTO);
        return ResponseEntity.status(200).body("Message (Email) sent successfully");
    }

    @PostMapping(value = "/reset-password", consumes = "application/json")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordDTO resetPasswordDTO) {
        authService.resetPassword(resetPasswordDTO);
        return ResponseEntity.status(200).body("Password reset successfully");
    }

    @GetMapping(value = "/token-verification/{token}")
    public ResponseEntity<?> getTokenVerification(@PathVariable("token") String verificationToken) {
        authService.validateToken(verificationToken);
        return ResponseEntity.status(200).build();
    }
}
