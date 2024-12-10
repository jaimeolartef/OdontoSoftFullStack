package org.enterprise.odontosoft.view;

import java.util.List;
import java.util.Objects;

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
    public ResponseEntity<List<PacienteResponse>> getPatient(@RequestParam(required = false) String documento, @RequestParam(required = false) String nombre, @RequestParam(required = false) String correo) {
        return patientController.getPatient(Objects.nonNull(documento) ? documento.trim() : null,
            Objects.nonNull(nombre) ? nombre.trim() : null,
            Objects.nonNull(correo) ? correo.trim() : null);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<PacienteResponse> getPatientById(@PathVariable Integer id) {
        return patientController.getPatientById(id);
    }

    @PutMapping("/modificar")
    public ResponseEntity<PacienteResponse> updatePatient(@RequestBody PacienteRequest paciente) {
        return patientController.updatePatient(paciente);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PacienteResponse>> getAllPatients() {
        return patientController.getAllPatients();
    }

}
