package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.Entity.AnalisisFuncional;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.AnalisisFuncionalRequest;
import org.enterprise.odontosoft.view.dto.response.AnalisisFuncionalResponse;

public class AnalisisFuncionalMapper {

	public static AnalisisFuncional toEntity(AnalisisFuncionalRequest analisisFuncionalRequest) {
		return AnalisisFuncional.builder()
			.id(analisisFuncionalRequest.getId())
			.idhistoriaclinica(analisisFuncionalRequest.getIdhistoriaclinica())
			.masticacion(analisisFuncionalRequest.getMasticacion())
			.deglucion(analisisFuncionalRequest.getDeglucion())
			.respiracion(analisisFuncionalRequest.getRespiracion())
			.fonacion(analisisFuncionalRequest.getFonacion())
			.idusuariocreacion(Usuario.builder()
				.id(analisisFuncionalRequest.getIdusuariocreacion().getId())
				.build())
			.fechacreacion(analisisFuncionalRequest.getFechacreacion())
			.idusuariomodificacion(analisisFuncionalRequest.getIdusuariomodificacion() != null ? Usuario.builder()
				.id(analisisFuncionalRequest.getIdusuariomodificacion().getId())
				.build() : null)
			.fechamodificacion(analisisFuncionalRequest.getFechamodificacion())
			.habilitado(analisisFuncionalRequest.getHabilitado())
			.build();
	}

	public static AnalisisFuncionalResponse toResponse(AnalisisFuncional analisisFuncional) {
		return AnalisisFuncionalResponse.builder()
			.id(analisisFuncional.getId())
			.idhistoriaclinica(analisisFuncional.getIdhistoriaclinica())
			.masticacion(analisisFuncional.getMasticacion())
			.deglucion(analisisFuncional.getDeglucion())
			.respiracion(analisisFuncional.getRespiracion())
			.fonacion(analisisFuncional.getFonacion())
			.idusuariocreacion(analisisFuncional.getIdusuariocreacion().getNombre())
			.fechacreacion(analisisFuncional.getFechacreacion())
			.idusuariomodificacion(analisisFuncional.getIdusuariomodificacion() != null ? analisisFuncional.getIdusuariomodificacion().getNombre() : null)
			.fechamodificacion(analisisFuncional.getFechamodificacion())
			.habilitado(analisisFuncional.getHabilitado())
			.build();
	}
}
