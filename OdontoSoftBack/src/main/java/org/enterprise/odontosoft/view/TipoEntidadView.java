package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.TipoEntidadController;
import org.enterprise.odontosoft.view.dto.ApiResponse;
import org.enterprise.odontosoft.view.dto.response.TipoEntidadResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/tipoentidad")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TipoEntidadView {

    private final TipoEntidadController tipoEntidadController;

    @GetMapping("/consultar")
    public ResponseEntity<ApiResponse<List<TipoEntidadResponse>>> getTiposEntidad() {
        List<TipoEntidadResponse> response = tipoEntidadController.getAllTipoEntidad();
        return ResponseEntity.ok(ApiResponse.success(response, "Tipos de entidad consultados correctamente"));
    }
}