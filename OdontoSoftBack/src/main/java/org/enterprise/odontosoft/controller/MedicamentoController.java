package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.request.MedicamentoRequest;
import org.enterprise.odontosoft.view.dto.response.MedicamentoResponse;

import java.util.List;

public interface MedicamentoController {

	// Obtener todos los medicamentos
	List<MedicamentoResponse> getAllMedicamentos();

	// Obtener un medicamento por ID
	MedicamentoResponse getMedicamentoById(Long id);

	// Guardar un nuevo medicamento
	MedicamentoResponse saveMedicamento(MedicamentoRequest medicamento);

	// Eliminar un medicamento por ID
	void deleteMedicamento(Long id);
}
