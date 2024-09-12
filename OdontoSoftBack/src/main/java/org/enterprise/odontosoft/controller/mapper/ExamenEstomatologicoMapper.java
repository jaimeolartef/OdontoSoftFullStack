package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.ExamenEstomatologico;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.ExamenEstomatologicoRequest;
import org.enterprise.odontosoft.view.dto.response.ExamenEstomatologicoResponse;

import java.util.Objects;

@UtilityClass
public class ExamenEstomatologicoMapper {

    public static ExamenEstomatologico toEntity(ExamenEstomatologicoRequest request) {
        return ExamenEstomatologico.builder()
                .id(request.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(request.getIdhistoriaclinica()).build())
                .labiosuperior(request.getLabiosuperior())
                .labioinferior(request.getLabioinferior())
                .comisura(request.getComisura())
                .menton(request.getMenton())
                .frenillos(request.getFrenillos())
                .surcosvestibulares(request.getSurcosvestibulares())
                .carrilos(request.getCarrilos())
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
                .glandulassalivaresmenor(request.getGlandulassalivaresmenor())
                .maxilarsuperior(request.getMaxilarsuperior())
                .maxilarinferior(request.getMaxilarinferior())
                .idusuariocreacion(Usuario.builder().id(request.getIdusuariocreacion()).build())
                .fechacreacion(request.getFechacreacion())
                .idusuariomodificacion(Usuario.builder().id(request.getIdusuariomodificacion()).build())
                .fechamodificacion(request.getFechamodificacion())
                .habilitado(request.getHabilitado())
                .build();
    }

    public static ExamenEstomatologicoResponse toResponse(ExamenEstomatologico examenEstomatologico) {
        return ExamenEstomatologicoResponse.builder()
            .id(examenEstomatologico.getId())
            .idhistoriaclinica(examenEstomatologico.getIdhistoriaclinica().getId())
            .labiosuperior(examenEstomatologico.getLabiosuperior())
            .labioinferior(examenEstomatologico.getLabioinferior())
            .comisura(examenEstomatologico.getComisura())
            .menton(examenEstomatologico.getMenton())
            .frenillos(examenEstomatologico.getFrenillos())
            .surcosvestibulares(examenEstomatologico.getSurcosvestibulares())
            .carrilos(examenEstomatologico.getCarrilos())
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
            .glandulassalivaresmenor(examenEstomatologico.getGlandulassalivaresmenor())
            .maxilarsuperior(examenEstomatologico.getMaxilarsuperior())
            .maxilarinferior(examenEstomatologico.getMaxilarinferior())
            .idusuariocreacion(examenEstomatologico.getIdusuariocreacion().getId())
            .fechacreacion(examenEstomatologico.getFechacreacion())
            .idusuariomodificacion(Objects.nonNull(examenEstomatologico.getIdusuariomodificacion()) ? examenEstomatologico.getIdusuariomodificacion().getId() : null)
            .fechamodificacion(examenEstomatologico.getFechamodificacion())
            .habilitado(examenEstomatologico.getHabilitado())
            .build();
    }
}
