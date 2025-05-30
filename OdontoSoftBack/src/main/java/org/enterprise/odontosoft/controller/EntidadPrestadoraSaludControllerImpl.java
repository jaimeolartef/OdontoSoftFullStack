package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.EntidadPrestadoraSaludMapper;
import org.enterprise.odontosoft.model.entity.EntidadPrestadoraSalud;
import org.enterprise.odontosoft.model.service.EntidadPrestadoraSaludService;
import org.enterprise.odontosoft.view.dto.request.EntidadPrestadoraSaludRequest;
import org.enterprise.odontosoft.view.dto.response.EntidadPrestadoraSaludResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class EntidadPrestadoraSaludControllerImpl implements EntidadPrestadoraSaludController {

    private static final Logger logger = LoggerFactory.getLogger(EntidadPrestadoraSaludControllerImpl.class);

	private final EntidadPrestadoraSaludService entidadPrestadoraSaludService;

	@Override
    public ResponseEntity<List<EntidadPrestadoraSaludResponse>> getAllEntidadesPrestadorasSalud() {
        ResponseEntity<List<EntidadPrestadoraSaludResponse>> responseEntity;
        try {
            List<EntidadPrestadoraSalud> entidades = entidadPrestadoraSaludService.getAllEntidadPrestadoraSalud();
            if (entidades.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
			List<EntidadPrestadoraSaludResponse> entidadesResponse = entidades.stream()
			    .map(EntidadPrestadoraSaludMapper::toResponse)
			    .toList();
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(entidadesResponse);
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error al obtener las entidades prestadoras de salud.", e);
        }
        return responseEntity;
    }

	@Override
    public ResponseEntity<EntidadPrestadoraSaludResponse> getEntidadPrestadoraSaludById(Integer id) {
        ResponseEntity<EntidadPrestadoraSaludResponse> responseEntity;
        try {
            EntidadPrestadoraSalud entidad = entidadPrestadoraSaludService.getEntidadPrestadoraSaludById(id);
            if (entidad == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(EntidadPrestadoraSaludMapper.toResponse(entidad));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error al obtener la entidad prestadora de salud con id: " + id, e);
        }
        return responseEntity;
    }

	@Override
	public ResponseEntity<EntidadPrestadoraSaludResponse> saveEntidadPrestadoraSalud(EntidadPrestadoraSaludRequest entidad) {
		ResponseEntity<EntidadPrestadoraSaludResponse> responseEntity;
		try {
			EntidadPrestadoraSalud savedEntidad = entidadPrestadoraSaludService.saveEntidadPrestadoraSalud(EntidadPrestadoraSaludMapper.toEntity(entidad));
			responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(EntidadPrestadoraSaludMapper.toResponse(savedEntidad));
		} catch (Exception e) {
			responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			logger.error("Error al guardar la entidad prestadora de salud.", e);
		}
		return responseEntity;
	}

	@Override
	public ResponseEntity<Void> deleteEntidadPrestadoraSalud(Integer id) {
		try {
			entidadPrestadoraSaludService.deleteEntidadPrestadoraSalud(id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (Exception e) {
			logger.error("Error al eliminar la entidad prestadora de salud con id: " + id, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@Override
	public ResponseEntity<List<EntidadPrestadoraSaludResponse>> buscarEntidadesPorNombreODocumento(String numerodocumento, String nombre) {
		ResponseEntity<List<EntidadPrestadoraSaludResponse>> responseEntity;
		try {
			List<EntidadPrestadoraSalud> entidades = entidadPrestadoraSaludService.buscarPorNombreODocumento(numerodocumento, nombre);
			if (entidades.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			List<EntidadPrestadoraSaludResponse> entidadesResponse = entidades.stream()
				.map(EntidadPrestadoraSaludMapper::toResponse)
				.toList();
			responseEntity = ResponseEntity.status(HttpStatus.OK).body(entidadesResponse);
		} catch (Exception e) {
			responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			logger.error("Error al buscar entidades por nombre o documento", e);
		}
		return responseEntity;
	}
}