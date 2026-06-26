package project.backendmueblar.modules.users.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "modulo")
public class ModuleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_modulo")
    private long moduleId;

    @Column(name = "descripcion", nullable = true)
    private String description;

    @OneToMany(mappedBy = "moduleEntity",  fetch = FetchType.LAZY, orphanRemoval = true)
    private List<PermissionEntity> permissionEntities;
}
