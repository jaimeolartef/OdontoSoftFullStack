package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.AvailabilityController;
import org.enterprise.odontosoft.view.dto.response.DisponibilidadResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/availability")
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
}
