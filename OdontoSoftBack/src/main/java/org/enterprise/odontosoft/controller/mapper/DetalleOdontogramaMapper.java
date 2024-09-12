package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.*;
import org.enterprise.odontosoft.view.dto.request.DetalleOdontogramaRequest;
import org.enterprise.odontosoft.view.dto.response.DetalleOdontogramaResponse;

import java.util.Objects;

@UtilityClass
public class DetalleOdontogramaMapper {

    public static DetalleOdontograma toEntity(DetalleOdontogramaRequest detalleOdontogramaRequest) {
        return DetalleOdontograma.builder()
            .id(detalleOdontogramaRequest.getId())
            .idodontograma(Odontograma.builder().id(detalleOdontogramaRequest.getIdodontograma()).build())
            .iddiente(Diente.builder().id(detalleOdontogramaRequest.getIddiente()).build())
            .idestado(EstadoDiente.builder().id(detalleOdontogramaRequest.getIdestado()).build())
            .idtratamiento(Tratamiento.builder().id(detalleOdontogramaRequest.getIdtratamiento()).build())
            .idusuariocreacion(Usuario.builder().id(detalleOdontogramaRequest.getIdusuariocreacion()).build())
            .fechacreacion(detalleOdontogramaRequest.getFechacreacion())
            .idusuariomodificacion(Usuario.builder().id(detalleOdontogramaRequest.getIdusuariomodificacion()).build())
            .fechamodificacion(detalleOdontogramaRequest.getFechamodificacion())
            .habilitado(detalleOdontogramaRequest.getHabilitado())
            .build();
    }

    public static DetalleOdontogramaResponse toResponse(DetalleOdontograma detalleOdontograma) {
        return DetalleOdontogramaResponse.builder()
            .id(detalleOdontograma.getId())
            .idodontograma(detalleOdontograma.getIdodontograma().getId())
            .iddiente(detalleOdontograma.getIddiente().getId())
            .idestado(detalleOdontograma.getIdestado().getId())
            .idtratamiento(detalleOdontograma.getIdtratamiento().getId())
            .idusuariocreacion(detalleOdontograma.getIdusuariocreacion().getId())
            .fechacreacion(detalleOdontograma.getFechacreacion())
            .idusuariomodificacion(Objects.nonNull(detalleOdontograma.getIdusuariomodificacion()) ? detalleOdontograma.getIdusuariomodificacion().getId() : null)
            .fechamodificacion(detalleOdontograma.getFechamodificacion())
            .habilitado(detalleOdontograma.getHabilitado())
            .build();
    }
}
