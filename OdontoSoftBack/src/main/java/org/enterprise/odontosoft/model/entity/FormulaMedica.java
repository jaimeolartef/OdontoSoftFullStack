package org.enterprise.odontosoft.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "formulamedica")
public class FormulaMedica {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "numeroformula", nullable = false, unique = true, length = 50)
	private String numeroFormula;

	@Column(name = "fechaformulacion", nullable = false)
	private LocalDateTime fechaFormulacion = LocalDateTime.now();

	@Column(name = "pacienteid", nullable = false)
	private Long pacienteId;

	@Column(name = "medicoid", nullable = false)
	private Long medicoId;

	@Column(name = "dosis", nullable = false, length = 200)
	private String dosis;

	@Column(name = "frecuencia", nullable = false, length = 100)
	private String frecuencia;

	@Column(name = "duraciontratamiento", nullable = false, length = 100)
	private String duracionTratamiento;

	@Column(name = "cantidadtotal", nullable = false, length = 50)
	private String cantidadTotal;

	@Column(name = "instruccionesespeciales", columnDefinition = "TEXT")
	private String instruccionesEspeciales;

	@Column(name = "observaciones", columnDefinition = "TEXT")
	private String observaciones;

	@Column(name = "fechavencimiento")
	private LocalDate fechaVencimiento;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "estadomedicamentoid", nullable = false)
	private EstadoMedicamento estadoMedicamento;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "medicamentoid", nullable = false)
	private Medicamento medicamento;

	@Column(name = "entidadprestadoraid")
	private Long entidadPrestadoraId;

	@Column(name = "idusuariocreacion", nullable = false)
	private Long idUsuarioCreacion;

	@Column(name = "fechacreacion", nullable = false)
	private LocalDate fechaCreacion = LocalDate.now();

	@Column(name = "idusuariomodificacion")
	private Long idUsuarioModificacion;

	@Column(name = "fechamodificacion")
	private LocalDate fechaModificacion;

	@Column(name = "habilitado", nullable = false)
	private Boolean habilitado = true;
}
