package org.enterprise.odontosoft.view;

import java.util.List;

import org.enterprise.odontosoft.controller.PatientController;
import org.enterprise.odontosoft.view.dto.ConsultarPacienteDto;
import org.enterprise.odontosoft.view.dto.PacienteDto;
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
    public ResponseEntity<PacienteDto> createPatient(@RequestBody PacienteDto paciente) {
        return patientController.createPatient(paciente);
    }

    @GetMapping("/consultar")
    public ResponseEntity<List<PacienteDto>> getPatient(@RequestParam String documento, @RequestParam String nombre) {
        return patientController.getPatient(documento.trim(), nombre.trim());
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<PacienteDto> getPatientById(@PathVariable Integer id) {
        return patientController.getPatientById(id);
    }

    @PutMapping("/modificar")
    public ResponseEntity<PacienteDto> updatePatient(@RequestBody PacienteDto paciente) {
        return patientController.updatePatient(paciente);
    }

    @PostMapping("/eliminar/{id}")
    public ResponseEntity<PacienteDto> deletePatient(@PathVariable Integer id) {
        return patientController.deletePatient(id);
    }
}
