package org.enterprise.odontosoft.controller.mapper;

import io.micrometer.common.util.StringUtils;
import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.entity.*;
import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;

import java.util.Objects;

@UtilityClass
public class MedicalHistoryMapper {
    public static HistoriaClinica toEntity(HistoriaClinicaRequest historiaClinicaRequest) {
        return HistoriaClinica.builder()
                .id(historiaClinicaRequest.getIdHistoriaClinica())
                .idpaciente(Paciente.builder()
                        .id(historiaClinicaRequest.getIdPaciente())
                        .build())
                .motivoconsulta(historiaClinicaRequest.getMotivoConsulta())
                .enfermedadactual(historiaClinicaRequest.getEnfermedadActual())
                .ultimomedicotratante(historiaClinicaRequest.getUltimomedicotratante())
                .atmmusculatura(historiaClinicaRequest.getAtmmusculatura())
                .observacionantec(historiaClinicaRequest.getObservacionAntec())
                .observacionantecodon(historiaClinicaRequest.getObservacionantecodon())
                .observacion(historiaClinicaRequest.getObservacion())
                .observacionanafunc(historiaClinicaRequest.getObservacionanafunc())
                .idusuariocreacion(Usuario.builder()
                        .codigo(historiaClinicaRequest.getIdusuariocreacion())
                        .build())
                .fechacreacion(historiaClinicaRequest.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(historiaClinicaRequest.getIdusuariomodificacion()) ? Usuario.builder()
                        .codigo(historiaClinicaRequest.getIdusuariomodificacion())
                        .build() : null)
                .fechamodificacion(historiaClinicaRequest.getFechamodificacion())
                .habilitado(historiaClinicaRequest.getHabilitado())
                .build();
    }

    public static HistoriaClinicaResponse toDto(HistoriaClinica historiaClinica) {
        return HistoriaClinicaResponse.builder()
                .id(historiaClinica.getId())
                .idpaciente(Objects.nonNull(historiaClinica.getIdpaciente())
                        ? historiaClinica.getIdpaciente().getId()
                        : null)
                .motivoconsulta(historiaClinica.getMotivoconsulta())
                .enfermedadactual(historiaClinica.getEnfermedadactual())
                .ultimomedicotratante(historiaClinica.getUltimomedicotratante())
                .observacionantec(historiaClinica.getObservacionantec())
                .observacionantecodon(historiaClinica.getObservacionantecodon())
                .observacion(StringUtils.isBlank(historiaClinica.getObservacion())
                        ? getObservaciones()
                        : historiaClinica.getObservacion())
                .observacionanafunc(historiaClinica.getObservacionanafunc())
                .observacionexaestomat(historiaClinica.getObservacionexaestomat())
                .observacionodontograma(historiaClinica.getObservacionodontograma())
                .observacionexaperiodontal(historiaClinica.getObservacionexaperiodontal())
                .observacionanalisisoclu(historiaClinica.getObservacionanalisisoclu())
                .observacionayudadiag(historiaClinica.getObservacionayudadiag())
                .idusuariocreacion(historiaClinica.getIdusuariocreacion().getCodigo())
                .atmmusculatura(historiaClinica.getAtmmusculatura())
                .fechacreacion(historiaClinica.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(historiaClinica.getIdusuariomodificacion())
                        ? historiaClinica.getIdusuariomodificacion().getCodigo()
                        : null)
                .fechamodificacion(historiaClinica.getFechamodificacion())
                .habilitado(historiaClinica.getHabilitado())
                .antecedentepacientes(historiaClinica.getAntecedentepacientes().stream()
                    .map(AntecedentePacienteMapper::toResponse).toList())
                .habitopacientes(
                    historiaClinica.getHabitopacientes().stream().map(HabitoPacienteMapper::toResponse).toList())
                .signovitals(historiaClinica.getSignovitals().stream().map(SignoVitalMapper::toResponse).toList())
                .analisisfuncionals(historiaClinica.getAnalisisfuncionals().stream()
                    .map(AnalisisFuncionalMapper::toResponse).toList())
                .examenestomatologicos(historiaClinica.getExamenestomatologicos().stream()
                    .map(ExamenEstomatologicoMapper::toResponse).toList())
                .diagnosticos(historiaClinica.getDiagnosticos().stream().map(DiagnosticoMapper::toResponse).toList())
                .ayudadiagnosticas(historiaClinica.getAyudadiagnosticas().stream()
                        .map(AyudaDiagnosticaMapper::toResponse).toList())
                .build();
    }

    public static String getObservaciones() {
        StringBuilder observaciones = new StringBuilder();
        observaciones.append("Observaciones: \n");
        observaciones.append("\n");
        observaciones.append("\n");
        observaciones.append("Antecedentes médicos y odontológicos familiares: \n");
        observaciones.append("\n");
        observaciones.append("\n");
        observaciones.append("Estado socioeconómico actual\n");
        observaciones.append("\n");
        observaciones.append("\n");
        observaciones.append("Examen físico general: \n");
        observaciones.append("\n");
        observaciones.append("\n");
        observaciones.append("Aspecto fisico del paciente: \n");
        observaciones.append("\n");
        observaciones.append("\n");
        observaciones.append("Señales particulares: \n");
        return  observaciones.toString();
    }

    public static HistoriaClinicaResponse toDtoLigth(HistoriaClinica historiaClinica) {
        return HistoriaClinicaResponse.builder()
            .id(historiaClinica.getId())
            .idpaciente(Objects.nonNull(historiaClinica.getIdpaciente())
                ? historiaClinica.getIdpaciente().getId()
                : null)
            .motivoconsulta(historiaClinica.getMotivoconsulta())
            .enfermedadactual(historiaClinica.getEnfermedadactual())
            .ultimomedicotratante(historiaClinica.getUltimomedicotratante())
            .observacionantec(historiaClinica.getObservacionantec())
            .observacionantecodon(historiaClinica.getObservacionantecodon())
            .observacion(historiaClinica.getObservacion())
            .observacionanafunc(historiaClinica.getObservacionanafunc())
            .observacionexaestomat(historiaClinica.getObservacionexaestomat())
            .observacionodontograma(historiaClinica.getObservacionodontograma())
            .observacionexaperiodontal(historiaClinica.getObservacionexaperiodontal())
            .observacionanalisisoclu(historiaClinica.getObservacionanalisisoclu())
            .observacionayudadiag(historiaClinica.getObservacionayudadiag())
            .idusuariocreacion(historiaClinica.getIdusuariocreacion().getNombre())
            .atmmusculatura(historiaClinica.getAtmmusculatura())
            .fechacreacion(historiaClinica.getFechacreacion())
            .idusuariomodificacion(Objects.nonNull(historiaClinica.getIdusuariomodificacion())
                ? historiaClinica.getIdusuariomodificacion().getCodigo()
                : null)
            .build();
    }
}