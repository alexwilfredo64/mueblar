package project.backendmueblar.modules.catalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backendmueblar.modules.catalog.entities.ThumbnailEntity;

@Repository
public interface RepositoryThumbnail extends JpaRepository<ThumbnailEntity, Long> {
}
