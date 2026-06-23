package project.backendmueblar.modules.catalog.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.backendmueblar.modules.catalog.entities.idClass.AttributeProductId;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "filtro_producto")
public class Attribute_X_ProductEntity {
    @EmbeddedId
    private AttributeProductId attributeProductId = new AttributeProductId();

    @JoinColumn(name = "id_producto", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    private ProductEntity productEntity;

    @JoinColumn(name = "id_atributo", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("attributeId")
    private AttributeEntity attributeEntity;

}
