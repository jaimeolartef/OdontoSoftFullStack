package org.enterprise.odontosoft.controller.mapper;


import org.enterprise.odontosoft.model.entity.EstadoMedicamento;
import org.enterprise.odontosoft.model.entity.FormulaMedica;
import org.enterprise.odontosoft.view.dto.request.FormulaMedicaRequest;
import org.enterprise.odontosoft.view.dto.response.EstadoMedicamentoResponse;
import org.enterprise.odontosoft.view.dto.response.FormulaMedicaResponse;

public class FormulaMedicaMapper {

	private FormulaMedicaMapper() {
		// Private constructor to prevent instantiation
	}

	public static FormulaMedicaResponse toResponse(FormulaMedica formulaMedica) {
		if (formulaMedica == null) {
			return null;
		}

		return FormulaMedicaResponse.builder()
			.id(formulaMedica.getId())
			.numeroFormula(formulaMedica.getNumeroFormula())
			.fechaFormulacion(formulaMedica.getFechaFormulacion())
			.pacienteId(formulaMedica.getPacienteId())
			.medicoId(formulaMedica.getMedicoId())
			.diagnosticoPrincipal(formulaMedica.getDiagnosticoPrincipal())
			.diagnosticosSecundarios(formulaMedica.getDiagnosticosSecundarios())
			.dosis(formulaMedica.getDosis())
			.frecuencia(formulaMedica.getFrecuencia())
			.duracionTratamiento(formulaMedica.getDuracionTratamiento())
			.cantidadTotal(formulaMedica.getCantidadTotal())
			.instruccionesEspeciales(formulaMedica.getInstruccionesEspeciales())
			.observaciones(formulaMedica.getObservaciones())
			.fechaVencimiento(formulaMedica.getFechaVencimiento())
			.estadoMedicamento(EstadoMedicamentoResponse.builder()
				.id(formulaMedica.getEstadoMedicamento().getId())
				.descripcion(formulaMedica.getEstadoMedicamento().getDescripcion()).build()
			)
			.medicamento(MedicamentoMapper.toResponse(formulaMedica.getMedicamento()))
			.entidadPrestadoraId(formulaMedica.getEntidadPrestadoraId())
			.idUsuarioCreacion(formulaMedica.getIdUsuarioCreacion())
			.fechaCreacion(formulaMedica.getFechaCreacion())
			.idUsuarioModificacion(formulaMedica.getIdUsuarioModificacion())
			.fechaModificacion(formulaMedica.getFechaModificacion())
			.habilitado(formulaMedica.getHabilitado())
			.build();
	}

	public static FormulaMedica toEntity(FormulaMedicaRequest formulaMedicaRequest) {
		if (formulaMedicaRequest == null) {
			return null;
		}

		FormulaMedica formulaMedica = new FormulaMedica();
		formulaMedica.setNumeroFormula(formulaMedicaRequest.getNumeroFormula());
		formulaMedica.setFechaFormulacion(formulaMedicaRequest.getFechaFormulacion());
		formulaMedica.setPacienteId(formulaMedicaRequest.getPacienteId());
		formulaMedica.setMedicoId(formulaMedicaRequest.getMedicoId());
		formulaMedica.setDiagnosticoPrincipal(formulaMedicaRequest.getDiagnosticoPrincipal());
		formulaMedica.setDiagnosticosSecundarios(formulaMedicaRequest.getDiagnosticosSecundarios());
		formulaMedica.setDosis(formulaMedicaRequest.getDosis());
		formulaMedica.setFrecuencia(formulaMedicaRequest.getFrecuencia());
		formulaMedica.setDuracionTratamiento(formulaMedicaRequest.getDuracionTratamiento());
		formulaMedica.setCantidadTotal(formulaMedicaRequest.getCantidadTotal());
		formulaMedica.setInstruccionesEspeciales(formulaMedicaRequest.getInstruccionesEspeciales());
		formulaMedica.setObservaciones(formulaMedicaRequest.getObservaciones());
		formulaMedica.setFechaVencimiento(formulaMedicaRequest.getFechaVencimiento());
		formulaMedica.setEstadoMedicamento(EstadoMedicamento.builder().id(formulaMedicaRequest.getEstadoMedicamentoId()).build());
		formulaMedica.setEntidadPrestadoraId(formulaMedicaRequest.getEntidadPrestadoraId());
		formulaMedica.setIdUsuarioCreacion(formulaMedicaRequest.getIdUsuarioCreacion());
		formulaMedica.setFechaCreacion(formulaMedicaRequest.getFechaCreacion());
		formulaMedica.setIdUsuarioModificacion(formulaMedicaRequest.getIdUsuarioModificacion());
		formulaMedica.setFechaModificacion(formulaMedicaRequest.getFechaModificacion());
		formulaMedica.setHabilitado(formulaMedicaRequest.getHabilitado());

		return formulaMedica;
	}
}
