package org.enterprise.odontosoft.view.dto.response;

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
public class FormulaMedicaResponse {

	private Long id;
	private String numeroFormula;
	private LocalDateTime fechaFormulacion;
	private Long pacienteId;
	private Long medicoId;
	private String diagnosticoPrincipal;
	private String diagnosticosSecundarios;
	private String dosis;
	private String frecuencia;
	private String duracionTratamiento;
	private String cantidadTotal;
	private String instruccionesEspeciales;
	private String observaciones;
	private LocalDate fechaVencimiento;
	private EstadoMedicamentoResponse estadoMedicamento;
	private MedicamentoResponse medicamento;
	private Long entidadPrestadoraId;
	private Long idUsuarioCreacion;
	private LocalDate fechaCreacion;
	private Long idUsuarioModificacion;
	private LocalDate fechaModificacion;
	private Boolean habilitado;
	private HistoriaClinicaResponse historiaClinica;
}
