package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.MedicamentoMapper;
import org.enterprise.odontosoft.model.entity.Medicamento;
import org.enterprise.odontosoft.model.service.MedicamentoService;
import org.enterprise.odontosoft.view.dto.request.MedicamentoRequest;
import org.enterprise.odontosoft.view.dto.response.MedicamentoResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Controller
public class MedicamentoControllerImpl implements MedicamentoController {

	private static final Logger logger = LoggerFactory.getLogger(MedicamentoControllerImpl.class);

	private final MedicamentoService medicamentoService;

	@Override
	public List<MedicamentoResponse> getAllMedicamentos() {
		try {
			List<Medicamento> medicamentos = medicamentoService.findAll();
			if (medicamentos.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontraron medicamentos.");
			}
			return medicamentos.stream()
				.map(MedicamentoMapper::toResponse)
				.toList();
		} catch (Exception e) {
			logger.error("Error al obtener los medicamentos.", e);
		}
		return List.of();
	}

	@Override
	public MedicamentoResponse getMedicamentoById(Long id) {
		try {
			Optional<Medicamento> medicamento = medicamentoService.findById(id);
			if (medicamento.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontró el medicamento con id: " + id);
			}
			return MedicamentoMapper.toResponse(medicamento.get());
		} catch (Exception e) {
			logger.error("Error al obtener el medicamento con id: " + id, e);
			return null;
		}
	}

	@Override
	public MedicamentoResponse saveMedicamento(MedicamentoRequest medicamentoRequest) {
		try {
			Medicamento savedMedicamento = medicamentoService.save(MedicamentoMapper.toEntity(medicamentoRequest));
			return MedicamentoMapper.toResponse(savedMedicamento);
		} catch (Exception e) {
			logger.error("Error al guardar el medicamento.", e);
			return null;
		}
	}

	@Override
	public void deleteMedicamento(Long id) {
		try {
			medicamentoService.deleteById(id);
		} catch (Exception e) {
			logger.error("Error al eliminar el medicamento con id: " + id, e);
		}
	}
}
