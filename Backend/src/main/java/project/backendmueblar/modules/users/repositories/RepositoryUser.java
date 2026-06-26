package project.backendmueblar.modules.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.backendmueblar.modules.users.entities.UserEntity;

import java.util.Optional;

public interface RepositoryUser extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
}
