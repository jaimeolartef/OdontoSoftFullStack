package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.entity.Regimen;
import org.enterprise.odontosoft.view.dto.response.RegimenResponse;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper para convertir entre entidades Regimen y DTOs RegimenResponse.
 * Utiliza métodos estáticos para facilitar el mapeo sin necesidad de instanciar la clase.
 */
public class RegimenMapper {

	/**
	 * Constructor privado para evitar la instanciación de la clase.
	 */
	private RegimenMapper() {
		throw new UnsupportedOperationException("Esta es una clase de utilidad y no puede ser instanciada");
	}

	/**
	 * Convierte una entidad Regimen a un RegimenResponse.
	 *
	 * @param regimen La entidad Regimen a convertir
	 * @return RegimenResponse con los datos mapeados, o null si el parámetro es null
	 */
	public static RegimenResponse toResponse(Regimen regimen) {
		if (regimen == null) {
			return null;
		}

		return new RegimenResponse(
			regimen.getId(),
			regimen.getDescripcion(),
			regimen.getHabilitado()
		);
	}

	/**
	 * Convierte una lista de entidades Regimen a una lista de RegimenResponse.
	 *
	 * @param regimenes Lista de entidades Regimen a convertir
	 * @return Lista de RegimenResponse con los datos mapeados
	 */
	public static List<RegimenResponse> toResponseList(List<Regimen> regimenes) {
		if (regimenes == null) {
			return null;
		}

		return regimenes.stream()
			.map(RegimenMapper::toResponse)
			.collect(Collectors.toList());
	}

	/**
	 * Convierte un RegimenResponse a una entidad Regimen.
	 * Útil para operaciones de creación o actualización.
	 *
	 * @param regimenResponse El RegimenResponse a convertir
	 * @return Entidad Regimen con los datos mapeados, o null si el parámetro es null
	 */
	public static Regimen toEntity(RegimenResponse regimenResponse) {
		if (regimenResponse == null) {
			return null;
		}

		return Regimen.builder()
			.id(regimenResponse.getId())
			.descripcion(regimenResponse.getDescripcion())
			.habilitado(regimenResponse.getHabilitado())
			.build();
	}

	/**
	 * Convierte una lista de RegimenResponse a una lista de entidades Regimen.
	 *
	 * @param regimenesResponse Lista de RegimenResponse a convertir
	 * @return Lista de entidades Regimen con los datos mapeados
	 */
	public static List<Regimen> toEntityList(List<RegimenResponse> regimenesResponse) {
		if (regimenesResponse == null) {
			return null;
		}

		return regimenesResponse.stream()
			.map(RegimenMapper::toEntity)
			.collect(Collectors.toList());
	}

	/**
	 * Actualiza una entidad Regimen existente con los datos de un RegimenResponse.
	 * No actualiza el ID para mantener la integridad de la entidad persistente.
	 *
	 * @param regimenResponse Los nuevos datos para actualizar
	 * @param regimenExistente La entidad existente a actualizar
	 * @return La entidad actualizada, o null si algún parámetro es null
	 */
	public static Regimen updateEntity(RegimenResponse regimenResponse, Regimen regimenExistente) {
		if (regimenResponse == null || regimenExistente == null) {
			return null;
		}

		// Actualizar solo los campos que no son ID
		if (regimenResponse.getDescripcion() != null) {
			regimenExistente.setDescripcion(regimenResponse.getDescripcion());
		}

		if (regimenResponse.getHabilitado() != null) {
			regimenExistente.setHabilitado(regimenResponse.getHabilitado());
		}

		return regimenExistente;
	}

	/**
	 * Crea una nueva entidad Regimen sin ID a partir de un RegimenResponse.
	 * Útil para operaciones de creación donde el ID será generado automáticamente.
	 *
	 * @param regimenResponse El RegimenResponse con los datos para la nueva entidad
	 * @return Nueva entidad Regimen sin ID, o null si el parámetro es null
	 */
	public static Regimen toNewEntity(RegimenResponse regimenResponse) {
		if (regimenResponse == null) {
			return null;
		}

		return Regimen.builder()
			.descripcion(regimenResponse.getDescripcion())
			.habilitado(regimenResponse.getHabilitado() != null ? regimenResponse.getHabilitado() : true) // Por defecto habilitado
			.build();
	}
}