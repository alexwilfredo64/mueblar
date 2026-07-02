package project.backendmueblar.modules.catalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backendmueblar.modules.auth.entities.RecoveryTokenEntity;
import project.backendmueblar.modules.catalog.entities.ProductEntity;

import java.util.Optional;

@Repository
public interface RepositoryProduct extends JpaRepository<ProductEntity, String> {
    Optional<ProductEntity> findByModelName(String modelName);
}
