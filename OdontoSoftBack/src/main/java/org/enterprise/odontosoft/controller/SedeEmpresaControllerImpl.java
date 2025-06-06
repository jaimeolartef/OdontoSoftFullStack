package org.enterprise.odontosoft.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.enterprise.odontosoft.controller.mapper.SedeEmpresaMapper;
import org.enterprise.odontosoft.model.entity.SedeEmpresa;
import org.enterprise.odontosoft.model.service.SedeEmpresaService;
import org.enterprise.odontosoft.view.dto.request.SedeEmpresaRequest;
import org.enterprise.odontosoft.view.dto.response.SedeEmpresaResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SedeEmpresaControllerImpl implements SedeEmpresaController {

	private final SedeEmpresaService sedeEmpresaService;

	@Override
	public SedeEmpresaResponse saveSedeEmpresaEntity(@Valid SedeEmpresaRequest request) {
		try {
			log.info("Creando nueva sede empresa: {}", request.getNombre());
			SedeEmpresa sede = sedeEmpresaService.saveSedeEmpresa(SedeEmpresaMapper.toEntity(request));
			return SedeEmpresaMapper.toDto(sede);
		} catch (Exception e) {
			log.error("Error al crear sede empresa: {}", e.getMessage());
			throw e;
		}
	}

	@Override
	public SedeEmpresaResponse getSedeEmpresaById(Integer id) {
		try {
			log.info("Obteniendo sede empresa por ID: {}", id);
			SedeEmpresa sede = sedeEmpresaService.getSedeEmpresaById(id);
			if (sede == null) {
				throw new jakarta.persistence.EntityNotFoundException("Sede no encontrada con id: " + id);
			}
			return SedeEmpresaMapper.toDto(sede);
		} catch (Exception e) {
			log.error("Error al obtener sede empresa por ID {}: {}", id, e.getMessage());
			throw e;
		}
	}

	@Override
	public List<SedeEmpresaResponse> getAllSedeEmpresa() {
		try {
			log.info("Obteniendo todas las sedes empresa");
			List<SedeEmpresa> sedes = sedeEmpresaService.getAllSedeEmpresa();
			return SedeEmpresaMapper.toDtoList(sedes);
		} catch (Exception e) {
			log.error("Error al obtener todas las sedes empresa: {}", e.getMessage());
			throw e;
		}
	}

	@Override
	public List<SedeEmpresaResponse> getSedeEmpresabyEntidad(Integer idEntidad) {
		try {
			log.info("Obteniendo sedes por entidad ID: {}", idEntidad);
			List<SedeEmpresa> sedes = sedeEmpresaService.getSedeEmpresaByEntidad(idEntidad);
			return SedeEmpresaMapper.toDtoList(sedes);
		} catch (Exception e) {
			log.error("Error al obtener sedes por entidad {}: {}", idEntidad, e.getMessage());
			throw e;
		}
	}

	@Override
	public SedeEmpresaResponse updateSedeEmpresaEntity(@Valid SedeEmpresaRequest request) {
		try {
			log.info("Actualizando sede empresa ID: {}", request.getIdEntidadPrestadoraSalud());
			SedeEmpresa sedeEmpresa =  sedeEmpresaService.saveSedeEmpresa(SedeEmpresaMapper.toEntity(request));
			return SedeEmpresaMapper.toDto(sedeEmpresa);
		} catch (Exception e) {
			log.error("Error al actualizar sede empresa ID {}: {}", request.getIdEntidadPrestadoraSalud(), e.getMessage());
			throw e;
		}
	}

	@Override
	public SedeEmpresaResponse deleteById(Integer id) {
		try {
			log.info("Eliminando sede empresa ID: {}", id);
			SedeEmpresa sede = sedeEmpresaService.getSedeEmpresaById(id);
			sedeEmpresaService.deleteSedeEmpresa(id);
			return SedeEmpresaMapper.toDto(sede);
		} catch (Exception e) {
			log.error("Error al eliminar sede empresa ID {}: {}", id, e.getMessage());
			throw e;
		}
	}

}