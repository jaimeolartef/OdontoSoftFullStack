package org.enterprise.odontosoft.view;

import java.util.List;
import java.util.Objects;

import org.enterprise.odontosoft.controller.PatientController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.request.PacienteRequest;
import org.enterprise.odontosoft.view.dto.response.PacienteResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pacientes")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class PatientView {

    private final PatientController patientController;

    public PatientView(PatientController patientController) {
        this.patientController = patientController;
    }

    @PostMapping("/crear")
    public ResponseEntity<ApiResponse<PacienteResponse>> createPatient(@RequestBody PacienteRequest paciente) {
        PacienteResponse response = patientController.createPatient(paciente);
        return ResponseEntity.ok(ApiResponse.success(response, "Paciente creado correctamente"));
    }

    @GetMapping("/consultar")
    public ResponseEntity<ApiResponse<List<PacienteResponse>>> getPatient(
            @RequestParam(required = false) String documento,
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String correo) {
        List<PacienteResponse> response = patientController.getPatient(
            Objects.nonNull(documento) ? documento.trim() : null,
            Objects.nonNull(nombre) ? nombre.trim() : null,
            Objects.nonNull(correo) ? correo.trim() : null
        );
        return ResponseEntity.ok(ApiResponse.success(response, "Pacientes consultados correctamente"));
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ApiResponse<PacienteResponse>> getPatientById(@PathVariable Integer id) {
        PacienteResponse response = patientController.getPatientById(id);
        return ResponseEntity.ok(ApiResponse.success(response, "Paciente consultado correctamente"));
    }

    @PutMapping("/modificar")
    public ResponseEntity<ApiResponse<PacienteResponse>> updatePatient(@RequestBody PacienteRequest paciente) {
        PacienteResponse response = patientController.updatePatient(paciente);
        return ResponseEntity.ok(ApiResponse.success(response, "Paciente modificado correctamente"));
    }

    @GetMapping("/listar")
    public ResponseEntity<ApiResponse<List<PacienteResponse>>> getAllPatients() {
        List<PacienteResponse> response = patientController.getAllPatients();
        return ResponseEntity.ok(ApiResponse.success(response, "Pacientes listados correctamente"));
    }
}