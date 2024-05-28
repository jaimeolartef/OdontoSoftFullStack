package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "usuario")
public class Usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('usuario_id_seq'::regclass)")
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 50)
  @NotNull
  @Column(name = "nombre", nullable = false, length = 50)
  private String nombre;

  @NotNull
  @Column(name = "clave", nullable = false, length = Integer.MAX_VALUE)
  private String clave;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "id_rol", nullable = false)
  private Rol idRol;

  @NotNull
  @ColumnDefault("false")
  @Column(name = "habilitado", nullable = false)
  private Boolean habilitado = false;

  @Size(max = 20)
  @Column(name = "codigo", length = 20)
  private String codigo;

  @Builder
  public Usuario(Integer id, String nombre, String clave, Rol idRol, Boolean habilitado, String codigo) {
    this.id = id;
    this.nombre = nombre;
    this.clave = clave;
    this.idRol = idRol;
    this.habilitado = habilitado;
    this.codigo = codigo;
  }

}