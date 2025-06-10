package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.AnalysisController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.response.TipoDiagnosticoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/tipodiagnostico")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class AnalysisView {

    private final AnalysisController analysisController;

    @GetMapping("/consultar")
    public ResponseEntity<ApiResponse<List<TipoDiagnosticoResponse>>> getHabitos() {
        List<TipoDiagnosticoResponse> response = analysisController.getAllAnalysis();
        return ResponseEntity.ok(ApiResponse.success(response, "Listado de tipos de diagnóstico obtenido exitosamente"));
    }

}