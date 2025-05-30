package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.entity.TipoDocumento;
import org.enterprise.odontosoft.view.dto.response.TipoDocumentoResponse;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper para convertir entre entidades TipoDocumento y DTOs TipoDocumentoResponse.
 * Utiliza métodos estáticos para facilitar el mapeo sin necesidad de instanciar la clase.
 */
public class TipoDocumentoMapper {

	/**
	 * Constructor privado para evitar la instanciación de la clase.
	 */
	private TipoDocumentoMapper() {
		throw new UnsupportedOperationException("Esta es una clase de utilidad y no puede ser instanciada");
	}

	/**
	 * Convierte una entidad TipoDocumento a un TipoDocumentoResponse.
	 *
	 * @param tipoDocumento La entidad TipoDocumento a convertir
	 * @return TipoDocumentoResponse con los datos mapeados, o null si el parámetro es null
	 */
	public static TipoDocumentoResponse toResponse(TipoDocumento tipoDocumento) {
		if (tipoDocumento == null) {
			return null;
		}

		return new TipoDocumentoResponse(
			tipoDocumento.getId(),
			tipoDocumento.getCodigo(),
			tipoDocumento.getNombre()
		);
	}

	/**
	 * Convierte una lista de entidades TipoDocumento a una lista de TipoDocumentoResponse.
	 *
	 * @param tiposDocumento Lista de entidades TipoDocumento a convertir
	 * @return Lista de TipoDocumentoResponse con los datos mapeados
	 */
	public static List<TipoDocumentoResponse> toResponseList(List<TipoDocumento> tiposDocumento) {
		if (tiposDocumento == null) {
			return null;
		}

		return tiposDocumento.stream()
			.map(TipoDocumentoMapper::toResponse)
			.collect(Collectors.toList());
	}

	/**
	 * Convierte un TipoDocumentoResponse a una entidad TipoDocumento.
	 * Útil para operaciones de creación o actualización.
	 * No incluye la relación con pacientes.
	 *
	 * @param tipoDocumentoResponse El TipoDocumentoResponse a convertir
	 * @return Entidad TipoDocumento con los datos mapeados, o null si el parámetro es null
	 */
	public static TipoDocumento toEntity(TipoDocumentoResponse tipoDocumentoResponse) {
		if (tipoDocumentoResponse == null) {
			return null;
		}

		return TipoDocumento.builder()
			.id(tipoDocumentoResponse.getId())
			.codigo(tipoDocumentoResponse.getCodigo())
			.nombre(tipoDocumentoResponse.getNombre())
			.build();
	}

	/**
	 * Convierte una lista de TipoDocumentoResponse a una lista de entidades TipoDocumento.
	 *
	 * @param tiposDocumentoResponse Lista de TipoDocumentoResponse a convertir
	 * @return Lista de entidades TipoDocumento con los datos mapeados
	 */
	public static List<TipoDocumento> toEntityList(List<TipoDocumentoResponse> tiposDocumentoResponse) {
		if (tiposDocumentoResponse == null) {
			return null;
		}

		return tiposDocumentoResponse.stream()
			.map(TipoDocumentoMapper::toEntity)
			.collect(Collectors.toList());
	}

	/**
	 * Actualiza una entidad TipoDocumento existente con los datos de un TipoDocumentoResponse.
	 * No actualiza el ID para mantener la integridad de la entidad persistente.
	 * Preserva la relación existente con pacientes.
	 *
	 * @param tipoDocumentoResponse Los nuevos datos para actualizar
	 * @param tipoDocumentoExistente La entidad existente a actualizar
	 * @return La entidad actualizada, o null si algún parámetro es null
	 */
	public static TipoDocumento updateEntity(TipoDocumentoResponse tipoDocumentoResponse, TipoDocumento tipoDocumentoExistente) {
		if (tipoDocumentoResponse == null || tipoDocumentoExistente == null) {
			return null;
		}

		// Actualizar solo los campos que no son ID ni relaciones
		if (tipoDocumentoResponse.getCodigo() != null) {
			tipoDocumentoExistente.setCodigo(tipoDocumentoResponse.getCodigo().trim());
		}

		if (tipoDocumentoResponse.getNombre() != null) {
			tipoDocumentoExistente.setNombre(tipoDocumentoResponse.getNombre().trim());
		}

		// Nota: No se actualiza la relación con pacientes para mantener la integridad

		return tipoDocumentoExistente;
	}

	/**
	 * Crea una nueva entidad TipoDocumento sin ID a partir de un TipoDocumentoResponse.
	 * Útil para operaciones de creación donde el ID será generado automáticamente.
	 *
	 * @param tipoDocumentoResponse El TipoDocumentoResponse con los datos para la nueva entidad
	 * @return Nueva entidad TipoDocumento sin ID, o null si el parámetro es null
	 */
	public static TipoDocumento toNewEntity(TipoDocumentoResponse tipoDocumentoResponse) {
		if (tipoDocumentoResponse == null) {
			return null;
		}

		return TipoDocumento.builder()
			.codigo(tipoDocumentoResponse.getCodigo() != null ? tipoDocumentoResponse.getCodigo().trim() : null)
			.nombre(tipoDocumentoResponse.getNombre() != null ? tipoDocumentoResponse.getNombre().trim() : null)
			.build();
	}

	/**
	 * Convierte una entidad TipoDocumento a TipoDocumentoResponse incluyendo información adicional.
	 * Versión extendida que podría incluir contadores o información derivada.
	 *
	 * @param tipoDocumento La entidad TipoDocumento a convertir
	 * @return TipoDocumentoResponse con información básica
	 */
	public static TipoDocumentoResponse toDetailedResponse(TipoDocumento tipoDocumento) {
		if (tipoDocumento == null) {
			return null;
		}

		TipoDocumentoResponse response = toResponse(tipoDocumento);

		// Aquí podrías agregar información adicional si fuera necesario
		// Por ejemplo, contar pacientes asociados:
		// response.setCantidadPacientes(tipoDocumento.getPacientes() != null ?
		//                              tipoDocumento.getPacientes().size() : 0);

		return response;
	}
}