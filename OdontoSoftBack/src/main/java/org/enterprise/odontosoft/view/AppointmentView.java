package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.AppointmentController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.request.CitaRequest;
import org.enterprise.odontosoft.view.dto.response.CitaResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class AppointmentView {

    private final AppointmentController appointmentController;

    public AppointmentView(AppointmentController appointmentController) {
        this.appointmentController = appointmentController;
    }

    @GetMapping("/doctor")
    public ResponseEntity<ApiResponse<List<CitaResponse>>> findByMedico(@RequestParam Integer idOdontologo, @RequestParam String fechaDia) {
            List<CitaResponse> response = appointmentController.findByMedico(idOdontologo, fechaDia);
            return ResponseEntity.ok(ApiResponse.success(response, "Citas encontradas para el médico y fecha indicados"));
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse<CitaResponse>> updateAppointment(@RequestBody CitaRequest citaRequest) {
            CitaResponse response = appointmentController.updateAppointment(citaRequest);
            return ResponseEntity.ok(ApiResponse.success(response, "Cita actualizada exitosamente"));
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<CitaResponse>> createAppointment(@RequestBody CitaRequest citaRequest) {
            CitaResponse response = appointmentController.updateAppointment(citaRequest);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(response, "Cita creada exitosamente"));
    }
}