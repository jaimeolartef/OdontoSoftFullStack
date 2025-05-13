package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.ExamenEstomatologico;
import org.enterprise.odontosoft.model.entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.ExamenEstomatologicoRequest;
import org.enterprise.odontosoft.view.dto.response.ExamenEstomatologicoResponse;

import java.util.Objects;

@UtilityClass
public class ExamenEstomatologicoMapper {

    public static ExamenEstomatologico toEntity(ExamenEstomatologicoRequest request) {
        return ExamenEstomatologico.builder()
                .id(request.getId())
                .idhistoriaclinica(request.getIdhistoriaclinica())
                .labiosuperior(request.getLabiosuperior())
                .labioinferior(request.getLabioinferior())
                .comisura(request.getComisura())
                .menton(request.getMenton())
                .frenillos(request.getFrenillos())
                .surcosvestibulares(request.getSurcosvestibulares())
                .carrillos(request.getCarrillos())
                .procesosalveolares(request.getProcesosalveolares())
                .regionfaringea(request.getRegionfaringea())
                .paladarblando(request.getPaladarblando())
                .paladarduro(request.getPaladarduro())
                .pisoboca(request.getPisoboca())
                .dorsolengua(request.getDorsolengua())
                .habilitado(request.getHabilitado())
                .vientrelengua(request.getVientrelengua())
                .glandulasparotidas(request.getGlandulasparotidas())
                .glandulassublinguales(request.getGlandulassublinguales())
                .glandulassubmaxilares(request.getGlandulassubmaxilares())
                .glandulassalivaresmenor(request.getGlandulassalivaresmenores())
                .maxilarsuperior(request.getMaxilarsuperior())
                .maxilarinferior(request.getMaxilarinferior())
                .idusuariocreacion(Usuario.builder().codigo(request.getIdusuariocreacion()).build())
                .fechacreacion(request.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(request.getIdusuariomodificacion()) ? Usuario.builder().codigo(request.getIdusuariomodificacion()).build() : null)
                .fechamodificacion(request.getFechamodificacion())
                .habilitado(request.getHabilitado())
                .build();
    }

    public static ExamenEstomatologicoResponse toResponse(ExamenEstomatologico examenEstomatologico) {
        return ExamenEstomatologicoResponse.builder()
            .id(examenEstomatologico.getId())
            .idhistoriaclinica(examenEstomatologico.getIdhistoriaclinica())
            .labiosuperior(examenEstomatologico.getLabiosuperior())
            .labioinferior(examenEstomatologico.getLabioinferior())
            .comisura(examenEstomatologico.getComisura())
            .menton(examenEstomatologico.getMenton())
            .frenillos(examenEstomatologico.getFrenillos())
            .surcosvestibulares(examenEstomatologico.getSurcosvestibulares())
            .carrillos(examenEstomatologico.getCarrillos())
            .procesosalveolares(examenEstomatologico.getProcesosalveolares())
            .regionfaringea(examenEstomatologico.getRegionfaringea())
            .paladarblando(examenEstomatologico.getPaladarblando())
            .paladarduro(examenEstomatologico.getPaladarduro())
            .pisoboca(examenEstomatologico.getPisoboca())
            .dorsolengua(examenEstomatologico.getDorsolengua())
            .habilitado(examenEstomatologico.getHabilitado())
            .vientrelengua(examenEstomatologico.getVientrelengua())
            .glandulasparotidas(examenEstomatologico.getGlandulasparotidas())
            .glandulassublinguales(examenEstomatologico.getGlandulassublinguales())
            .glandulassubmaxilares(examenEstomatologico.getGlandulassubmaxilares())
            .glandulassalivaresmenores(examenEstomatologico.getGlandulassalivaresmenor())
            .maxilarsuperior(examenEstomatologico.getMaxilarsuperior())
            .maxilarinferior(examenEstomatologico.getMaxilarinferior())
            .idusuariocreacion(examenEstomatologico.getIdusuariocreacion().getCodigo())
            .fechacreacion(examenEstomatologico.getFechacreacion())
            .idusuariomodificacion(Objects.nonNull(examenEstomatologico.getIdusuariomodificacion()) ? examenEstomatologico.getIdusuariomodificacion().getCodigo() : null)
            .fechamodificacion(examenEstomatologico.getFechamodificacion())
            .habilitado(examenEstomatologico.getHabilitado())
            .build();
    }
}
