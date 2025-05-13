package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.AyudaDiagnostica;
import org.enterprise.odontosoft.model.entity.HistoriaClinica;
import org.enterprise.odontosoft.model.entity.TipoAyudaDiag;
import org.enterprise.odontosoft.model.entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.AyudaDiagnosticaRequest;
import org.enterprise.odontosoft.view.dto.response.AyudaDiagnosticaResponse;

import java.util.Objects;

@UtilityClass
public class AyudaDiagnosticaMapper {

    public static AyudaDiagnostica toEntity(AyudaDiagnosticaRequest ayudaDiagnosticaRequest) {
        return AyudaDiagnostica.builder()
            .id(ayudaDiagnosticaRequest.getId())
            .idhistoriaclinica(HistoriaClinica.builder().id(ayudaDiagnosticaRequest.getIdhistoriaclinica()).build())
            .idtipoayudadiag(TipoAyudaDiag.builder().id(ayudaDiagnosticaRequest.getIdtipoayudadiag()).build())
            .idusuariocreacion(Usuario.builder().codigo(ayudaDiagnosticaRequest.getIdusuariocreacion()).build())
            .fechacreacion(ayudaDiagnosticaRequest.getFechacreacion())
            .idusuariomodificacion(Objects.nonNull(ayudaDiagnosticaRequest.getIdusuariomodificacion()) ? Usuario.builder().codigo(ayudaDiagnosticaRequest.getIdusuariomodificacion()).build() : null)
            .idayudadiagnosticaarchivo(Objects.isNull(ayudaDiagnosticaRequest.getIdayudadiagnosticaarchivo()) ? null : AyudaDiagnosticaArchivoMapper.toEntity(ayudaDiagnosticaRequest.getIdayudadiagnosticaarchivo()))
            .fechamodificacion(ayudaDiagnosticaRequest.getFechamodificacion())
            .build();
    }

    public static AyudaDiagnosticaResponse toResponse(AyudaDiagnostica ayudaDiagnostica) {
        return AyudaDiagnosticaResponse.builder()
            .id(ayudaDiagnostica.getId())
            .idhistoriaclinica(ayudaDiagnostica.getIdhistoriaclinica().getId())
            .idtipoayudadiag(ayudaDiagnostica.getIdtipoayudadiag().getId())
            .codtipoayudadiag(ayudaDiagnostica.getIdtipoayudadiag().getCodigo())
            .descripciontipoayudadiag(ayudaDiagnostica.getIdtipoayudadiag().getDescripcion())
            .idusuariocreacion(ayudaDiagnostica.getIdusuariocreacion().getCodigo())
            .fechacreacion(ayudaDiagnostica.getFechacreacion())
            .idusuariomodificacion(Objects.nonNull(ayudaDiagnostica.getIdusuariomodificacion()) ? ayudaDiagnostica.getIdusuariomodificacion().getCodigo() : null)
            .fechamodificacion(ayudaDiagnostica.getFechamodificacion())
            .idayudadiagnosticaarchivo(Objects.nonNull(ayudaDiagnostica.getIdayudadiagnosticaarchivo()) ? AyudaDiagnosticaArchivoMapper.toDto(ayudaDiagnostica.getIdayudadiagnosticaarchivo()) : null)
            .build();
    }
}
