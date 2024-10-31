package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.AnalysisController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/tipodiagnostico")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class AnalysisView {

    private final AnalysisController analysisController;

    @GetMapping("/consultar")
    public ResponseEntity getHabitos() {
        return analysisController.getAllAnalysis();
    }
}
