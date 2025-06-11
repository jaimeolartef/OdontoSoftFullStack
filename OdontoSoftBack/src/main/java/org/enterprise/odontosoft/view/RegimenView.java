package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.RegimenController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.response.RegimenResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/regimen")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class RegimenView {

    private final RegimenController regimenController;

    @GetMapping("/consultar")
    public ResponseEntity<ApiResponse<List<RegimenResponse>>> getRegimenes() {
        List<RegimenResponse> response = regimenController.getAllRegimen();
        return ResponseEntity.ok(ApiResponse.success(response, "Regímenes consultados correctamente"));
    }
}