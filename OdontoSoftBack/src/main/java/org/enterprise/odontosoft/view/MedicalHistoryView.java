package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.MedicalHistory;
import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/historiaClinica")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class MedicalHistoryView {

    private final MedicalHistory medicalHistory;

    public MedicalHistoryView(MedicalHistory medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    @PostMapping("/crear")
    public ResponseEntity<HistoriaClinicaResponse> createMedicalHistory(@RequestBody HistoriaClinicaRequest historiaClinicaRequest) {
        return medicalHistory.createMedicalHistory(historiaClinicaRequest);
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<HistoriaClinicaResponse> getMedicalHistoryById(@PathVariable Integer id) {
        return medicalHistory.getMedicalHistoryById(id);
    }

    @PutMapping("/modificar")
    public ResponseEntity<HistoriaClinicaResponse> updateMedicalHistory(@RequestBody HistoriaClinicaRequest historiaClinicaRequest) {
        return medicalHistory.updateMedicalHistory(historiaClinicaRequest);
    }
}
