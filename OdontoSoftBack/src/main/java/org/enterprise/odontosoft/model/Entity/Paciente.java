package org.enterprise.odontosoft.model.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@NoArgsConstructor
@Entity
@Table(name = "paciente")
@AllArgsConstructor
@Setter
@Getter
public class Paciente {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @ColumnDefault("nextval('paciente_id_seq'::regclass)")
  @Column(name = "id", nullable = false)
  private Integer id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "idtipodocumento")
  private Tipodocumento idtipodocumento;

  @Size(max = 30)
  @Column(name = "documento", length = 30)
  private String documento;

  @Size(max = 20)
  @Column(name = "primernombre", length = 20)
  private String primernombre;

  @Size(max = 20)
  @Column(name = "segundonombre", length = 20)
  private String segundonombre;

  @Size(max = 20)
  @Column(name = "primerapellido", length = 20)
  private String primerapellido;

  @Size(max = 20)
  @Column(name = "segundoapellido", length = 20)
  private String segundoapellido;

  @Column(name = "fechanacimiento")
  private LocalDate fechanacimiento;

  @Size(max = 20)
  @Column(name = "ciudadnacimiento", length = 20)
  private String ciudadnacimiento;

  @Size(max = 1)
  @Column(name = "genero", length = 1)
  private String genero;

  @Size(max = 20)
  @Column(name = "estadocivil", length = 20)
  private String estadocivil;

  @Size(max = 50)
  @Column(name = "direccionresidencia", length = 50)
  private String direccionresidencia;

  @Size(max = 20)
  @Column(name = "ciudadresidencia", length = 20)
  private String ciudadresidencia;

  @Size(max = 20)
  @Column(name = "telefono", length = 20)
  private String telefono;

  @Size(max = 50)
  @Column(name = "correo", length = 50)
  private String correo;

  @Size(max = 50)
  @Column(name = "nombreacompanante", length = 50)
  private String nombreacompanante;

  @Size(max = 20)
  @Column(name = "parentescoacompanante", length = 20)
  private String parentescoacompanante;

  @Size(max = 20)
  @Column(name = "telefonoacompanante", length = 20)
  private String telefonoacompanante;

  @Column(name = "habilitado")
    private boolean habilitado;

  @OneToMany(mappedBy = "idpaciente")
  private Set<Cita> citas = new LinkedHashSet<>();

  @OneToMany(mappedBy = "idpaciente")
  private Set<Historiaclinica> historiaclinicas = new LinkedHashSet<>();

}