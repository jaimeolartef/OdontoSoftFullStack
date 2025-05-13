package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.entity.AnalisisFuncional;
import org.enterprise.odontosoft.model.entity.Usuario;
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
				.codigo(analisisFuncionalRequest.getIdusuariocreacion())
				.build())
			.fechacreacion(analisisFuncionalRequest.getFechacreacion())
			.idusuariomodificacion(analisisFuncionalRequest.getIdusuariomodificacion() != null ? Usuario.builder()
				.codigo(analisisFuncionalRequest.getIdusuariomodificacion())
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
			.idusuariocreacion(analisisFuncional.getIdusuariocreacion().getCodigo())
			.fechacreacion(analisisFuncional.getFechacreacion())
			.idusuariomodificacion(analisisFuncional.getIdusuariomodificacion() != null ? analisisFuncional.getIdusuariomodificacion().getCodigo() : null)
			.fechamodificacion(analisisFuncional.getFechamodificacion())
			.habilitado(analisisFuncional.getHabilitado())
			.build();
	}
}
