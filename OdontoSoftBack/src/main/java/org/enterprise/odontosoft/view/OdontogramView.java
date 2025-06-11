package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.OdontogramController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.request.OdontogramaRequest;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/odontograma")
public class OdontogramView {

    private final OdontogramController odontogramController;

    @GetMapping("/consultar/{idMedicalHistory}")
    public ResponseEntity<ApiResponse<OdontogramaResponse>> getOdontogramByMedicalHistory(@PathVariable Integer idMedicalHistory) {
        OdontogramaResponse response = odontogramController.getOdontogramByMedicalHistory(idMedicalHistory);
        return ResponseEntity.ok(ApiResponse.success(response, "Odontograma obtenido correctamente"));
    }

    @PostMapping("/guardar")
    public ResponseEntity<ApiResponse<OdontogramaResponse>> saveOdontogram(@RequestBody OdontogramaRequest odontogramaRequest) {
        odontogramController.saveOdontogram(odontogramaRequest);
        return ResponseEntity.ok(ApiResponse.success(null, "Odontograma guardado correctamente"));
    }
}