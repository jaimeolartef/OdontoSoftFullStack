package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.EstadoMedicamentoController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.request.EstadoMedicamentoRequest;
import org.enterprise.odontosoft.view.dto.response.EstadoMedicamentoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estados-medicamento")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class EstadoMedicamentoView {

	private final EstadoMedicamentoController estadoMedicamentoController;

	public EstadoMedicamentoView(EstadoMedicamentoController estadoMedicamentoController) {
		this.estadoMedicamentoController = estadoMedicamentoController;
	}

	@PostMapping("/crear")
	public ResponseEntity<ApiResponse<EstadoMedicamentoResponse>> createEstadoMedicamento(@RequestBody EstadoMedicamentoRequest estadoMedicamento) {
		EstadoMedicamentoResponse response = estadoMedicamentoController.saveEstadoMedicamento(estadoMedicamento);
		return ResponseEntity.ok(ApiResponse.success(response, "Estado de medicamento creado correctamente"));
	}

	@GetMapping("/consultar/{id}")
	public ResponseEntity<ApiResponse<EstadoMedicamentoResponse>> getEstadoMedicamentoById(@PathVariable Long id) {
		EstadoMedicamentoResponse response = estadoMedicamentoController.getEstadoMedicamentoById(id);
		return ResponseEntity.ok(ApiResponse.success(response, "Estado de medicamento consultado correctamente"));
	}

	@PutMapping("/modificar")
	public ResponseEntity<ApiResponse<EstadoMedicamentoResponse>> updateEstadoMedicamento(@RequestBody EstadoMedicamentoRequest estadoMedicamento) {
		EstadoMedicamentoResponse response = estadoMedicamentoController.saveEstadoMedicamento(estadoMedicamento);
		return ResponseEntity.ok(ApiResponse.success(response, "Estado de medicamento modificado correctamente"));
	}

	@GetMapping("/listar")
	public ResponseEntity<ApiResponse<List<EstadoMedicamentoResponse>>> getAllEstadosMedicamento() {
		List<EstadoMedicamentoResponse> response = estadoMedicamentoController.getAllEstadosMedicamento();
		return ResponseEntity.ok(ApiResponse.success(response, "Estados de medicamento listados correctamente"));
	}

	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteEstadoMedicamento(@PathVariable Long id) {
		estadoMedicamentoController.deleteEstadoMedicamento(id);
		return ResponseEntity.ok(ApiResponse.success(null, "Estado de medicamento eliminado correctamente"));
	}
}