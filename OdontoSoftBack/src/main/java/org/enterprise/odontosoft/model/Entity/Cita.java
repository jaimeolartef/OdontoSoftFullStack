package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "cita")
public class Cita {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('cita_id_seq'::regclass)")
  @Column(name = "id", nullable = false)
  private Integer id;

  @Column(name = "fecha")
  private LocalDate fecha;

  @Column(name = "horainicio")
  private LocalTime horainicio;

  @Column(name = "horafin")
  private LocalTime horafin;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "idpaciente")
  private Paciente idpaciente;

  @Column(name = "habilitado")
  private Boolean habilitado;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "idMedico")
  private Medico idMedico;

  @Column(name = "fechaNotificacion")
  private LocalDate fechaNotificacion;

  @Column(name = "motivoCancelacion")
  private String motivoCancelacion;

}