package org.enterprise.odontosoft.view;

import java.util.List;

import org.enterprise.odontosoft.controller.PatientController;
import org.enterprise.odontosoft.view.dto.ConsultarPacienteDto;
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

    @GetMapping("/consultar")
    public ResponseEntity<List<PacienteDto>> getPatient(@RequestParam String documento, @RequestParam String nombre) {
        return patientController.getPatient(documento, nombre);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<PacienteDto> getPatientById(@PathVariable Integer id) {
        return patientController.getPatientById(id);
    }

    @PutMapping("/modificar")
    public ResponseEntity<PacienteDto> updatePatient(@RequestBody PacienteDto paciente) {
        return patientController.updatePatient(paciente);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<PacienteDto> deletePatient(@PathVariable Integer id) {
        return patientController.deletePatient(id);
    }
}
