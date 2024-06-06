package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "rol")
public class Rol {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('rol_id_seq'::regclass)")
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 200)
  @NotNull
  @Column(name = "descripcion", nullable = false, length = 200)
  private String descripcion;

  @NotNull
  @ColumnDefault("false")
  @Column(name = "habilitado", nullable = false)
  private Boolean habilitado = false;

  @OneToMany(mappedBy = "idRol")
  private Set<Usuario> usuarios = new LinkedHashSet<>();

  @OneToMany(mappedBy = "idRol")
  private Set<PermisoMenu> permisoMenusRol = new LinkedHashSet<>();

}