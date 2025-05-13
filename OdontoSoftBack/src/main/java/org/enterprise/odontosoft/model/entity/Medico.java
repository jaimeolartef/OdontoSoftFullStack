package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@Entity
@Table(name = "medico")
@NoArgsConstructor
@AllArgsConstructor
public class Medico {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "medico_id_gen")
	@SequenceGenerator(name = "medico_id_gen", sequenceName = "medico_idmedico_seq", allocationSize = 1)
	@Column(name = "idmedico", nullable = false)
	private Integer idMedico;

	@Size(max = 50)
	@Column(name = "nombre", length = 50)
	private String nombre;

	@Size(max = 50)
	@Column(name = "especialidad", length = 50)
	private String especialidad;

	@Column(name = "matricula", length = Integer.MAX_VALUE)
	private String matricula;

	@NotNull
	@ColumnDefault("1")
	@Column(name = "idtipodocumento", nullable = false)
	private Integer idtipodocumento;

	@Size(max = 30)
	@Column(name = "documento", length = 30)
	private String documento;

	@Column(name = "fechanacimiento")
	private LocalDate fechanacimiento;

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

}