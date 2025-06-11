package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.TipoEntidadResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TipoEntidadController {
    List<TipoEntidadResponse> getAllTipoEntidad();
}