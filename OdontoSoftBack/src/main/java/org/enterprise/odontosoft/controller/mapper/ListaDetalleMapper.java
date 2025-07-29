package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.entity.ListaDetalle;
import org.enterprise.odontosoft.view.dto.response.ListaDetalleResponse;

public class ListaDetalleMapper {

    /**
     * Convierte una entidad ListaDetalle a un DTO ListaDetalleResponse
     * @param listaDetalle Entidad a convertir
     * @return DTO con la información del detalle de lista
     */
    public static ListaDetalleResponse toResponse(ListaDetalle listaDetalle) {
        if (listaDetalle == null) {
            return null;
        }

        ListaDetalleResponse response = new ListaDetalleResponse();
        response.setCodigo(listaDetalle.getCodigo());
        response.setDescripcion(listaDetalle.getDescripcion());
        response.setHabilitado(listaDetalle.getHabilitado());
        return response;
    }

    /**
     * Convierte un DTO ListaDetalleResponse a una entidad ListaDetalle
     * @param response DTO a convertir
     * @return Entidad con la información del detalle de lista
     */
    public static ListaDetalle toEntity(ListaDetalleResponse response) {
        if (response == null) {
            return null;
        }

        ListaDetalle listaDetalle = new ListaDetalle();
        listaDetalle.setCodigo(response.getCodigo());
        listaDetalle.setDescripcion(response.getDescripcion());
        listaDetalle.setHabilitado(response.getHabilitado());

        return listaDetalle;
    }
}
