package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.entity.ConstanteSistema;
import org.enterprise.odontosoft.view.dto.response.ConstanteResponse;

public class ConstantesSistemaMapper {

	public static ConstanteResponse toResponse(ConstanteSistema constante) {
		return ConstanteResponse.builder()
			.codigo(constante.getCodigo())
			.valor(constante.getValor())
			.build();
	}
}
