package org.enterprise.odontosoft.controller.mapper;


import org.enterprise.odontosoft.model.entity.EstadoMedicamento;
import org.enterprise.odontosoft.view.dto.request.EstadoMedicamentoRequest;
import org.enterprise.odontosoft.view.dto.response.EstadoMedicamentoResponse;

public class EstadoMedicamentoMapper {

	private EstadoMedicamentoMapper() {
		// Private constructor to prevent instantiation
	}

	public static EstadoMedicamentoResponse toResponse(EstadoMedicamento estadoMedicamento) {
		if (estadoMedicamento == null) {
			return null;
		}

		return EstadoMedicamentoResponse.builder()
			.id(estadoMedicamento.getId())
			.nombre(estadoMedicamento.getNombre())
			.descripcion(estadoMedicamento.getDescripcion())
			.habilitado(estadoMedicamento.getHabilitado())
			.build();
	}

	public static EstadoMedicamento toEntity(EstadoMedicamentoRequest estadoMedicamentoRequest) {
		if (estadoMedicamentoRequest == null) {
			return null;
		}

		EstadoMedicamento estadoMedicamento = new EstadoMedicamento();
		estadoMedicamento.setNombre(estadoMedicamentoRequest.getNombre());
		estadoMedicamento.setDescripcion(estadoMedicamentoRequest.getDescripcion());
		estadoMedicamento.setHabilitado(estadoMedicamentoRequest.getHabilitado());

		return estadoMedicamento;
	}
}
