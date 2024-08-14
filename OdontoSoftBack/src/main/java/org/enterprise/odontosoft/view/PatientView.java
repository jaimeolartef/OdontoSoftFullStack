package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.PatientController;
import org.enterprise.odontosoft.view.dto.PacienteDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pacientes")
public class PatientView {

    private final PatientController patientController;

    public PatientView(PatientController patientController) {
        this.patientController = patientController;
    }

    @PostMapping("/crear")
    public ResponseEntity<PacienteDto> createPatient(@RequestBody PacienteDto paciente) {
        return patientController.createPatient(paciente);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacienteDto> getPatient(@PathVariable Integer id) {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<PacienteDto> updatePatient(@PathVariable Long id, @RequestBody PacienteDto paciente) {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Integer id) {
        return null;
    }
}
