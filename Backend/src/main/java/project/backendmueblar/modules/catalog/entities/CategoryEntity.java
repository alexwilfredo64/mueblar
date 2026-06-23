package project.backendmueblar.modules.catalog.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "categoria")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long idCategory;

    @Column(name = "nombre_categoria", nullable = false)
    private String nameCategory;

    @OneToMany(mappedBy = "categoryEntity")
    private List<Product_X_CategoryEntity> productCategories;

}
