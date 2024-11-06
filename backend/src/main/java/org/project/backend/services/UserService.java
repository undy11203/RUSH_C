package org.project.backend.services;

import lombok.RequiredArgsConstructor;
import org.project.backend.dao.UserRepository;
import org.project.backend.dto.user.Request.LoginRequest;
import org.project.backend.dto.user.Request.RegistrationRequest;
import org.project.backend.exceptions.error.EmailAlreadyExistsException;
import org.project.backend.exceptions.error.UsernameAlreadyExistsException;
import org.project.backend.models.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void registerUser(RegistrationRequest registrationRequest) {
        if (userRepository.findByUsername(registrationRequest.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }
        if (userRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setEmail(registrationRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setRole("USER");
        user.setCiTokens(0);
        userRepository.save(user);
    }

    public boolean loginUser(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash());
        }
        return false;
    }

    public void logoutUser() {

    }

    public void fastRegisterUser(OAuth2AuthenticationToken authentication) {
        String email = authentication.getPrincipal().getAttribute("email");
        String username = authentication.getPrincipal().getAttribute("name");

        if (userRepository.findByEmail(email).isEmpty() && userRepository.findByUsername(username).isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPasswordHash(passwordEncoder.encode("default_password")); // Set a default password or generate a random one
            user.setCreatedAt(LocalDateTime.now());
            user.setRole("USER");
            user.setCiTokens(0);
            userRepository.save(user);
        }
    }

    public boolean fastLoginUser(OAuth2AuthenticationToken authentication) {
        String email = authentication.getPrincipal().getAttribute("email");
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.isPresent();
    }
}
