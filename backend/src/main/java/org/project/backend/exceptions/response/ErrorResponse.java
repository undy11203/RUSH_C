package org.project.backend.exceptions.response;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ErrorResponse {
    private LocalDateTime timestamp;
    private String message;
    private List<String> details;

    public ErrorResponse(String message, List<String> details) {
        this.timestamp = LocalDateTime.now();
        this.message = message;
        this.details = details;
    }
}