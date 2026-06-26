package project.backendmueblar.exception;

public class PasswordNotMatchWithUserException extends RuntimeException {
    public PasswordNotMatchWithUserException(String message) {
        super(message);
    }
}
