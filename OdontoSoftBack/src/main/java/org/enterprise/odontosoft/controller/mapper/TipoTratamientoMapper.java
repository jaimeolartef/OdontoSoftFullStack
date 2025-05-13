package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.entity.TipoTratamiento;
import org.enterprise.odontosoft.view.dto.request.TipoTratamientoRequest;
import org.enterprise.odontosoft.view.dto.response.TipoTratamientoResponse;

public class TipoTratamientoMapper {

	public static TipoTratamiento toEntity(TipoTratamientoRequest tipoTratamientoRequest) {
		return TipoTratamiento.builder()
				.id(tipoTratamientoRequest.getId())
				.descripcion(tipoTratamientoRequest.getDescripcion())
				.habilitado(tipoTratamientoRequest.getHabilitado())
				.build();
	}

	public static TipoTratamientoResponse toResponse(TipoTratamiento tipoTratamiento) {
		return TipoTratamientoResponse.builder()
				.id(tipoTratamiento.getId())
				.codigo(tipoTratamiento.getCodigo())
				.descripcion(tipoTratamiento.getDescripcion())
				.habilitado(tipoTratamiento.getHabilitado())
				.build();
	}
}
