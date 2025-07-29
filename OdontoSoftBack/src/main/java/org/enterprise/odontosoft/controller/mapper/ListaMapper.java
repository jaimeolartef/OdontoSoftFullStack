package org.enterprise.odontosoft.controller.mapper;

import org.enterprise.odontosoft.model.entity.Lista;
import org.enterprise.odontosoft.view.dto.response.ListaResponse;

import java.util.Collections;
import java.util.stream.Collectors;

public class ListaMapper {

    /**
     * Convierte una entidad Lista a un DTO ListaResponse
     * @param lista Entidad a convertir
     * @return DTO con la información de la lista
     */
    public static ListaResponse toResponse(Lista lista) {
        if (lista == null) {
            return null;
        }

        ListaResponse response = new ListaResponse();
        response.setId(lista.getId());
        response.setCodigo(lista.getCodigo());
        response.setDescripcion(lista.getDescripcion());
        response.setHabilitado(lista.getHabilitado());

        // Mapeo de los detalles si existen
        if (lista.getDetalles() != null && !lista.getDetalles().isEmpty()) {
            response.setDetalles(
                lista.getDetalles().stream()
                    .map(ListaDetalleMapper::toResponse)
                    .collect(Collectors.toList())
            );
        } else {
            response.setDetalles(Collections.emptyList());
        }

        return response;
    }

    /**
     * Convierte un DTO ListaResponse a una entidad Lista
     * @param response DTO a convertir
     * @return Entidad con la información de la lista
     */
    public static Lista toEntity(ListaResponse response) {
        if (response == null) {
            return null;
        }

        Lista lista = new Lista();
        lista.setId(response.getId());
        lista.setCodigo(response.getCodigo());
        lista.setDescripcion(response.getDescripcion());
        lista.setHabilitado(response.getHabilitado());

        return lista;
    }
}
