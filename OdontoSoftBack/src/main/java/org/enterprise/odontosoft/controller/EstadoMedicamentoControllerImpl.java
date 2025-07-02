package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.EstadoMedicamentoMapper;
import org.enterprise.odontosoft.model.entity.EstadoMedicamento;
import org.enterprise.odontosoft.model.service.EstadoMedicamentoService;
import org.enterprise.odontosoft.view.dto.request.EstadoMedicamentoRequest;
import org.enterprise.odontosoft.view.dto.response.EstadoMedicamentoResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Controller
public class EstadoMedicamentoControllerImpl implements EstadoMedicamentoController {

	private static final Logger logger = (Logger) LoggerFactory.getLogger(EstadoMedicamentoControllerImpl.class);

	private final EstadoMedicamentoService estadoMedicamentoService;

	@Override
	public List<EstadoMedicamentoResponse> getAllEstadosMedicamento() {
		try {
			List<EstadoMedicamento> estados = estadoMedicamentoService.findAll();
			if (estados.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontraron estados de medicamento.");
			}
			return estados.stream()
				.map(EstadoMedicamentoMapper::toResponse)
				.toList();
		} catch (Exception e) {
			logger.error("Error al obtener los estados de medicamento.", e);
		}
		return List.of();
	}

	@Override
	public EstadoMedicamentoResponse getEstadoMedicamentoById(Long id) {
		try {
			Optional<EstadoMedicamento> estado = estadoMedicamentoService.findById(id);
			if (estado.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontró el estado de medicamento con id: " + id);
			}
			return EstadoMedicamentoMapper.toResponse(estado.get());
		} catch (Exception e) {
			logger.error("Error al obtener el estado de medicamento con id: " + id, e);
			return null;
		}
	}

	@Override
	public EstadoMedicamentoResponse saveEstadoMedicamento(EstadoMedicamentoRequest estadoMedicamentoRequest) {
		try {
			EstadoMedicamento savedEstado = estadoMedicamentoService.save(EstadoMedicamentoMapper.toEntity(estadoMedicamentoRequest));
			return EstadoMedicamentoMapper.toResponse(savedEstado);
		} catch (Exception e) {
			logger.error("Error al guardar el estado de medicamento.", e);
			return null;
		}
	}

	@Override
	public void deleteEstadoMedicamento(Long id) {
		try {
			estadoMedicamentoService.deleteById(id);
		} catch (Exception e) {
			logger.error("Error al eliminar el estado de medicamento con id: " + id, e);
		}
	}
}
