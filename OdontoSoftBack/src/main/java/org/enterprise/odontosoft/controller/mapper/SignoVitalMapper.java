package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.HistoriaClinica;
import org.enterprise.odontosoft.model.entity.SignoVital;
import org.enterprise.odontosoft.model.entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.SignoVitalRequest;
import org.enterprise.odontosoft.view.dto.response.SignoVitalResponse;

import java.util.Objects;

@UtilityClass
public class SignoVitalMapper {

    public static SignoVital toEntity(SignoVitalRequest signoVital) {
        return SignoVital.builder()
                .id(signoVital.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(signoVital.getIdhistoriaclinica()).build())
                .peso(signoVital.getPeso())
                .talla(signoVital.getTalla())
                .temperatura(signoVital.getTemperatura())
                .pulso(signoVital.getPulso())
                .presionarterial(signoVital.getPresionarterial())
                .frecuenciarespiratoria(signoVital.getFrecuenciarespiratoria())
                .idusuariocreacion(Usuario.builder().codigo(signoVital.getIdusuariocreacion()).build())
                .fechacreacion(signoVital.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(signoVital.getIdusuariomodificacion()) ? Usuario.builder().codigo(signoVital.getIdusuariomodificacion()).build() : null)
                .fechamodificacion(signoVital.getFechamodificacion())
                .habilitado(signoVital.getHabilitado())
                .build();
    }

    public static SignoVitalResponse toResponse(SignoVital signoVital) {
        return SignoVitalResponse.builder()
                .id(signoVital.getId())
                .idhistoriaclinica(signoVital.getIdhistoriaclinica().getId())
                .peso(signoVital.getPeso())
                .talla(signoVital.getTalla())
                .temperatura(signoVital.getTemperatura())
                .pulso(signoVital.getPulso())
                .presionarterial(signoVital.getPresionarterial())
                .frecuenciarespiratoria(signoVital.getFrecuenciarespiratoria())
                .idusuariocreacion(signoVital.getIdusuariocreacion().getCodigo())
                .fechacreacion(signoVital.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(signoVital.getIdusuariomodificacion()) ? signoVital.getIdusuariomodificacion().getCodigo() : null)
                .fechamodificacion(signoVital.getFechamodificacion())
                .habilitado(signoVital.getHabilitado())
                .build();
    }
}
