package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.TipoEntidadMapper;
import org.enterprise.odontosoft.model.entity.TipoEntidad;
import org.enterprise.odontosoft.model.service.TipoEntidadService;
import org.enterprise.odontosoft.view.dto.response.TipoEntidadResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class TipoEntidadControllerImpl implements TipoEntidadController {

    private static final Logger logger = LoggerFactory.getLogger(TipoEntidadControllerImpl.class);

    private final TipoEntidadService tipoEntidadService;

    @Override
    public ResponseEntity<List<TipoEntidadResponse>> getAllTipoEntidad() {
        ResponseEntity<List<TipoEntidadResponse>> responseEntity;
        try {
            List<TipoEntidad> tiposEntidad = tipoEntidadService.getAllTipoEntidad();
            if (tiposEntidad.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            List<TipoEntidadResponse> tiposEntidadResponse = tiposEntidad.stream()
                .map(TipoEntidadMapper::toResponse)
                .toList();
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(tiposEntidadResponse);
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error al obtener los tipos de entidad.", e);
        }
        return responseEntity;
    }
}
