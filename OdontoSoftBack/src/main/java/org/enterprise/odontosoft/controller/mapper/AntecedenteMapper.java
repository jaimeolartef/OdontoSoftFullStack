package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.Antecedente;
import org.enterprise.odontosoft.view.dto.request.AntecedenteRequest;
import org.enterprise.odontosoft.view.dto.response.AntecedenteResponse;

@UtilityClass
public class AntecedenteMapper {

    public static Antecedente toEntity(AntecedenteRequest antecedenteResponse) {
        return Antecedente.builder()
                .id(antecedenteResponse.getId())
                .descripcion(antecedenteResponse.getDescripcion())
                .odontologico(antecedenteResponse.getOdontologico())
                .habilitado(antecedenteResponse.getHabilitado())
                .build();
    }

    public static AntecedenteResponse toDto(Antecedente antecedente) {
        return AntecedenteResponse.builder()
                .id(antecedente.getId())
                .descripcion(antecedente.getDescripcion())
                .odontologico(antecedente.getOdontologico())
                .habilitado(antecedente.getHabilitado())
                .build();
    }
}
