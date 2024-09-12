package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.AnalisisOclusion;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.view.dto.request.AnalisisOclusionRequest;
import org.enterprise.odontosoft.view.dto.response.AnalisisOclusionResponse;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;

import java.util.Objects;

@UtilityClass
public class AnalisisOclusionMapper {

    public static AnalisisOclusion toEntity(AnalisisOclusionRequest analisisOclusionRequest) {
        return AnalisisOclusion.builder()
            .id(analisisOclusionRequest.getId())
            .idhistoriaclinica(HistoriaClinica.builder()
                .id(analisisOclusionRequest.getIdhistoriaclinica().getId())
                .build())
            .fechaexamen(analisisOclusionRequest.getFechaexamen())
            .relacionmolarderecha(analisisOclusionRequest.getRelacionmolarderecha())
            .relacionmolarizquierda(analisisOclusionRequest.getRelacionmolarizquierda())
            .relacioncaninaderecha(analisisOclusionRequest.getRelacioncaninaderecha())
            .relacioncaninaizquierda(analisisOclusionRequest.getRelacioncaninaizquierda())
            .sobremordidahorizontal(analisisOclusionRequest.getSobremordidahorizontal())
            .dientesausentes(analisisOclusionRequest.getDientesausentes())
            .contactoinicialrc(analisisOclusionRequest.getContactoinicialrc())
            .sobremordidavertical(analisisOclusionRequest.getSobremordidavertical())
            .soportepostadecu(analisisOclusionRequest.getSoportepostadecu())
            .deflexionmandibular(analisisOclusionRequest.getDeflexionmandibular())
            .idusuariocreacion(analisisOclusionRequest.getIdusuariocreacion())
            .fechacreacion(analisisOclusionRequest.getFechacreacion())
            .idusuariomodificacion(analisisOclusionRequest.getIdusuariomodificacion())
            .fechamodificacion(analisisOclusionRequest.getFechamodificacion())
            .habilitado(analisisOclusionRequest.getHabilitado())
            .build();
    }

    public static AnalisisOclusionResponse toResponse(AnalisisOclusion analisisOclusion) {
        return AnalisisOclusionResponse.builder()
            .id(analisisOclusion.getId())
            .idhistoriaclinica(analisisOclusion.getIdhistoriaclinica().getId())
            .fechaexamen(analisisOclusion.getFechaexamen())
            .relacionmolarderecha(analisisOclusion.getRelacionmolarderecha())
            .relacionmolarizquierda(analisisOclusion.getRelacionmolarizquierda())
            .relacioncaninaderecha(analisisOclusion.getRelacioncaninaderecha())
            .relacioncaninaizquierda(analisisOclusion.getRelacioncaninaizquierda())
            .sobremordidahorizontal(analisisOclusion.getSobremordidahorizontal())
            .dientesausentes(analisisOclusion.getDientesausentes())
            .contactoinicialrc(analisisOclusion.getContactoinicialrc())
            .sobremordidavertical(analisisOclusion.getSobremordidavertical())
            .soportepostadecu(analisisOclusion.getSoportepostadecu())
            .deflexionmandibular(analisisOclusion.getDeflexionmandibular())
            .idusuariocreacion(Objects.nonNull(analisisOclusion.getIdusuariocreacion()) ? analisisOclusion.getIdusuariocreacion().getNombre() : null)
            .fechacreacion(analisisOclusion.getFechacreacion())
            .idusuariomodificacion(Objects.nonNull(analisisOclusion.getIdusuariomodificacion()) ? analisisOclusion.getIdusuariomodificacion().getNombre() : null)
            .fechamodificacion(analisisOclusion.getFechamodificacion())
            .habilitado(analisisOclusion.getHabilitado())
            .build();
    }

}
