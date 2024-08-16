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
    // TODO falta implementar el manejo de errores
    @PostMapping("/crear")
    public ResponseEntity<?> createPatient(@RequestBody PacienteDto paciente) {
        return patientController.createPatient(paciente);
    }

    @GetMapping("/consultar")
    public ResponseEntity<List<PacienteDto>> getPatient(@RequestBody ConsultarPacienteDto paciente) {
        return patientController.getPatient(paciente);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable Integer id) {
        return patientController.getPatientById(id);
    }

    @PutMapping("/modificar")
    public ResponseEntity<?> updatePatient(@RequestBody PacienteDto paciente) {
        return patientController.updatePatient(paciente);
    }

    //TODO: Cambiar a DELETE por inhabilitar paciente
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Integer id) {
        return patientController.deletePatient(id);
    }
}
