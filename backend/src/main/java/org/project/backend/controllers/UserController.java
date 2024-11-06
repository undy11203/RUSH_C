package org.project.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.project.backend.dto.user.Request.LoginRequest;
import org.project.backend.dto.user.Request.RegistrationRequest;
import org.project.backend.dto.user.Response.LoginResponse;
import org.project.backend.dto.user.Response.LogoutResponse;
import org.project.backend.dto.user.Response.RegistrationResponse;
import org.project.backend.mapper.UserMapper;
import org.project.backend.services.UserService;
import org.project.backend.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping("/registration")
    public ResponseEntity<RegistrationResponse> registration(@Valid @RequestBody RegistrationRequest registrationRequest) {
        userService.registerUser(registrationRequest);
        String token = JwtUtil.generateToken(registrationRequest.getUsername());
        return ResponseEntity.ok(new RegistrationResponse("Registration successful!", token));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        boolean success = userService.loginUser(loginRequest);
        if (success) {
            String token = JwtUtil.generateToken(loginRequest.getUsername());
            return ResponseEntity.ok(new LoginResponse("Login successful!", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Login failed!", null));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout() {
        userService.logoutUser();
        return ResponseEntity.ok(new LogoutResponse("Logout successful!"));
    }

    @PostMapping("/fast-registration")
    public ResponseEntity<RegistrationResponse> fastRegistration(@AuthenticationPrincipal OAuth2AuthenticationToken authentication) {
        userService.fastRegisterUser(authentication);
        String token = JwtUtil.generateToken(authentication.getName());
        return ResponseEntity.ok(new RegistrationResponse("Fast registration successful!", token));
    }

    @PostMapping("/fast-login")
    public ResponseEntity<LoginResponse> fastLogin(@AuthenticationPrincipal OAuth2AuthenticationToken authentication) {
        boolean success = userService.fastLoginUser(authentication);
        if (success) {
            String token = JwtUtil.generateToken(authentication.getName());
            return ResponseEntity.ok(new LoginResponse("Fast login successful!", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Fast login failed!", null));
        }
    }
}
