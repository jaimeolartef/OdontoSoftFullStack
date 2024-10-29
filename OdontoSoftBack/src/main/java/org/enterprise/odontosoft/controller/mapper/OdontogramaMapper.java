package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.Odontograma;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.OdontogramaRequest;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;

import java.util.Objects;
import java.util.stream.Collectors;

@UtilityClass
public class OdontogramaMapper {

    public static Odontograma toEntity(OdontogramaRequest odontogramaRequest) {
        return Odontograma.builder()
            .id(odontogramaRequest.getId())
            .idhistoriaclinica(HistoriaClinica.builder().id(odontogramaRequest.getIdhistoriaclinica()).build())
            .fecha(odontogramaRequest.getFecha())
            .idusuariocreacion(Usuario.builder().codigo(odontogramaRequest.getIdusuariocreacion()).build())
            .fechacreacion(odontogramaRequest.getFechacreacion())
            .idusuariomodificacion(Objects.nonNull(odontogramaRequest.getIdusuariomodificacion()) ? Usuario.builder().id(odontogramaRequest.getIdusuariomodificacion()).build() : null)
            .fechamodificacion(odontogramaRequest.getFechamodificacion())
            .habilitado(odontogramaRequest.getHabilitado())
            .build();
    }


    public static OdontogramaResponse toResponse(Odontograma odontograma) {
        return OdontogramaResponse.builder()
            .id(odontograma.getId())
            .idhistoriaclinica(odontograma.getIdhistoriaclinica().getId())
            .fecha(odontograma.getFecha())
            .idusuariocreacion(odontograma.getIdusuariocreacion().getId())
            .fechacreacion(odontograma.getFechacreacion())
            .idusuariomodificacion(Objects.nonNull(odontograma.getIdusuariomodificacion()) ? odontograma.getIdusuariomodificacion().getId() : null)
            .fechamodificacion(odontograma.getFechamodificacion())
            .habilitado(odontograma.getHabilitado())
            .detalleodontogramas(odontograma.getDetalleodontogramas().stream()
                .map(DetalleOdontogramaMapper::toResponse)
                .collect(Collectors.toList()))
            .build();
    }
}
