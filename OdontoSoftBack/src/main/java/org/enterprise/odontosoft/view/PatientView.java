package org.enterprise.odontosoft.view;

import java.util.List;

import org.enterprise.odontosoft.controller.PatientController;
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
    public ResponseEntity<PacienteResponse> createPatient(@RequestBody PacienteRequest paciente) {
        return patientController.createPatient(paciente);
    }

    @GetMapping("/consultar")
    public ResponseEntity<List<PacienteResponse>> getPatient(@RequestParam String documento, @RequestParam String nombre) {
        return patientController.getPatient(documento.trim(), nombre.trim());
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<PacienteResponse> getPatientById(@PathVariable Integer id) {
        return patientController.getPatientById(id);
    }

    @PutMapping("/modificar")
    public ResponseEntity<PacienteResponse> updatePatient(@RequestBody PacienteRequest paciente) {
        return patientController.updatePatient(paciente);
    }

}
