package project.backendmueblar.modules.auth.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backendmueblar.modules.auth.entities.RecoveryTokenEntity;

@Repository
public interface RepositoryRecoveryToken extends JpaRepository<RecoveryTokenEntity, Long> {

}
