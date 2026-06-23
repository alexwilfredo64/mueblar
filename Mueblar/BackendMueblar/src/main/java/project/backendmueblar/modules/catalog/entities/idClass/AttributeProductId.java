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
public class AttributeProductId implements Serializable {

    @Column(name = "id_producto")
    private String productId;

    @Column(name = "id_atributo")
    private String attributeId;
}