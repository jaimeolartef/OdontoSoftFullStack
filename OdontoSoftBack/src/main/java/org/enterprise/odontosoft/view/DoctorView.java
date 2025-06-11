package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.DoctorControllerImpl;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.response.DoctorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorView {

    private final DoctorControllerImpl doctorController;

    public DoctorView(DoctorControllerImpl doctorController) {
        this.doctorController = doctorController;
    }

    @GetMapping("/consultar")
    public ResponseEntity<ApiResponse<List<DoctorResponse>>> getAllDoctors() {
        List<DoctorResponse> response = doctorController.getAllDoctors();
        return ResponseEntity.ok(ApiResponse.success(response, "Doctores obtenidos correctamente"));
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ApiResponse<DoctorResponse>> getDoctorById(@PathVariable Integer id) {
        DoctorResponse response = doctorController.getDoctorById(id);
        return ResponseEntity.ok(ApiResponse.success(response, "Doctor obtenido correctamente"));
    }

    @GetMapping("/consultar/documento/{documento}")
    public ResponseEntity<ApiResponse<DoctorResponse>> getDoctorByDocumento(@PathVariable String documento) {
        DoctorResponse response = doctorController.getDoctorByDocumento(documento);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Doctor no encontrado"));
        }
        return ResponseEntity.ok(ApiResponse.success(response, "Doctor obtenido correctamente"));
    }
}