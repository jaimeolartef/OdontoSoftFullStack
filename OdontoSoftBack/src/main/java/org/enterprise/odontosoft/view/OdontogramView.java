package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.OdontogramController;
import org.enterprise.odontosoft.view.dto.request.OdontogramaRequest;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/odontograma")
public class OdontogramView {

	private final OdontogramController odontogramController;

	@GetMapping("/consultar/{idMedicalHistory}")
	public ResponseEntity<OdontogramaResponse> getOdontogramByMedicalHistory(@PathVariable Integer idMedicalHistory) {
		return odontogramController.getOdontogramByMedicalHistory(idMedicalHistory);
	}

	@PostMapping("/guardar")
	public ResponseEntity<OdontogramaResponse> saveOdontogram(@RequestBody OdontogramaRequest odontogramaRequest) {
		return odontogramController.saveOdontogram(odontogramaRequest);
	}
}
