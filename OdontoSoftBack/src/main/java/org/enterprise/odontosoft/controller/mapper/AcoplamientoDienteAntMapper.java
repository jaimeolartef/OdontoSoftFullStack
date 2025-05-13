package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.AcoplamientoDienteAnt;
import org.enterprise.odontosoft.model.entity.HistoriaClinica;
import org.enterprise.odontosoft.model.entity.TipoAcoplamientoDienteAnt;
import org.enterprise.odontosoft.model.entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.AcoplamientoDienteAntRequest;
import org.enterprise.odontosoft.view.dto.response.AcoplamientoDienteAntResponse;

import java.util.Objects;

@UtilityClass
public class AcoplamientoDienteAntMapper {

    public static AcoplamientoDienteAnt toEntity(AcoplamientoDienteAntRequest acoplamientoDienteAntRequest) {
        return AcoplamientoDienteAnt.builder()
                .id(acoplamientoDienteAntRequest.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(acoplamientoDienteAntRequest.getIdhistoriaclinica()).build())
                .idtipoacoplamiento(TipoAcoplamientoDienteAnt.builder().id(acoplamientoDienteAntRequest.getIdtipoacoplamiento()).build())
                .fechaexamen(acoplamientoDienteAntRequest.getFechaexamen())
                .seleccion(acoplamientoDienteAntRequest.getSeleccion())
                .idusuariocreacion(Usuario.builder().id(acoplamientoDienteAntRequest.getIdusuariocreacion()).build())
                .fechacreacion(acoplamientoDienteAntRequest.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(acoplamientoDienteAntRequest.getIdusuariomodificacion()) ? Usuario.builder().id(acoplamientoDienteAntRequest.getIdusuariomodificacion()).build() : null)
                .fechamodificacion(acoplamientoDienteAntRequest.getFechamodificacion())
                .habilitado(acoplamientoDienteAntRequest.getHabilitado())
                .build();
    }

    public static AcoplamientoDienteAntResponse toResponse(AcoplamientoDienteAnt acoplamientoDienteAnt) {
        return AcoplamientoDienteAntResponse.builder()
                .id(acoplamientoDienteAnt.getId())
                .idhistoriaclinica(acoplamientoDienteAnt.getIdhistoriaclinica().getId())
                .idtipoacoplamiento(acoplamientoDienteAnt.getIdtipoacoplamiento().getId())
                .fechaexamen(acoplamientoDienteAnt.getFechaexamen())
                .seleccion(acoplamientoDienteAnt.getSeleccion())
                .idusuariocreacion(Objects.nonNull(acoplamientoDienteAnt.getIdusuariocreacion()) ? acoplamientoDienteAnt.getIdusuariocreacion().getId() : null)
                .fechacreacion(acoplamientoDienteAnt.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(acoplamientoDienteAnt.getIdusuariomodificacion()) ? acoplamientoDienteAnt.getIdusuariomodificacion().getId() : null)
                .fechamodificacion(acoplamientoDienteAnt.getFechamodificacion())
                .habilitado(acoplamientoDienteAnt.getHabilitado())
                .build();
    }
}
