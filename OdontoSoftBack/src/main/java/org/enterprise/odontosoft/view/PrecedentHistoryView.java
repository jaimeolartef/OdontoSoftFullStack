package org.enterprise.odontosoft.view;

import lombok.RequiredArgsConstructor;
import org.enterprise.odontosoft.controller.PrecedentHistoryController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.response.AntecedenteResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/precedenthistory")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class PrecedentHistoryView {

    private final PrecedentHistoryController precedentHistory;

    @GetMapping("/get")
    public ResponseEntity<ApiResponse<List<AntecedenteResponse>>> getAntecedentes() {
        List<AntecedenteResponse> response = precedentHistory.getAntecedentes();
        return ResponseEntity.ok(ApiResponse.success(response, "Antecedentes obtenidos correctamente"));
    }
}