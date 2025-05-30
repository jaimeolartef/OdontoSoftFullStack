package org.enterprise.odontosoft.model.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.enterprise.odontosoft.model.dao.TipoDocumentoRepository;
import org.enterprise.odontosoft.model.entity.TipoDocumento;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Implementación del servicio de tipos de documento.
 * Contiene la lógica de negocio para la gestión de tipos de documento.
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class TipoDocumentoServiceImpl implements TipoDocumentoService {

	private final TipoDocumentoRepository tipoDocumentoRepository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional(readOnly = true)
	public List<TipoDocumento> getAllTipoDocumento() {
		log.debug("Obteniendo todos los tipos de documento");
		try {
			List<TipoDocumento> tiposDocumento = tipoDocumentoRepository.findAll();
			log.info("Se encontraron {} tipos de documento", tiposDocumento.size());
			return tiposDocumento;
		} catch (Exception e) {
			log.error("Error al obtener todos los tipos de documento", e);
			throw new RuntimeException("Error al obtener los tipos de documento", e);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<TipoDocumento> getTipoDocumentoById(Integer id) {
		log.debug("Buscando tipo de documento con ID: {}", id);
		try {
			if (id == null) {
				log.warn("El ID proporcionado es nulo");
				return Optional.empty();
			}

			Optional<TipoDocumento> tipoDocumento = tipoDocumentoRepository.findById(id);
			if (tipoDocumento.isPresent()) {
				log.info("Tipo de documento encontrado con ID: {}", id);
			} else {
				log.info("No se encontró tipo de documento con ID: {}", id);
			}
			return tipoDocumento;
		} catch (Exception e) {
			log.error("Error al buscar tipo de documento con ID: {}", id, e);
			throw new RuntimeException("Error al buscar el tipo de documento", e);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<TipoDocumento> getTipoDocumentoByCodigo(String codigo) {
		log.debug("Buscando tipo de documento con código: {}", codigo);
		try {
			if (codigo == null || codigo.trim().isEmpty()) {
				log.warn("El código proporcionado es nulo o vacío");
				return Optional.empty();
			}

			Optional<TipoDocumento> tipoDocumento = tipoDocumentoRepository.findByCodigo(codigo.trim());
			if (tipoDocumento.isPresent()) {
				log.info("Tipo de documento encontrado con código: {}", codigo);
			} else {
				log.info("No se encontró tipo de documento con código: {}", codigo);
			}
			return tipoDocumento;
		} catch (Exception e) {
			log.error("Error al buscar tipo de documento con código: {}", codigo, e);
			throw new RuntimeException("Error al buscar el tipo de documento por código", e);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public TipoDocumento createTipoDocumento(TipoDocumento tipoDocumento) {
		log.debug("Creando nuevo tipo de documento: {}", tipoDocumento.getNombre());
		try {
			if (tipoDocumento == null) {
				throw new IllegalArgumentException("El tipo de documento no puede ser nulo");
			}

			// Validar que no exista un tipo de documento con el mismo código
			if (tipoDocumento.getCodigo() != null && existsByCodigo(tipoDocumento.getCodigo())) {
				throw new IllegalArgumentException("Ya existe un tipo de documento con el código: " + tipoDocumento.getCodigo());
			}

			// Limpiar espacios en blanco
			if (tipoDocumento.getCodigo() != null) {
				tipoDocumento.setCodigo(tipoDocumento.getCodigo().trim());
			}
			if (tipoDocumento.getNombre() != null) {
				tipoDocumento.setNombre(tipoDocumento.getNombre().trim());
			}

			TipoDocumento nuevoTipoDocumento = tipoDocumentoRepository.save(tipoDocumento);
			log.info("Tipo de documento creado exitosamente con ID: {}", nuevoTipoDocumento.getId());
			return nuevoTipoDocumento;
		} catch (Exception e) {
			log.error("Error al crear tipo de documento", e);
			throw new RuntimeException("Error al crear el tipo de documento", e);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public TipoDocumento updateTipoDocumento(Integer id, TipoDocumento tipoDocumento) {
		log.debug("Actualizando tipo de documento con ID: {}", id);
		try {
			if (id == null) {
				throw new IllegalArgumentException("El ID no puede ser nulo");
			}
			if (tipoDocumento == null) {
				throw new IllegalArgumentException("El tipo de documento no puede ser nulo");
			}

			Optional<TipoDocumento> tipoDocumentoExistente = getTipoDocumentoById(id);
			if (tipoDocumentoExistente.isEmpty()) {
				throw new RuntimeException("No se encontró tipo de documento con ID: " + id);
			}

			TipoDocumento tipoDocumentoActual = tipoDocumentoExistente.get();

			// Validar que no exista otro tipo de documento con el mismo código
			if (tipoDocumento.getCodigo() != null &&
				!tipoDocumento.getCodigo().equals(tipoDocumentoActual.getCodigo()) &&
				existsByCodigo(tipoDocumento.getCodigo())) {
				throw new IllegalArgumentException("Ya existe un tipo de documento con el código: " + tipoDocumento.getCodigo());
			}

			// Actualizar campos
			if (tipoDocumento.getCodigo() != null) {
				tipoDocumentoActual.setCodigo(tipoDocumento.getCodigo().trim());
			}
			if (tipoDocumento.getNombre() != null) {
				tipoDocumentoActual.setNombre(tipoDocumento.getNombre().trim());
			}

			TipoDocumento tipoDocumentoActualizado = tipoDocumentoRepository.save(tipoDocumentoActual);
			log.info("Tipo de documento actualizado exitosamente con ID: {}", id);
			return tipoDocumentoActualizado;
		} catch (Exception e) {
			log.error("Error al actualizar tipo de documento con ID: {}", id, e);
			throw new RuntimeException("Error al actualizar el tipo de documento", e);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public boolean deleteTipoDocumento(Integer id) {
		log.debug("Eliminando tipo de documento con ID: {}", id);
		try {
			if (id == null) {
				log.warn("El ID proporcionado es nulo");
				return false;
			}

			Optional<TipoDocumento> tipoDocumento = getTipoDocumentoById(id);
			if (tipoDocumento.isEmpty()) {
				log.warn("No se encontró tipo de documento con ID: {}", id);
				return false;
			}

			// Verificar si el tipo de documento está siendo usado por pacientes
			TipoDocumento tipoDocumentoEntity = tipoDocumento.get();
			if (tipoDocumentoEntity.getPacientes() != null && !tipoDocumentoEntity.getPacientes().isEmpty()) {
				log.warn("No se puede eliminar el tipo de documento con ID: {} porque está siendo usado por {} pacientes",
					id, tipoDocumentoEntity.getPacientes().size());
				throw new RuntimeException("No se puede eliminar el tipo de documento porque está siendo usado por pacientes");
			}

			tipoDocumentoRepository.deleteById(id);
			log.info("Tipo de documento eliminado exitosamente con ID: {}", id);
			return true;
		} catch (Exception e) {
			log.error("Error al eliminar tipo de documento con ID: {}", id, e);
			throw new RuntimeException("Error al eliminar el tipo de documento", e);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional(readOnly = true)
	public boolean existsByCodigo(String codigo) {
		log.debug("Verificando existencia de tipo de documento con código: {}", codigo);
		try {
			if (codigo == null || codigo.trim().isEmpty()) {
				return false;
			}

			boolean existe = tipoDocumentoRepository.existsByCodigo(codigo.trim());
			log.debug("Tipo de documento con código '{}' existe: {}", codigo, existe);
			return existe;
		} catch (Exception e) {
			log.error("Error al verificar existencia de tipo de documento con código: {}", codigo, e);
			throw new RuntimeException("Error al verificar la existencia del tipo de documento", e);
		}
	}
}