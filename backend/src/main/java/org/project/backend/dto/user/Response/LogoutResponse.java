package org.project.backend.dto.user.Response;

import lombok.Data;

@Data
public class LogoutResponse {
    private String message;

    public LogoutResponse(String message) {
        this.message = message;
    }

    // getters and setters
}