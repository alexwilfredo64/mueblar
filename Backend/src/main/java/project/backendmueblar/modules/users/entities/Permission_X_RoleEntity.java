package project.backendmueblar.modules.users.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "rol_permiso")
public class Permission_X_RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol_permiso")
    private Long permissionRoleId;

    @Column(name = "acceso", nullable = false)
    private Boolean access;

    @Column(name = "modificacion", nullable = false)
    private Boolean modification;

    @Column(name = "eliminacion", nullable = false)
    private Boolean delete;

    @Column(name = "creacion", nullable = false)
    private Boolean  create;

    @JoinColumn(name = "id_rol", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private RoleEntity roleEntity;

    @JoinColumn(name = "id_permiso",  nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private PermissionEntity permissionEntity;
}
