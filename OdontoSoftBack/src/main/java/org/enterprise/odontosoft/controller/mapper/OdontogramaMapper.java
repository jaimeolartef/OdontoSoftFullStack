package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.Odontograma;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.OdontogramaRequest;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;

import java.util.stream.Collectors;

@UtilityClass
public class OdontogramaMapper {

    public static Odontograma toEntity(OdontogramaRequest odontogramaRequest) {
        return Odontograma.builder()
            .id(odontogramaRequest.getId())
            .idhistoriaclinica(HistoriaClinica.builder().id(odontogramaRequest.getIdhistoriaclinica()).build())
            .fecha(odontogramaRequest.getFecha())
            .idusuariocreacion(Usuario.builder().id(odontogramaRequest.getIdusuariocreacion()).build())
            .fechacreacion(odontogramaRequest.getFechacreacion())
            .idusuariomodificacion(Usuario.builder().id(odontogramaRequest.getIdusuariomodificacion()).build())
            .fechamodificacion(odontogramaRequest.getFechamodificacion())
            .habilitado(odontogramaRequest.getHabilitado())
            .detalleodontogramas(odontogramaRequest.getDetalleodontogramas().stream()
                .map(DetalleOdontogramaMapper::toEntity)
                .collect(Collectors.toSet())).build();
    }


    public static OdontogramaResponse toResponse(Odontograma odontograma) {
        return OdontogramaResponse.builder()
            .id(odontograma.getId())
            .idhistoriaclinica(odontograma.getIdhistoriaclinica().getId())
            .fecha(odontograma.getFecha())
            .idusuariocreacion(odontograma.getIdusuariocreacion().getId())
            .fechacreacion(odontograma.getFechacreacion())
            .idusuariomodificacion(odontograma.getIdusuariomodificacion().getId())
            .fechamodificacion(odontograma.getFechamodificacion())
            .habilitado(odontograma.getHabilitado())
            .detalleodontogramas(odontograma.getDetalleodontogramas().stream()
                .map(DetalleOdontogramaMapper::toResponse)
                .collect(Collectors.toList()))
            .build();
    }
}
