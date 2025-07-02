package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.EstadoMedicamentoRequest;
import org.enterprise.odontosoft.view.dto.response.EstadoMedicamentoResponse;

import java.util.List;

public interface EstadoMedicamentoController {

	// Obtener todos los estados de medicamento
	List<EstadoMedicamentoResponse> getAllEstadosMedicamento();

	// Obtener un estado de medicamento por ID
	EstadoMedicamentoResponse getEstadoMedicamentoById(Long id);

	// Guardar un nuevo estado de medicamento
	EstadoMedicamentoResponse saveEstadoMedicamento(EstadoMedicamentoRequest estadoMedicamento);

	// Eliminar un estado de medicamento por ID
	void deleteEstadoMedicamento(Long id);
}
