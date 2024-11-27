package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "medico")
public class Medico {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('medico_id_seq'::regclass)")
  @Column(name = "idmedico", nullable = false)
  private Integer idMedico;

  @Column(name = "nombre", length = 50)
  private String nombre;

  @Column(name = "especialidad", length = 50)
  private String especialidad;

  @Column(name = "matricula")
  private String matricula;

}
