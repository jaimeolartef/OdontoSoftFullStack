package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tipodocumento")
public class Tipodocumento {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('tipodocumento_id_seq'::regclass)")
  @Column(name = "id", nullable = false)
  private Integer id;

  @Size(max = 10)
  @Column(name = "codigo", length = 10)
  private String codigo;

  @Size(max = 20)
  @Column(name = "nombre", length = 20)
  private String nombre;

  @OneToMany(mappedBy = "idtipodocumento")
  private Set<Paciente> pacientes = new LinkedHashSet<>();

}