package project.backendmueblar.modules.catalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backendmueblar.modules.catalog.entities.Product_X_CategoryEntity;
import project.backendmueblar.modules.catalog.entities.idClass.ProductCategoryId;

@Repository
public interface RepositoryProduct_X_Category extends JpaRepository<Product_X_CategoryEntity, ProductCategoryId> {
}
