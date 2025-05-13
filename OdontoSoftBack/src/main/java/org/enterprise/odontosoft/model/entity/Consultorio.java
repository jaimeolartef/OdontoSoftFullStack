package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "consultorio")
public class Consultorio {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('consultorio_id_seq'::regclass)")
  @Column(name = "idConsultorio", nullable = false)
  private Integer idConsultorio;

  @Column(name = "nombre", length = 50)
  private String nombre;
}
