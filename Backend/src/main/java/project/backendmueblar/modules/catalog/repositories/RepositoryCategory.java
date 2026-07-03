package project.backendmueblar.modules.catalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backendmueblar.modules.catalog.entities.CategoryEntity;

import java.util.Optional;

@Repository
public interface RepositoryCategory extends JpaRepository<CategoryEntity, Long> {
    Optional<CategoryEntity> findByCategoryId(Long categoryId);
}
