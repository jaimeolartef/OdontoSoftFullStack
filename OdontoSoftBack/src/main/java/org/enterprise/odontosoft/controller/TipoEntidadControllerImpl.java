package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.TipoEntidadMapper;
import org.enterprise.odontosoft.model.entity.TipoEntidad;
import org.enterprise.odontosoft.model.service.TipoEntidadService;
import org.enterprise.odontosoft.view.dto.response.TipoEntidadResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class TipoEntidadControllerImpl implements TipoEntidadController {

    private static final Logger logger = LoggerFactory.getLogger(TipoEntidadControllerImpl.class);

    private final TipoEntidadService tipoEntidadService;

    @Override
    public List<TipoEntidadResponse> getAllTipoEntidad() {
        try {
            List<TipoEntidad> tiposEntidad = tipoEntidadService.getAllTipoEntidad();
            if (tiposEntidad.isEmpty()) {
                throw new jakarta.persistence.EntityNotFoundException("No se encontraron tipos de entidad.");
            }
            return tiposEntidad.stream()
                .map(TipoEntidadMapper::toResponse)
                .toList();
        } catch (Exception e) {
            logger.error("Error al obtener los tipos de entidad.", e);
            throw e;
        }
    }
}
