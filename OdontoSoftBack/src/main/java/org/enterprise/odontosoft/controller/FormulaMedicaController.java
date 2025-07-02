package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.FormulaMedicaRequest;
import org.enterprise.odontosoft.view.dto.response.FormulaMedicaResponse;

import java.util.List;

public interface FormulaMedicaController {

	// Obtener todas las fórmulas médicas
	List<FormulaMedicaResponse> getAllFormulasMedicas();

	// Obtener una fórmula médica por ID
	FormulaMedicaResponse getFormulaMedicaById(Long id);

	// Guardar una nueva fórmula médica
	FormulaMedicaResponse saveFormulaMedica(FormulaMedicaRequest formulaMedica);

	// Eliminar una fórmula médica por ID
	void deleteFormulaMedica(Long id);
}
