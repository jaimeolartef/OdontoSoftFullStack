package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.AppointmentController;
import org.enterprise.odontosoft.view.dto.request.CitaRequest;
import org.enterprise.odontosoft.view.dto.response.CitaResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentView {

	private final AppointmentController appointmentController;

	public AppointmentView(AppointmentController appointmentController) {
		this.appointmentController = appointmentController;
	}

	@GetMapping("/doctor/{idDoctor}")
	public ResponseEntity<List<CitaResponse>> findByMedico(@PathVariable Integer idDoctor) {
		try {
			return ResponseEntity.ok(appointmentController.findByMedico(idDoctor));
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}

	@PutMapping("/update")
	public ResponseEntity<CitaResponse> updateAppointment(@RequestBody CitaRequest citaRequest) {
		try {
			return ResponseEntity.ok(appointmentController.updateAppointment(citaRequest));
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}
}
