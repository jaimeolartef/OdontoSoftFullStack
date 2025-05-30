package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.TipoDocumentoResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TipoDocumentoController {
    ResponseEntity<List<TipoDocumentoResponse>> getAllTipoDocumento();
}