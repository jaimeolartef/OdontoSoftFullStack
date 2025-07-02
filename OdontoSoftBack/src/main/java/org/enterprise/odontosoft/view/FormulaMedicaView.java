package org.enterprise.odontosoft.view;

import java.util.List;

import org.enterprise.odontosoft.controller.FormulaMedicaController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.request.FormulaMedicaRequest;
import org.enterprise.odontosoft.view.dto.response.FormulaMedicaResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/formulas-medicas")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class FormulaMedicaView {

	private final FormulaMedicaController formulaMedicaController;

	public FormulaMedicaView(FormulaMedicaController formulaMedicaController) {
		this.formulaMedicaController = formulaMedicaController;
	}

	@PostMapping("/crear")
	public ResponseEntity<ApiResponse<FormulaMedicaResponse>> createFormulaMedica(@RequestBody FormulaMedicaRequest formulaMedica) {
		FormulaMedicaResponse response = formulaMedicaController.saveFormulaMedica(formulaMedica);
		return ResponseEntity.ok(ApiResponse.success(response, "Fórmula médica creada correctamente"));
	}

	@GetMapping("/consultar/{id}")
	public ResponseEntity<ApiResponse<FormulaMedicaResponse>> getFormulaMedicaById(@PathVariable Long id) {
		FormulaMedicaResponse response = formulaMedicaController.getFormulaMedicaById(id);
		return ResponseEntity.ok(ApiResponse.success(response, "Fórmula médica consultada correctamente"));
	}

	@PutMapping("/modificar")
	public ResponseEntity<ApiResponse<FormulaMedicaResponse>> updateFormulaMedica(@RequestBody FormulaMedicaRequest formulaMedica) {
		FormulaMedicaResponse response = formulaMedicaController.saveFormulaMedica(formulaMedica);
		return ResponseEntity.ok(ApiResponse.success(response, "Fórmula médica modificada correctamente"));
	}

	@GetMapping("/listar")
	public ResponseEntity<ApiResponse<List<FormulaMedicaResponse>>> getAllFormulasMedicas() {
		List<FormulaMedicaResponse> response = formulaMedicaController.getAllFormulasMedicas();
		return ResponseEntity.ok(ApiResponse.success(response, "Fórmulas médicas listadas correctamente"));
	}

	@DeleteMapping("/eliminar/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteFormulaMedica(@PathVariable Long id) {
		formulaMedicaController.deleteFormulaMedica(id);
		return ResponseEntity.ok(ApiResponse.success(null, "Fórmula médica eliminada correctamente"));
	}
}
