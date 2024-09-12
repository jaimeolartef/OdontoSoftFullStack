package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.HistoriAcaries;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.TipoCuadrante;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.HistoriAcariesRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriAcariesResponse;

import java.util.Objects;

@UtilityClass
public class HistoriAcariesMapper {

    public static HistoriAcaries toEntity(HistoriAcariesRequest historiAcariesRequest) {
        return HistoriAcaries.builder()
                .id(historiAcariesRequest.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(historiAcariesRequest.getIdhistoriaclinica()).build())
                .fechaexamen(historiAcariesRequest.getFechaexamen())
                .idtipocuadrante(TipoCuadrante.builder().id(historiAcariesRequest.getIdtipocuadrante()).build())
                .sanos(historiAcariesRequest.getSanos())
                .cariados(historiAcariesRequest.getCariados())
                .obturados(historiAcariesRequest.getObturados())
                .perdidos(historiAcariesRequest.getPerdidos())
                .extraccionindicada(historiAcariesRequest.getExtraccionindicada())
                .idusuariocreacion(Usuario.builder().id(historiAcariesRequest.getIdusuariocreacion()).build())
                .fechacreacion(historiAcariesRequest.getFechacreacion())
                .idusuariomodificacion(Usuario.builder().id(historiAcariesRequest.getIdusuariomodificacion()).build())
                .fechamodificacion(historiAcariesRequest.getFechamodificacion())
                .habilitado(historiAcariesRequest.getHabilitado())
                .build();
    }

    public static HistoriAcariesResponse toResponse(HistoriAcaries historiAcaries) {
        return HistoriAcariesResponse.builder()
                .id(historiAcaries.getId())
                .idhistoriaclinica(historiAcaries.getIdhistoriaclinica().getId())
                .fechaexamen(historiAcaries.getFechaexamen())
                .idtipocuadrante(historiAcaries.getIdtipocuadrante().getId())
                .sanos(historiAcaries.getSanos())
                .cariados(historiAcaries.getCariados())
                .obturados(historiAcaries.getObturados())
                .perdidos(historiAcaries.getPerdidos())
                .extraccionindicada(historiAcaries.getExtraccionindicada())
                .idusuariocreacion(historiAcaries.getIdusuariocreacion().getId())
                .fechacreacion(historiAcaries.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(historiAcaries.getIdusuariomodificacion()) ? historiAcaries.getIdusuariomodificacion().getId() : null)
                .fechamodificacion(historiAcaries.getFechamodificacion())
                .habilitado(historiAcaries.getHabilitado())
                .build();
    }
}
