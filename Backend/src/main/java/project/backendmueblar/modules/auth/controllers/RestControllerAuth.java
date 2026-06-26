package project.backendmueblar.modules.auth.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping(value = "/register", consumes = {"application/json","application/xml"})
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserCreateDTO userCreateDTO) {
        authService.registerUser(userCreateDTO);

        return ResponseEntity.status(201).body("User registered successfully");
    }

    @PostMapping(value = "/login", consumes = {"application/json","application/xml"})
    public ResponseEntity<Map<String, String>> authenticationUser(@Valid @RequestBody UserAuthDTO userAuthDTO) {
        String tokenJWT = authService.loginUser(userAuthDTO);

        Map<String, String> mapJWT = new HashMap<>();
        mapJWT.put("token", tokenJWT);

        return ResponseEntity.status(200).body(mapJWT);
    }
}
