package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.apache.logging.log4j.util.Strings;
import org.enterprise.odontosoft.model.Entity.Antecedente;
import org.enterprise.odontosoft.model.Entity.AntecedentePaciente;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.AntecedentePacienteRequest;
import org.enterprise.odontosoft.view.dto.response.AntecedentePacienteResponse;

import java.util.Objects;

@UtilityClass
public class AntecedentePacienteMapper {

    public static AntecedentePaciente toEntity(AntecedentePacienteRequest antecedentePaciente) {
        return AntecedentePaciente.builder()
                .id(antecedentePaciente.getId())
                .idhistoriaclinica(HistoriaClinica.builder().id(antecedentePaciente.getIdhistoriaclinica()).build())
                .idantecedente(Antecedente.builder().id(antecedentePaciente.getIdantecedente()).build())
                .opciones(antecedentePaciente.getOpciones())
                .idusuariocreacion(Usuario.builder().codigo(antecedentePaciente.getIdusuariocreacion()).build())
                .fechacreacion(antecedentePaciente.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(antecedentePaciente.getIdusuariomodificacion()) & Strings.isNotEmpty(antecedentePaciente.getIdusuariomodificacion()) ? Usuario.builder().codigo(antecedentePaciente.getIdusuariomodificacion()).build() : null)
                .fechamodificacion(Objects.nonNull(antecedentePaciente.getIdusuariomodificacion()) & Strings.isNotEmpty(antecedentePaciente.getIdusuariomodificacion()) ? antecedentePaciente.getFechamodificacion() : null)
                .habilitado(antecedentePaciente.getHabilitado())
                .build();
    }

    public static AntecedentePacienteResponse toResponse(AntecedentePaciente antecedentePaciente) {
        return AntecedentePacienteResponse.builder()
                .id(antecedentePaciente.getId())
                .idhistoriaclinica(antecedentePaciente.getIdhistoriaclinica().getId())
                .idantecedente(antecedentePaciente.getIdantecedente().getId())
                .opciones(antecedentePaciente.getOpciones())
                .idusuariocreacion(Objects.nonNull(antecedentePaciente.getIdusuariocreacion()) ? antecedentePaciente.getIdusuariocreacion().getCodigo() : null)
                .fechacreacion(antecedentePaciente.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(antecedentePaciente.getIdusuariomodificacion()) ? antecedentePaciente.getIdusuariomodificacion().getCodigo() : null)
                .fechamodificacion(antecedentePaciente.getFechamodificacion())
                .habilitado(antecedentePaciente.getHabilitado())
                .build();
    }
}
