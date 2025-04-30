package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.DiagnosticProceduresController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@RestController
@RequestMapping("/tipoayudadiagnostico")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class DiagnosticProceduresView {

	private final DiagnosticProceduresController diagnosticProceduresController;

	@GetMapping("/consultar")
	public ResponseEntity getDiagnosticProcedures() {
		return diagnosticProceduresController.getAllDiagnosticProcedures();
	}

	@PostMapping("/subirArchivo")
	public ResponseEntity<?> uploadFile(
		@RequestParam("file") MultipartFile file,
		@RequestParam("idTipoAyudaDiag") Integer idTipoAyudaDiag) {

		return diagnosticProceduresController.saveFile(file, idTipoAyudaDiag);
	}
}
