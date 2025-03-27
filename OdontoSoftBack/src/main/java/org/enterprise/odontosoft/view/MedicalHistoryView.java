package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.MedicalHistoryController;
import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/historiaClinica")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class MedicalHistoryView {

    private final MedicalHistoryController medicalHistoryController;

    public MedicalHistoryView(MedicalHistoryController medicalHistoryController) {
        this.medicalHistoryController = medicalHistoryController;
    }

    @PostMapping("/crear")
    public ResponseEntity<HistoriaClinicaResponse> createMedicalHistory(@RequestBody HistoriaClinicaRequest historiaClinicaRequest) {
        return medicalHistoryController.createMedicalHistory(historiaClinicaRequest);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<HistoriaClinicaResponse> getMedicalHistoryById(@PathVariable Integer id) {
        return medicalHistoryController.getMedicalHistoryById(id);
    }

    @GetMapping("/consultar/paciente/{idPaciente}")
    public ResponseEntity<HistoriaClinicaResponse> getMedicalHistory(@PathVariable Integer idPaciente) {
        return medicalHistoryController.getMedicalHistoryByIdPaciente(idPaciente);
    }

    @PutMapping("/modificar")
    public ResponseEntity<HistoriaClinicaResponse> updateMedicalHistory(@RequestBody HistoriaClinicaRequest historiaClinicaRequest) {
        return medicalHistoryController.updateMedicalHistory(historiaClinicaRequest);
    }
}
