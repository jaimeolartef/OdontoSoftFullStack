package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.EntidadPrestadoraSaludMapper;
import org.enterprise.odontosoft.model.entity.EntidadPrestadoraSalud;
import org.enterprise.odontosoft.model.service.EntidadPrestadoraSaludService;
import org.enterprise.odontosoft.view.dto.request.EntidadPrestadoraSaludRequest;
import org.enterprise.odontosoft.view.dto.response.EntidadPrestadoraSaludResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class EntidadPrestadoraSaludControllerImpl implements EntidadPrestadoraSaludController {

    private static final Logger logger = LoggerFactory.getLogger(EntidadPrestadoraSaludControllerImpl.class);

	private final EntidadPrestadoraSaludService entidadPrestadoraSaludService;

	@Override
    public List<EntidadPrestadoraSaludResponse> getAllEntidadesPrestadorasSalud() {
        try {
            List<EntidadPrestadoraSalud> entidades = entidadPrestadoraSaludService.getAllEntidadPrestadoraSalud();
            if (entidades.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontraron entidades prestadoras de salud.");
            }
			return entidades.stream()
			    .map(EntidadPrestadoraSaludMapper::toResponse)
			    .toList();
        } catch (Exception e) {
            logger.error("Error al obtener las entidades prestadoras de salud.", e);
        }
		return List.of();
	}

	@Override
	public EntidadPrestadoraSaludResponse getEntidadPrestadoraSaludById(Integer id) {
	    try {
	        EntidadPrestadoraSalud entidad = entidadPrestadoraSaludService.getEntidadPrestadoraSaludById(id);
	        if (entidad == null) {
	            throw new jakarta.persistence.EntityNotFoundException("No se encontró la entidad prestadora de salud con id: " + id);
	        }
	        return EntidadPrestadoraSaludMapper.toResponse(entidad);
	    } catch (Exception e) {
	        logger.error("Error al obtener la entidad prestadora de salud con id: " + id, e);
	        return null;
	    }
	}

	@Override
	public EntidadPrestadoraSaludResponse saveEntidadPrestadoraSalud(EntidadPrestadoraSaludRequest entidad) {
		try {
			EntidadPrestadoraSalud savedEntidad = entidadPrestadoraSaludService.saveEntidadPrestadoraSalud(EntidadPrestadoraSaludMapper.toEntity(entidad));
			return EntidadPrestadoraSaludMapper.toResponse(savedEntidad);
		} catch (Exception e) {
			logger.error("Error al guardar la entidad prestadora de salud.", e);
			return null;
		}
	}

	@Override
	public void deleteEntidadPrestadoraSalud(Integer id) {
		try {
			entidadPrestadoraSaludService.deleteEntidadPrestadoraSalud(id);
		} catch (Exception e) {
			logger.error("Error al eliminar la entidad prestadora de salud con id: " + id, e);
		}
	}

	@Override
	public List<EntidadPrestadoraSaludResponse> buscarEntidadesPorNombreODocumento(String numerodocumento, String nombre) {
		try {
			List<EntidadPrestadoraSalud> entidades = entidadPrestadoraSaludService.buscarPorNombreODocumento(numerodocumento, nombre);
			if (entidades.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontraron entidades prestadoras de salud.");
			}
			return entidades.stream()
				.map(EntidadPrestadoraSaludMapper::toResponse)
				.toList();
		} catch (Exception e) {
			logger.error("Error al buscar entidades por nombre o documento", e);
			return List.of();
		}
	}
}