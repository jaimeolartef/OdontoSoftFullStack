package org.enterprise.odontosoft.view;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.TipoDocumentoController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/tipodocumento")
@CrossOrigin(originPatterns = "http://localhost:*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TipoDocumentoView {

    private final TipoDocumentoController tipoDocumentoController;

    @GetMapping("/consultar")
    public ResponseEntity getTiposDocumento() {
        return tipoDocumentoController.getAllTipoDocumento();
    }
}