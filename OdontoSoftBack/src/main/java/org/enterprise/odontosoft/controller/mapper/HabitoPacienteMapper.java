package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.Habito;
import org.enterprise.odontosoft.model.Entity.HabitoPaciente;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.HabitoPacienteRequest;
import org.enterprise.odontosoft.view.dto.response.HabitoPacienteResponse;

import java.util.Objects;

@UtilityClass
public class HabitoPacienteMapper {

    public static HabitoPaciente toEntity(HabitoPacienteRequest habitoPacienteRequest) {
        return HabitoPaciente.builder()
                .id(habitoPacienteRequest.getId())
                 .idhistoriaclinica(HistoriaClinica.builder().id(habitoPacienteRequest.getIdhistoriaclinica()).build())
                .idhabito(Habito.builder().id(habitoPacienteRequest.getIdhabito()).build())
                .opciones(habitoPacienteRequest.getOpciones())
                .idusuariocreacion(Usuario.builder().id(habitoPacienteRequest.getIdusuariocreacion()).build())
                .fechacreacion(habitoPacienteRequest.getFechacreacion())
                .idusuariomodificacion(Usuario.builder().id(habitoPacienteRequest.getIdusuariomodificacion()).build())
                .fechamodificacion(habitoPacienteRequest.getFechamodificacion())
                .habilitado(habitoPacienteRequest.getHabilitado())
                .build();
    }

    public static HabitoPacienteResponse toResponse(HabitoPaciente habitoPaciente) {
        return HabitoPacienteResponse.builder()
                .id(habitoPaciente.getId())
                .idhistoriaclinica(habitoPaciente.getIdhistoriaclinica().getId())
                .idhabito(habitoPaciente.getIdhabito().getId())
                .opciones(habitoPaciente.getOpciones())
                .idusuariocreacion(habitoPaciente.getIdusuariocreacion().getId())
                .fechacreacion(habitoPaciente.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(habitoPaciente.getIdusuariomodificacion()) ? habitoPaciente.getIdusuariomodificacion().getId() : null)
                .fechamodificacion(habitoPaciente.getFechamodificacion())
                .habilitado(habitoPaciente.getHabilitado())
                .build();
    }
}
