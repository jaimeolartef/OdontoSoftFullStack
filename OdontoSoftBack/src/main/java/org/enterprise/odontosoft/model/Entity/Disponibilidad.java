package org.enterprise.odontosoft.model.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "disponibilidad")
public class Disponibilidad {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('disponibilidad_id_seq'::regclass)")
  @Column(name = "idDisponibilidad", nullable = false)
  private Integer idDisponibilidad;

  @Column(name = "idMedico")
  private Integer idMedico;

  @Column(name = "diaSemana")
  private Integer diaSemana;

  @Column(name = "horaInicio")
  private LocalTime horaInicio;

  @Column(name = "horaFin")
  private LocalTime horaFin;

  @Column(name = "idConsultorio")
  private Integer idConsultorio;
}
