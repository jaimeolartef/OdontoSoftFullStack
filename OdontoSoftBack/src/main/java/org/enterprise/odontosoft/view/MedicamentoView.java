package org.enterprise.odontosoft.view;

import java.util.List;

import org.enterprise.odontosoft.controller.MedicamentoController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.request.MedicamentoRequest;
import org.enterprise.odontosoft.view.dto.response.MedicamentoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medicamentos")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class MedicamentoView {

	private final MedicamentoController medicamentoController;

	public MedicamentoView(MedicamentoController medicamentoController) {
		this.medicamentoController = medicamentoController;
	}

	@PostMapping("/crear")
	public ResponseEntity<ApiResponse<MedicamentoResponse>> createMedicamento(@RequestBody MedicamentoRequest medicamento) {
		MedicamentoResponse response = medicamentoController.saveMedicamento(medicamento);
		return ResponseEntity.ok(ApiResponse.success(response, "Medicamento creado correctamente"));
	}

	@GetMapping("/consultar/{id}")
	public ResponseEntity<ApiResponse<MedicamentoResponse>> getMedicamentoById(@PathVariable Long id) {
		MedicamentoResponse response = medicamentoController.getMedicamentoById(id);
		return ResponseEntity.ok(ApiResponse.success(response, "Medicamento consultado correctamente"));
	}

	@PutMapping("/modificar")
	public ResponseEntity<ApiResponse<MedicamentoResponse>> updateMedicamento(@RequestBody MedicamentoRequest medicamento) {
		MedicamentoResponse response = medicamentoController.saveMedicamento(medicamento);
		return ResponseEntity.ok(ApiResponse.success(response, "Medicamento modificado correctamente"));
	}

	@GetMapping("/listar")
	public ResponseEntity<ApiResponse<List<MedicamentoResponse>>> getAllMedicamentos() {
		List<MedicamentoResponse> response = medicamentoController.getAllMedicamentos();
		return ResponseEntity.ok(ApiResponse.success(response, "Medicamentos listados correctamente"));
	}

	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteMedicamento(@PathVariable Long id) {
		medicamentoController.deleteMedicamento(id);
		return ResponseEntity.ok(ApiResponse.success(null, "Medicamento eliminado correctamente"));
	}
}