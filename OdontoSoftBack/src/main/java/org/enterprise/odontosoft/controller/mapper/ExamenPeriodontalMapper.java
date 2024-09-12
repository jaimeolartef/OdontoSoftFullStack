package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.ExamenPeriodontal;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.ExamenPeriodontalRequest;
import org.enterprise.odontosoft.view.dto.response.ExamenPeriodontalResponse;

@UtilityClass
public class ExamenPeriodontalMapper {

    public static ExamenPeriodontal toEntity(ExamenPeriodontalRequest examenPeriodontalRequest) {
        return ExamenPeriodontal.builder()
                .id(examenPeriodontalRequest.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(examenPeriodontalRequest.getIdhistoriaclinica()).build())
                .fechaexamen(examenPeriodontalRequest.getFechaexamen())
                .diente(examenPeriodontalRequest.getDiente())
                .movilidad(examenPeriodontalRequest.getMovilidad())
                .bolsavestibular(examenPeriodontalRequest.getBolsavestibular())
                .bolsapalatal(examenPeriodontalRequest.getBolsapalatal())
                .puntohemorragico(examenPeriodontalRequest.getPuntohemorragico())
                .idusuariocreacion(Usuario.builder().id(examenPeriodontalRequest.getIdusuariocreacion()).build())
                .fechacreacion(examenPeriodontalRequest.getFechacreacion())
                .idusuariomodificacion(Usuario.builder().id(examenPeriodontalRequest.getIdusuariomodificacion()).build())
                .fechamodificacion(examenPeriodontalRequest.getFechamodificacion())
                .habilitado(examenPeriodontalRequest.getHabilitado())
                .build();
    }

    public static ExamenPeriodontalResponse toResponse(ExamenPeriodontal examenPeriodontal) {
        return ExamenPeriodontalResponse.builder()
            .id(examenPeriodontal.getId())
            .idhistoriaclinica(examenPeriodontal.getIdhistoriaclinica().getId())
            .fechaexamen(examenPeriodontal.getFechaexamen())
            .diente(examenPeriodontal.getDiente())
            .movilidad(examenPeriodontal.getMovilidad())
            .bolsavestibular(examenPeriodontal.getBolsavestibular())
            .bolsapalatal(examenPeriodontal.getBolsapalatal())
            .puntohemorragico(examenPeriodontal.getPuntohemorragico())
            .idusuariocreacion(examenPeriodontal.getIdusuariocreacion().getId())
            .fechacreacion(examenPeriodontal.getFechacreacion())
            .idusuariomodificacion(examenPeriodontal.getIdusuariomodificacion().getId())
            .fechamodificacion(examenPeriodontal.getFechamodificacion())
            .habilitado(examenPeriodontal.getHabilitado())
            .build();
    }
}
