package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.DoctorControllerImpl;
import org.enterprise.odontosoft.view.dto.response.DoctorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorView {

    private final DoctorControllerImpl doctorController;

    public DoctorView(DoctorControllerImpl doctorController) {
        this.doctorController = doctorController;
    }

    @GetMapping("/consultar")
    public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
		try {
			return ResponseEntity.ok(doctorController.getAllDoctors());
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable Integer id) {
        try {
			return ResponseEntity.ok(doctorController.getDoctorById(id));
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
    }

	@GetMapping("/consultar/documento/{documento}")
	public ResponseEntity<DoctorResponse> getDoctorByDocumento(@PathVariable String documento) {
		try {
			DoctorResponse response = doctorController.getDoctorByDocumento(documento);
			if (response == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}
}