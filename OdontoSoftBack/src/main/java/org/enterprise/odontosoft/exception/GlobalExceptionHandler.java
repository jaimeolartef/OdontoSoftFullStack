package org.enterprise.odontosoft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Map<String, String>> handleCustomException(CustomException ex, WebRequest request) {
        Map<String, String> errorDetails = new HashMap<>();
        errorDetails.put("error", "An unexpected error occurred");
        errorDetails.put("details", ex.getMessage());
        HttpStatus httpStatus = HttpStatus.resolve(ex.getStatusCode());
        return new ResponseEntity<>(errorDetails, httpStatus != null ? httpStatus : HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Excepción genérica para capturar cualquier otra excepción
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleAllExceptions(Exception ex, WebRequest request) {
        Map<String, String> errorDetails = new HashMap<>();
        errorDetails.put("error", "Error interno del servidor");
        errorDetails.put("details", ex.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}