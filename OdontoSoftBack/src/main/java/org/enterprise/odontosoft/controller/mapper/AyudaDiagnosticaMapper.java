package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.AyudaDiagnostica;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.TipoAyudaDiag;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.AyudaDiagnosticaRequest;
import org.enterprise.odontosoft.view.dto.response.AyudaDiagnosticaResponse;

@UtilityClass
public class AyudaDiagnosticaMapper {

    public static AyudaDiagnostica toEntity(AyudaDiagnosticaRequest ayudaDiagnosticaRequest) {
        return AyudaDiagnostica.builder()
                .id(ayudaDiagnosticaRequest.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(ayudaDiagnosticaRequest.getIdhistoriaclinica()).build())
                 .idtipoayudadiag(TipoAyudaDiag.builder().id(ayudaDiagnosticaRequest.getIdtipoayudadiag()).build())
                .idusuariocreacion(Usuario.builder().id(ayudaDiagnosticaRequest.getIdusuariocreacion()).build())
                .fechacreacion(ayudaDiagnosticaRequest.getFechacreacion())
                .idusuariomodificacion(Usuario.builder().id(ayudaDiagnosticaRequest.getIdusuariomodificacion()).build())
                .fechamodificacion(ayudaDiagnosticaRequest.getFechamodificacion())
                .build();
    }

    public static AyudaDiagnosticaResponse toResponse(AyudaDiagnostica ayudaDiagnostica) {
        return AyudaDiagnosticaResponse.builder()
                .id(ayudaDiagnostica.getId())
                .idhistoriaclinica(ayudaDiagnostica.getIdhistoriaclinica().getId())
                .idtipoayudadiag(ayudaDiagnostica.getIdtipoayudadiag().getId())
                .idusuariocreacion(ayudaDiagnostica.getIdusuariocreacion().getId())
                .fechacreacion(ayudaDiagnostica.getFechacreacion())
                .idusuariomodificacion(ayudaDiagnostica.getIdusuariomodificacion().getId())
                .fechamodificacion(ayudaDiagnostica.getFechamodificacion())
                .build();
    }
}
