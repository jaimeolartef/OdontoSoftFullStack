package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.HistoriaClinica;
import org.enterprise.odontosoft.model.entity.PlanTratamiento;
import org.enterprise.odontosoft.model.entity.TipoTratamiento;
import org.enterprise.odontosoft.model.entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.PlanTratamientoRequest;
import org.enterprise.odontosoft.view.dto.response.PlanTratamientoResponse;

import java.util.Objects;

@UtilityClass
public class PlanTratamientoMapper {

    public static PlanTratamiento toEntity(PlanTratamientoRequest planTratamientoRequest) {
        return PlanTratamiento.builder()
                .id(planTratamientoRequest.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(planTratamientoRequest.getIdhistoriaclinica()).build())
                .idtipotratam(TipoTratamiento.builder().id(planTratamientoRequest.getIdtipotratam()).build())
                .idusuariocreacion(Usuario.builder().id(planTratamientoRequest.getIdusuariocreacion()).build())
                .fechacreacion(planTratamientoRequest.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(planTratamientoRequest.getIdusuariomodificacion()) ? Usuario.builder().id(planTratamientoRequest.getIdusuariomodificacion()).build() : null)
                .fechamodificacion(planTratamientoRequest.getFechamodificacion())
                .build();
    }

    public static PlanTratamientoResponse toResponse(PlanTratamiento planTratamiento) {
        return PlanTratamientoResponse.builder()
                .id(planTratamiento.getId())
                .idhistoriaclinica(planTratamiento.getIdhistoriaclinica().getId())
                .tipotratamiento(planTratamiento.getIdtipotratam().getCodigoDescripcion())
                .idusuariocreacion(planTratamiento.getIdusuariocreacion().getId())
                .fechacreacion(planTratamiento.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(planTratamiento.getIdusuariomodificacion()) ? planTratamiento.getIdusuariomodificacion().getId() : null)
                .fechamodificacion(planTratamiento.getFechamodificacion())
                .build();
    }
}
