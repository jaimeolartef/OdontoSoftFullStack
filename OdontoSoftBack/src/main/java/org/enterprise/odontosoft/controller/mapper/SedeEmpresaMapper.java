package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.EntidadPrestadoraSalud;
import org.enterprise.odontosoft.model.entity.SedeEmpresa;
import org.enterprise.odontosoft.view.dto.request.SedeEmpresaRequest;
import org.enterprise.odontosoft.view.dto.response.SedeEmpresaResponse;

import java.util.List;
import java.util.Objects;

@UtilityClass
public class SedeEmpresaMapper {

	public static SedeEmpresa toEntity(SedeEmpresaRequest request) {
		return SedeEmpresa.builder()
			.id(request.getId())
			.nombre(request.getNombre())
			.direccion(request.getDireccion())
			.telefono(request.getTelefono())
			.correo(request.getCorreo())
			.canalesAtencion(request.getCanalesAtencion())
			.entidadPrestadoraSalud(EntidadPrestadoraSalud.builder()
				.id(request.getIdEntidadPrestadoraSalud())
				.build())
			.habilitado(request.getHabilitado())
			.serviciosPrestados(request.getServiciosPrestados())
			.build();
	}

	public static SedeEmpresaResponse toDto(SedeEmpresa sedeEmpresa) {
		return SedeEmpresaResponse.builder()
			.id(sedeEmpresa.getId())
			.nombre(sedeEmpresa.getNombre())
			.direccion(sedeEmpresa.getDireccion())
			.telefono(sedeEmpresa.getTelefono())
			.correo(sedeEmpresa.getCorreo())
			.canalesAtencion(sedeEmpresa.getCanalesAtencion())
			.idEntidadPrestadoraSalud(Objects.nonNull(sedeEmpresa.getEntidadPrestadoraSalud()) ?
				sedeEmpresa.getEntidadPrestadoraSalud().getId() : null)
			.habilitado(sedeEmpresa.isHabilitado())
			.serviciosPrestados(sedeEmpresa.getServiciosPrestados())
			.build();
	}

	public static List<SedeEmpresaResponse> toDtoList(List<SedeEmpresa> sedeEmpresas) {
		return sedeEmpresas.stream()
			.map(SedeEmpresaMapper::toDto)
			.toList();
	}
}