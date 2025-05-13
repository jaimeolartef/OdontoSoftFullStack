package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.TipoDiagnostico;
import org.enterprise.odontosoft.view.dto.request.TipoDiagnosticoRequest;
import org.enterprise.odontosoft.view.dto.response.TipoDiagnosticoResponse;

@UtilityClass
public class TipoDiagnosticoMapper {

	public static TipoDiagnosticoResponse toResponse(TipoDiagnostico tipoDiagnostico) {
		return TipoDiagnosticoResponse.builder()
				.id(tipoDiagnostico.getId())
				.codigo(tipoDiagnostico.getCodigo())
				.descripcion(tipoDiagnostico.getDescripcion())
				.habilitado(tipoDiagnostico.getHabilitado())
				.build();
	}

	public static TipoDiagnostico toEntity(TipoDiagnosticoRequest tipoDiagnosticoRequest) {
		return TipoDiagnostico.builder()
				.id(tipoDiagnosticoRequest.getId())
				.codigo(tipoDiagnosticoRequest.getCodigo())
				.descripcion(tipoDiagnosticoRequest.getDescripcion())
				.habilitado(tipoDiagnosticoRequest.getHabilitado())
				.build();
	}
}
