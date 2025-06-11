package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.DiagnosticProceduresController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.response.TipoAyudaDiagResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/tipoayudadiagnostico")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class DiagnosticProceduresView {

	private final DiagnosticProceduresController diagnosticProceduresController;

	@GetMapping("/consultar")
	public ResponseEntity<ApiResponse<List<TipoAyudaDiagResponse>>> getDiagnosticProcedures() {
		List<TipoAyudaDiagResponse> response = diagnosticProceduresController.getAllDiagnosticProcedures();
		return ResponseEntity.ok(ApiResponse.success(response, "Tipos de ayuda diagnóstica obtenidos correctamente"));
	}

	@PostMapping("/subirArchivo")
	public ResponseEntity<ApiResponse<Void>> uploadFile(
		@RequestParam("file") MultipartFile file,
		@RequestParam("idTipoAyudaDiag") Integer idTipoAyudaDiag) {
		diagnosticProceduresController.saveFile(file, idTipoAyudaDiag);
		return ResponseEntity.ok(ApiResponse.success(null, "Archivo subido correctamente"));
	}
}