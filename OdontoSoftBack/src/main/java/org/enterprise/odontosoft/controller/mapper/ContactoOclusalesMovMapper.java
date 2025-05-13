package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.ContactoOclusalesMov;
import org.enterprise.odontosoft.model.entity.HistoriaClinica;
import org.enterprise.odontosoft.model.entity.TipoContactoOclusalMov;
import org.enterprise.odontosoft.model.entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.ContactoOclusalesMovRequest;
import org.enterprise.odontosoft.view.dto.response.ContactoOclusalesMovResponse;

import java.util.Objects;

@UtilityClass
public class ContactoOclusalesMovMapper {

    public static ContactoOclusalesMov toEntity(ContactoOclusalesMovRequest contactoOclusalesMovRequest) {
        return ContactoOclusalesMov.builder()
                .id(contactoOclusalesMovRequest.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(contactoOclusalesMovRequest.getIdhistoriaclinica()).build())
                .fechaexamen(contactoOclusalesMovRequest.getFechaexamen())
                .idtipocontacoclumov(TipoContactoOclusalMov.builder().id(contactoOclusalesMovRequest.getIdtipocontacoclumov()).build())
                .seleccion(contactoOclusalesMovRequest.getSeleccion())
                .cuales(contactoOclusalesMovRequest.getCuales())
                .idusuariocreacion(Usuario.builder().id(contactoOclusalesMovRequest.getIdusuariocreacion()).build())
                .fechacreacion(contactoOclusalesMovRequest.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(contactoOclusalesMovRequest.getIdusuariomodificacion()) ? Usuario.builder().id(contactoOclusalesMovRequest.getIdusuariomodificacion()).build() : null)
                .fechamodificacion(contactoOclusalesMovRequest.getFechamodificacion())
                .habilitado(contactoOclusalesMovRequest.getHabilitado())
                .build();
    }

    public static ContactoOclusalesMovResponse toResponse(ContactoOclusalesMov contactoOclusalesMov) {
        return ContactoOclusalesMovResponse.builder()
                .id(contactoOclusalesMov.getId())
                .idhistoriaclinica(contactoOclusalesMov.getIdhistoriaclinica().getId())
                .fechaexamen(contactoOclusalesMov.getFechaexamen())
                .idtipocontacoclumov(contactoOclusalesMov.getIdtipocontacoclumov().getDescripcion())
                .seleccion(contactoOclusalesMov.getSeleccion())
                .cuales(contactoOclusalesMov.getCuales())
                .idusuariocreacion(contactoOclusalesMov.getIdusuariocreacion().getId())
                .fechacreacion(contactoOclusalesMov.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(contactoOclusalesMov.getIdusuariomodificacion()) ? contactoOclusalesMov.getIdusuariomodificacion().getId() : null)
                .fechamodificacion(contactoOclusalesMov.getFechamodificacion())
                .habilitado(contactoOclusalesMov.getHabilitado())
                .build();
    }
}
