package project.backendmueblar.modules.auth.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.backendmueblar.modules.auth.dtos.UserCreateDTO;
import project.backendmueblar.modules.auth.services.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RestControllerRegister {

    private final AuthService authService;

    @PostMapping(value = "/register", consumes = {"application/json","application/xml"})
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserCreateDTO userCreateDTO) {
        authService.registerUser(userCreateDTO);

        return ResponseEntity.status(201).body("User registered successfully");
    }
}
