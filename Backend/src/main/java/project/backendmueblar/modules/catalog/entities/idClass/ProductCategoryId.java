package project.backendmueblar.modules.catalog.entities.idClass;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class ProductCategoryId implements Serializable {

    @Column(name = "id_producto")
    private String productId;

    @Column(name = "id_categoria")
    private Long categoryId;
}