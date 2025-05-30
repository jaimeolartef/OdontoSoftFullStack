package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.TipoDocumentoMapper;
import org.enterprise.odontosoft.model.entity.TipoDocumento;
import org.enterprise.odontosoft.model.service.TipoDocumentoService;
import org.enterprise.odontosoft.view.dto.response.TipoDocumentoResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class TipoDocumentoControllerImpl implements TipoDocumentoController {

    private static final Logger logger = LoggerFactory.getLogger(TipoDocumentoControllerImpl.class);

    private final TipoDocumentoService tipoDocumentoService;

    @Override
    public ResponseEntity<List<TipoDocumentoResponse>> getAllTipoDocumento() {
        ResponseEntity<List<TipoDocumentoResponse>> responseEntity;
        try {
            List<TipoDocumento> tiposDocumento = tipoDocumentoService.getAllTipoDocumento();
            if (tiposDocumento.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            List<TipoDocumentoResponse> tiposDocumentoResponse = tiposDocumento.stream()
                .map(TipoDocumentoMapper::toResponse)
                .toList();
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(tiposDocumentoResponse);
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error al obtener los tipos de documento.", e);
        }
        return responseEntity;
    }
}