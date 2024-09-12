package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.Diagnostico;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.TipoDiagnostico;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.DiagnosticoRequest;
import org.enterprise.odontosoft.view.dto.response.DiagnosticoResponse;

@UtilityClass
public class DiagnosticoMapper {

    public static Diagnostico toEntity(DiagnosticoRequest diagnosticoRequest) {
        return Diagnostico.builder()
                .id(diagnosticoRequest.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(diagnosticoRequest.getIdhistoriaclinica()).build())
                .idtipodiagnostico(TipoDiagnostico.builder().id(diagnosticoRequest.getIdtipodiagnostico()).build())
                .definitivo(diagnosticoRequest.getDefinitivo())
                .idusuariocreacion(Usuario.builder().id(diagnosticoRequest.getIdusuariocreacion()).build())
                .fechacreacion(diagnosticoRequest.getFechacreacion())
                .idusuariomodificacion(Usuario.builder().id(diagnosticoRequest.getIdusuariomodificacion()).build())
                .fechamodificacion(diagnosticoRequest.getFechamodificacion())
                .habilitado(diagnosticoRequest.getHabilitado())
                .build();
    }

    public static DiagnosticoResponse toResponse(Diagnostico diagnostico) {
        return DiagnosticoResponse.builder()
                .id(diagnostico.getId())
                .idhistoriaclinica(diagnostico.getIdhistoriaclinica().getId())
                .idtipodiagnostico(diagnostico.getIdtipodiagnostico().getId())
                .definitivo(diagnostico.getDefinitivo())
                .idusuariocreacion(diagnostico.getIdusuariocreacion().getId())
                .fechacreacion(diagnostico.getFechacreacion())
                .idusuariomodificacion(diagnostico.getIdusuariomodificacion().getId())
                .fechamodificacion(diagnostico.getFechamodificacion())
                .habilitado(diagnostico.getHabilitado())
                .build();
    }
}
