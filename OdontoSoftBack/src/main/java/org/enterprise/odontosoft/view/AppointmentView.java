package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.AppointmentController;
import org.enterprise.odontosoft.view.dto.response.CitaResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentView {

	private final AppointmentController appointmentController;

	public AppointmentView(AppointmentController appointmentController) {
		this.appointmentController = appointmentController;
	}

	@RequestMapping("/doctor/{idDoctor}")
	public ResponseEntity<List<CitaResponse>> findByMedico(@PathVariable Integer idDoctor) {
		try {
			return ResponseEntity.ok(appointmentController.findByMedico(idDoctor));
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}
}
