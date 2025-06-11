package org.enterprise.odontosoft.view;

import org.enterprise.odontosoft.controller.MedicalHistoryController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
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
    public ResponseEntity<ApiResponse<HistoriaClinicaResponse>> createMedicalHistory(@RequestBody HistoriaClinicaRequest historiaClinicaRequest) {
        HistoriaClinicaResponse response = medicalHistoryController.createMedicalHistory(historiaClinicaRequest);
        return ResponseEntity.ok(ApiResponse.success(response, "Historia clínica creada correctamente"));
    }

    @GetMapping("/consultar/{id}")
    public ResponseEntity<ApiResponse<HistoriaClinicaResponse>> getMedicalHistoryById(@PathVariable Integer id) {
        HistoriaClinicaResponse response = medicalHistoryController.getMedicalHistoryById(id);
        return ResponseEntity.ok(ApiResponse.success(response, "Historia clínica obtenida correctamente"));
    }

    @GetMapping("/consultar/paciente/{idPaciente}")
    public ResponseEntity<ApiResponse<HistoriaClinicaResponse>> getMedicalHistory(@PathVariable Integer idPaciente) {
        HistoriaClinicaResponse response = medicalHistoryController.getMedicalHistoryByIdPaciente(idPaciente);
        return ResponseEntity.ok(ApiResponse.success(response, "Historia clínica del paciente obtenida correctamente"));
    }

    @PutMapping("/modificar")
    public ResponseEntity<ApiResponse<HistoriaClinicaResponse>> updateMedicalHistory(@RequestBody HistoriaClinicaRequest historiaClinicaRequest) {
        HistoriaClinicaResponse response = medicalHistoryController.updateMedicalHistory(historiaClinicaRequest);
        return ResponseEntity.ok(ApiResponse.success(response, "Historia clínica modificada correctamente"));
    }
}