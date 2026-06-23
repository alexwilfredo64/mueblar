package project.backendmueblar.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionController {
    private static Map<String, List<Map<String, String>>> buildErrorResponse (RuntimeException exception) {
        List<Map<String, String>> errorsList = new ArrayList<>();
        Map<String, String> mapMessageError = new HashMap<>();
        mapMessageError.put("message", exception.getMessage());
        errorsList.add(mapMessageError);

        Map<String, List<Map<String, String>>> responseMap = new HashMap<>();
        responseMap.put("errors", errorsList);

        return responseMap;
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Map<String, List<Map<String, String>>>> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
        return ResponseEntity.status(409).body(buildErrorResponse(ex));
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<Map<String, List<Map<String, String>>>> handleRoleNotFound(RoleNotFoundException ex) {
        return ResponseEntity.status(500).body(buildErrorResponse(ex));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<Map<String, String>>>> handleValidationErrors(MethodArgumentNotValidException ex) {

        List<Map<String, String>> errorsList = new ArrayList<>();

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            Map<String, String> mapMessageError = new HashMap<>();
            mapMessageError.put("message",  fieldError.getDefaultMessage());
            errorsList.add(mapMessageError);
        }

        Map<String, List<Map<String, String>>> responseMap = new HashMap<>();
        responseMap.put("errors", errorsList);

        return ResponseEntity.status(400).body(responseMap);
    }

}