package org.project.backend.dto.user.Response;

import lombok.Data;

@Data
public class RegistrationResponse {
    private String message;
    private String token;

    public RegistrationResponse(String message, String token) {
        this.message = message;
        this.token = token;
    }

    // getters and setters
}