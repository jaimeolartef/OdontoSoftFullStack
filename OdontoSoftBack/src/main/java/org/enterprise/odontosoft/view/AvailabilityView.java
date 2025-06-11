package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.AvailabilityController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.request.DisponibilidadRequest;
import org.enterprise.odontosoft.view.dto.response.DisponibilidadResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/availability")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class AvailabilityView {

	private final AvailabilityController availabilityController;

	public AvailabilityView(AvailabilityController availabilityController) {
		this.availabilityController = availabilityController;
	}

	@RequestMapping("/doctor/{idDoctor}")
	public ResponseEntity<ApiResponse<List<DisponibilidadResponse>>> findAvailabilityByDoctor(
		@PathVariable Integer idDoctor,
		@RequestParam(required = true) Integer month,
		@RequestParam(required = true) Integer year) {
		List<DisponibilidadResponse> response = availabilityController.findAvailabilityByDoctor(idDoctor, month, year);
		return ResponseEntity.ok(ApiResponse.success(response, "Disponibilidad encontrada para el doctor"));
	}

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<List<DisponibilidadResponse>>> saveAvailabilityByDoctor(
		@RequestBody List<DisponibilidadRequest> disponibilidadRequests) {
		List<DisponibilidadResponse> response = availabilityController.saveAvailabilityByDoctor(disponibilidadRequests);
		return ResponseEntity.ok(ApiResponse.success(response, "Disponibilidad guardada correctamente"));
	}
}