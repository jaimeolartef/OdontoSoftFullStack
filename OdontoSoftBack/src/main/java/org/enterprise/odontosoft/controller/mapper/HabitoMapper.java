package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.Habito;
import org.enterprise.odontosoft.view.dto.request.HabitoRequest;
import org.enterprise.odontosoft.view.dto.response.HabitoResponse;

@UtilityClass
public class HabitoMapper {

	public static Habito dtoToEntity(HabitoRequest habitoRequest) {
		return Habito.builder()
				.id(habitoRequest.getId())
				.descripcion(habitoRequest.getDescripcion())
				.habilitado(habitoRequest.getHabilitado())
				.build();
	}

	public static HabitoResponse entityToDto(Habito habito) {
		return HabitoResponse.builder()
				.id(habito.getId())
				.descripcion(habito.getDescripcion())
				.habilitado(habito.getHabilitado())
				.build();
	}
}
