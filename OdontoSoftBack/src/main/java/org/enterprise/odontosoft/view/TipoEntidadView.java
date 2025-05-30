package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.TipoEntidadController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/tipoentidad")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TipoEntidadView {

    private final TipoEntidadController tipoEntidadController;

    @GetMapping("/consultar")
    public ResponseEntity getTiposEntidad() {
        return tipoEntidadController.getAllTipoEntidad();
    }
}