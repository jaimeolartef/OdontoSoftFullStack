package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.entity.TipoEntidad;
import org.enterprise.odontosoft.view.dto.response.TipoEntidadResponse;

public class TipoEntidadMapper {

    public static TipoEntidadResponse toResponse(TipoEntidad tipoEntidad) {
        if (tipoEntidad == null) {
            return null;
        }

        return new TipoEntidadResponse(
            tipoEntidad.getId(),
            tipoEntidad.getDescripcion(),
            tipoEntidad.getHabilitado()
        );
    }
}