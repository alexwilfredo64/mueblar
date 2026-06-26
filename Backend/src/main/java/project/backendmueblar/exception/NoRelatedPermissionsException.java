package project.backendmueblar.exception;

public class NoRelatedPermissionsException extends RuntimeException {
    public NoRelatedPermissionsException(String message) {
        super(message);
    }
}
