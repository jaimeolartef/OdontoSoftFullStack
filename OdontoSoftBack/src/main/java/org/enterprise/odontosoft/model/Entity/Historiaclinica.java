package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "historiaclinica")
public class Historiaclinica {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('historiaclinica_id_seq'::regclass)")
  @Column(name = "id", nullable = false)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "idpaciente")
  private Paciente idpaciente;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "idusuariocreacion")
  private Tipodocumento idusuariocreacion;

  @Column(name = "fechacreacion")
  private LocalDate fechacreacion;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "idusuariomodificacion")
  private Tipodocumento idusuariomodificacion;

  @Column(name = "fechamodificacion")
  private LocalDate fechamodificacion;

}