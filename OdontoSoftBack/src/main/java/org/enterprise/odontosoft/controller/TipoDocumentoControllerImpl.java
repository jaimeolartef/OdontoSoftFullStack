package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.TipoDocumentoMapper;
import org.enterprise.odontosoft.model.entity.TipoDocumento;
import org.enterprise.odontosoft.model.service.TipoDocumentoService;
import org.enterprise.odontosoft.view.dto.response.TipoDocumentoResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class TipoDocumentoControllerImpl implements TipoDocumentoController {

    private static final Logger logger = LoggerFactory.getLogger(TipoDocumentoControllerImpl.class);

    private final TipoDocumentoService tipoDocumentoService;

    @Override
    public List<TipoDocumentoResponse> getAllTipoDocumento() {
        try {
            List<TipoDocumento> tiposDocumento = tipoDocumentoService.getAllTipoDocumento();
            if (tiposDocumento.isEmpty()) {
                throw new jakarta.persistence.EntityNotFoundException("No se encontraron tipos de documento.");
            }
            return tiposDocumento.stream()
                .map(TipoDocumentoMapper::toResponse)
                .toList();
        } catch (Exception e) {
            logger.error("Error al obtener los tipos de documento.", e);
            throw e;
        }
    }
}