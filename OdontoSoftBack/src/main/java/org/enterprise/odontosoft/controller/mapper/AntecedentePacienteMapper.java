package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.Antecedente;
import org.enterprise.odontosoft.model.Entity.AntecedentePaciente;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.AntecedentePacienteRequest;
import org.enterprise.odontosoft.view.dto.response.AntecedentePacienteResponse;

@UtilityClass
public class AntecedentePacienteMapper {

    public static AntecedentePaciente toEntity(AntecedentePacienteRequest antecedentePaciente) {
        return AntecedentePaciente.builder()
                .id(antecedentePaciente.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(antecedentePaciente.getIdhistoriaclinica()).build())
                .idantecedente(Antecedente.builder().id(antecedentePaciente.getIdantecedente()).build())
                .opciones(antecedentePaciente.getOpciones())
                .idusuariocreacion(Usuario.builder().id(antecedentePaciente.getIdusuariocreacion()).build())
                .fechacreacion(antecedentePaciente.getFechacreacion())
                .idusuariomodificacion(Usuario.builder().id(antecedentePaciente.getIdusuariomodificacion()).build())
                .fechamodificacion(antecedentePaciente.getFechamodificacion())
                .habilitado(antecedentePaciente.getHabilitado())
                .build();
    }

    public static AntecedentePacienteResponse toResponse(AntecedentePaciente antecedentePaciente) {
        return AntecedentePacienteResponse.builder()
                .id(antecedentePaciente.getId())
                .idhistoriaclinica(antecedentePaciente.getIdhistoriaclinica().getId())
                .idantecedente(antecedentePaciente.getIdantecedente().getId())
                .opciones(antecedentePaciente.getOpciones())
                .idusuariocreacion(antecedentePaciente.getIdusuariocreacion().getId())
                .fechacreacion(antecedentePaciente.getFechacreacion())
                .idusuariomodificacion(antecedentePaciente.getIdusuariomodificacion().getId())
                .fechamodificacion(antecedentePaciente.getFechamodificacion())
                .habilitado(antecedentePaciente.getHabilitado())
                .build();
    }
}
