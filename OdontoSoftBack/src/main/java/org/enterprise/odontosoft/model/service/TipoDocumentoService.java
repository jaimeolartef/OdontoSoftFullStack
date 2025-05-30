package org.enterprise.odontosoft.model.service;

import org.enterprise.odontosoft.model.entity.TipoDocumento;
import java.util.List;
import java.util.Optional;

/**
 * Interfaz de servicio para la gestión de tipos de documento.
 * Define los métodos de negocio para operaciones CRUD sobre TipoDocumento.
 */
public interface TipoDocumentoService {

	/**
	 * Obtiene todos los tipos de documento disponibles.
	 *
	 * @return Lista de todos los tipos de documento
	 */
	List<TipoDocumento> getAllTipoDocumento();

	/**
	 * Busca un tipo de documento por su ID.
	 *
	 * @param id Identificador único del tipo de documento
	 * @return Optional conteniendo el tipo de documento si existe
	 */
	Optional<TipoDocumento> getTipoDocumentoById(Integer id);

	/**
	 * Busca un tipo de documento por su código.
	 *
	 * @param codigo Código único del tipo de documento
	 * @return Optional conteniendo el tipo de documento si existe
	 */
	Optional<TipoDocumento> getTipoDocumentoByCodigo(String codigo);

	/**
	 * Crea un nuevo tipo de documento.
	 *
	 * @param tipoDocumento Entidad del tipo de documento a crear
	 * @return El tipo de documento creado con su ID asignado
	 */
	TipoDocumento createTipoDocumento(TipoDocumento tipoDocumento);

	/**
	 * Actualiza un tipo de documento existente.
	 *
	 * @param id Identificador del tipo de documento a actualizar
	 * @param tipoDocumento Datos actualizados del tipo de documento
	 * @return El tipo de documento actualizado
	 */
	TipoDocumento updateTipoDocumento(Integer id, TipoDocumento tipoDocumento);

	/**
	 * Elimina un tipo de documento por su ID.
	 *
	 * @param id Identificador del tipo de documento a eliminar
	 * @return true si se eliminó correctamente, false en caso contrario
	 */
	boolean deleteTipoDocumento(Integer id);

	/**
	 * Verifica si existe un tipo de documento con el código especificado.
	 *
	 * @param codigo Código a verificar
	 * @return true si existe, false en caso contrario
	 */
	boolean existsByCodigo(String codigo);
}
