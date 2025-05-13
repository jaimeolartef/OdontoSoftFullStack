package org.enterprise.odontosoft.controller.mapper;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.Habito;
import org.enterprise.odontosoft.model.entity.HabitoPaciente;
import org.enterprise.odontosoft.model.entity.HistoriaClinica;
import org.enterprise.odontosoft.model.entity.Usuario;
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
                .idusuariocreacion(Usuario.builder().codigo(habitoPacienteRequest.getIdusuariocreacion()).build())
                .fechacreacion(habitoPacienteRequest.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(habitoPacienteRequest.getIdusuariomodificacion()) ? Usuario.builder().codigo(habitoPacienteRequest.getIdusuariomodificacion()).build() : null)
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
                .idusuariocreacion(habitoPaciente.getIdusuariocreacion().getCodigo())
                .fechacreacion(habitoPaciente.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(habitoPaciente.getIdusuariomodificacion()) ? habitoPaciente.getIdusuariomodificacion().getCodigo() : null)
                .fechamodificacion(habitoPaciente.getFechamodificacion())
                .habilitado(habitoPaciente.getHabilitado())
                .build();
    }
}
