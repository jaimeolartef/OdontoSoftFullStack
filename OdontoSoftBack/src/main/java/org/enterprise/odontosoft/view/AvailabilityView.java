package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.AvailabilityController;
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
	public ResponseEntity<List<DisponibilidadResponse>> findAvailabilityByDoctor(
	        @PathVariable Integer idDoctor,
	        @RequestParam(required = true) Integer month,
	        @RequestParam(required = true) Integer year) {
	    try {
	        return ResponseEntity.ok(availabilityController.findAvailabilityByDoctor(idDoctor, month, year));
	    } catch (Exception e) {
	        return ResponseEntity.status(500).build();
	    }
	}

	@PostMapping("/save")
	public ResponseEntity<List<DisponibilidadResponse>> saveAvailabilityByDoctor(
	        @RequestBody List<DisponibilidadRequest> disponibilidadRequests) {
	    try {
	        return ResponseEntity.ok(availabilityController.saveAvailabilityByDoctor(disponibilidadRequests));
	    } catch (Exception e) {
	        return ResponseEntity.status(500).build();
	    }
	}
}
