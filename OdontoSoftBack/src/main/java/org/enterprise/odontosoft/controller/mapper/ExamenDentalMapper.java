package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.ExamenDental;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.ExamenDentalRequest;
import org.enterprise.odontosoft.view.dto.response.ExamenDentalResponse;

import java.util.Objects;

@UtilityClass
public class ExamenDentalMapper {

    public static ExamenDental toEntity(ExamenDentalRequest examenDentalRequest) {
        return ExamenDental.builder()
                .id(examenDentalRequest.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(examenDentalRequest.getIdhistoriaclinica()).build())
                .fechaexamen(examenDentalRequest.getFechaexamen())
                .denticion(examenDentalRequest.getDenticion())
                .formarcosuperior(examenDentalRequest.getFormarcosuperior())
                .formarcoinferior(examenDentalRequest.getFormarcoinferior())
                .simetriarcosuperior(examenDentalRequest.getSimetriarcosuperior())
                .simetriarcoinferior(examenDentalRequest.getSimetriarcoinferior())
                .riesgocaries(examenDentalRequest.getRiesgocaries())
                .idusuariocreacion(Usuario.builder().id(examenDentalRequest.getIdusuariocreacion()).build())
                .fechacreacion(examenDentalRequest.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(examenDentalRequest.getIdusuariomodificacion()) ? Usuario.builder().id(examenDentalRequest.getIdusuariomodificacion()).build() :  null)
                .fechamodificacion(examenDentalRequest.getFechamodificacion())
                .habilitado(examenDentalRequest.getHabilitado())
                .build();
    }

    public static ExamenDentalResponse toResponse(ExamenDental examenDental) {
        return ExamenDentalResponse.builder()
                .id(examenDental.getId())
                .idhistoriaclinica(examenDental.getIdhistoriaclinica().getId())
                .fechaexamen(examenDental.getFechaexamen())
                .denticion(examenDental.getDenticion())
                .formarcosuperior(examenDental.getFormarcosuperior())
                .formarcoinferior(examenDental.getFormarcoinferior())
                .simetriarcosuperior(examenDental.getSimetriarcosuperior())
                .simetriarcoinferior(examenDental.getSimetriarcoinferior())
                .riesgocaries(examenDental.getRiesgocaries())
                .idusuariocreacion(examenDental.getIdusuariocreacion().getId())
                .fechacreacion(examenDental.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(examenDental.getIdusuariomodificacion()) ? examenDental.getIdusuariomodificacion().getId() : null)
                .fechamodificacion(examenDental.getFechamodificacion())
                .habilitado(examenDental.getHabilitado())
                .build();
    }
}
