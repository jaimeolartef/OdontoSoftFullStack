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
  @Column(name = "iddisponibilidad", nullable = false)
  private Integer idDisponibilidad;

  @Column(name = "idmedico")
  private Integer idMedico;

  @Column(name = "diasemana")
  private Integer diaSemana;

  @Column(name = "horainicioam")
  private LocalTime horaInicio;

  @Column(name = "horafinam")
  private LocalTime horaFin;

  @Column(name = "horainiciopm")
  private LocalTime horainiciopm;

  @Column(name = "horafinpm")
  private LocalTime horafinpm;

  @Column(name = "idconsultorio")
  private Integer idConsultorio;
}
