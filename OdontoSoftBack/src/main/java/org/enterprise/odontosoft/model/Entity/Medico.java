package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "medico")
public class Medico {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('medico_id_seq'::regclass)")
  @Column(name = "idMedico", nullable = false)
  private Integer idMedico;

  @Column(name = "nombre", length = 50)
  private String nombre;

  @Column(name = "especialidad", length = 50)
  private String especialidad;

  @Column(name = "horarioLaboral")
  private LocalTime horarioLaboral;

  @Column(name = "consultorio")
  private Integer consultorio;

}
