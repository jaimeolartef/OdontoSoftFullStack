package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.TipoDocumentoController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.response.TipoDocumentoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/tipodocumento")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TipoDocumentoView {

    private final TipoDocumentoController tipoDocumentoController;

    @GetMapping("/consultar")
    public ResponseEntity<ApiResponse<List<TipoDocumentoResponse>>> getTiposDocumento() {
        List<TipoDocumentoResponse> response = tipoDocumentoController.getAllTipoDocumento();
        return ResponseEntity.ok(ApiResponse.success(response, "Tipos de documento consultados correctamente"));
    }
}