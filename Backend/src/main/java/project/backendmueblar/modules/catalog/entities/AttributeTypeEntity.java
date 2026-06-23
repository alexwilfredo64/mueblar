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
@Table(name = "tipo_atributo")
public class AttributeTypeEntity {

    @Id
    @Column(name = "id_tipo_atributo")
    private String attributeTypeId;

    @Column(name = "descripcion", nullable = true)
    private String description;

    @OneToMany(mappedBy = "attributeTypeEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AttributeEntity> attributeEntities;
}
