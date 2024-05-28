package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "menu")
public class Menu {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('menu_id_seq'::regclass)")
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 50)
  @NotNull
  @Column(name = "descripcion", nullable = false, length = 50)
  private String descripcion;

  @Column(name = "id_menu_padre")
  private Integer idMenuPadre;

  @Size(max = 100)
  @Column(name = "url", length = 100)
  private String url;

  @NotNull
  @ColumnDefault("false")
  @Column(name = "habilitado", nullable = false)
  private Boolean habilitado = false;

}