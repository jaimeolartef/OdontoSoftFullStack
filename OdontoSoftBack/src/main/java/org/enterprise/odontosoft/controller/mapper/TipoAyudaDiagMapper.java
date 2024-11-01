package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.Entity.TipoAyudaDiag;
import org.enterprise.odontosoft.view.dto.request.TipoAyudaDiagRequest;
import org.enterprise.odontosoft.view.dto.response.TipoAyudaDiagResponse;

public class TipoAyudaDiagMapper {

	public static TipoAyudaDiagResponse toResponse(TipoAyudaDiag tipoAyudaDiag) {
		return TipoAyudaDiagResponse.builder()
				.id(tipoAyudaDiag.getId())
				.codigo(tipoAyudaDiag.getCodigo())
				.descripcion(tipoAyudaDiag.getDescripcion())
				.habilitado(tipoAyudaDiag.getHabilitado())
				.build();
	}

	public static TipoAyudaDiag toEntity(TipoAyudaDiagRequest tipoAyudaDiagRequest) {
		return TipoAyudaDiag.builder()
				.id(tipoAyudaDiagRequest.getId())
				.codigo(tipoAyudaDiagRequest.getCodigo())
				.descripcion(tipoAyudaDiagRequest.getDescripcion())
				.habilitado(tipoAyudaDiagRequest.getHabilitado())
				.build();
	}
}
