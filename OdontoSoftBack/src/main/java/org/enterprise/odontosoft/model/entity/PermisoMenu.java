package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "permiso_menu")
public class PermisoMenu {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('permiso_menu_id_seq'::regclass)")
  @Column(name = "id", nullable = false)
  private Integer id;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "id_rol", referencedColumnName = "id", nullable = false)
  private Rol idRol;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "id_menu", referencedColumnName = "id", nullable = false)
  private Menu idMenu;

  @Column(name = "habilitado")
  private Boolean habilitado;

  @NotNull
  @Column(name = "crear")
  private Boolean crear;

  @NotNull
    @Column(name = "editar")
    private Boolean editar;

    @NotNull
    @Column(name = "eliminar")
    private Boolean eliminar;

    @NotNull
    @Column(name = "consultar")
    private Boolean consultar;

}