package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.FormulaMedicaMapper;
import org.enterprise.odontosoft.model.entity.EstadoMedicamento;
import org.enterprise.odontosoft.model.entity.FormulaMedica;
import org.enterprise.odontosoft.model.service.EstadoMedicamentoService;
import org.enterprise.odontosoft.model.service.FormulaMedicaService;
import org.enterprise.odontosoft.view.dto.request.FormulaMedicaRequest;
import org.enterprise.odontosoft.view.dto.response.FormulaMedicaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Controller
public class FormulaMedicaControllerImpl implements FormulaMedicaController {

	private static final Logger logger = LoggerFactory.getLogger(FormulaMedicaControllerImpl.class);

	private final FormulaMedicaService formulaMedicaService;
	private final EstadoMedicamentoService estadoMedicamentoService;

	@Override
	public List<FormulaMedicaResponse> getAllFormulasMedicas() {
		try {
			List<FormulaMedica> formulas = formulaMedicaService.findAll();
			if (formulas.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontraron fórmulas médicas.");
			}
			return formulas.stream()
				.map(FormulaMedicaMapper::toResponse)
				.toList();
		} catch (Exception e) {
			logger.error("Error al obtener las fórmulas médicas.", e);
		}
		return List.of();
	}

	@Override
	public FormulaMedicaResponse getFormulaMedicaById(Long id) {
		try {
			Optional<FormulaMedica> formula = formulaMedicaService.findById(id);
			if (formula.isEmpty()) {
				throw new jakarta.persistence.EntityNotFoundException("No se encontró la fórmula médica con id: " + id);
			}
			return FormulaMedicaMapper.toResponse(formula.get());
		} catch (Exception e) {
			logger.error("Error al obtener la fórmula médica con id: " + id, e);
			return null;
		}
	}

	@Override
	public FormulaMedicaResponse saveFormulaMedica(FormulaMedicaRequest formulaMedicaRequest) {
		try {
			Optional<EstadoMedicamento> estadoMedicamento = estadoMedicamentoService.findByNombre(formulaMedicaRequest.getEstadoMedicamento());
			formulaMedicaRequest.setEstadoMedicamentoId(estadoMedicamento.map(EstadoMedicamento::getId).orElse(null));
			FormulaMedica savedFormula = formulaMedicaService.save(FormulaMedicaMapper.toEntity(formulaMedicaRequest));
			return FormulaMedicaMapper.toResponse(savedFormula);
		} catch (Exception e) {
			logger.error("Error al guardar la fórmula médica.", e);
			return null;
		}
	}

	@Override
	public void deleteFormulaMedica(Long id) {
		try {
			formulaMedicaService.deleteById(id);
		} catch (Exception e) {
			logger.error("Error al eliminar la fórmula médica con id: " + id, e);
		}
	}
}
