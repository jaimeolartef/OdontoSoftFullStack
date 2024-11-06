package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.TypeTreatmentPlanController;
import org.enterprise.odontosoft.view.dto.response.TipoTratamientoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/plantramientos")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class TypeTreatmentPlanView {

	private final TypeTreatmentPlanController typeTreatmentPlanController;

	@GetMapping("/consultar")
	public ResponseEntity<List<TipoTratamientoResponse>> getTypeTreatmentPlan() {
		return typeTreatmentPlanController.getTypeTreatmentPlan();
	}
}
