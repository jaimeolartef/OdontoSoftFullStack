package org.enterprise.odontosoft.view.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormulaMedicaRequest {

	private String numeroFormula;
	private LocalDateTime fechaFormulacion;
	private Long pacienteId;
	private Long medicoId;
	private String dosis;
	private String frecuencia;
	private String duracionTratamiento;
	private String cantidadTotal;
	private String instruccionesEspeciales;
	private String observaciones;
	private LocalDate fechaVencimiento;
	private Long estadoMedicamentoId;
	private String estadoMedicamento;
	private Long medicamentoId;
	private Long entidadPrestadoraId;
	private Long idUsuarioCreacion;
	private LocalDate fechaCreacion;
	private Long idUsuarioModificacion;
	private LocalDate fechaModificacion;
	private Boolean habilitado;
}
