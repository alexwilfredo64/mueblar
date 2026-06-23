package project.backendmueblar.modules.users.repositories;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;
import project.backendmueblar.modules.users.entities.RoleEntity;
import project.backendmueblar.modules.users.entities.UserEntity;

import java.util.Optional;

@Repository
public interface RepositoryRole extends JpaRepositoryImplementation<RoleEntity, Long> {
    Optional<RoleEntity> findByRoleName(String roleName);
}
