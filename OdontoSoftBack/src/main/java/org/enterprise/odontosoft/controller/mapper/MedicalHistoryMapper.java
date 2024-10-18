package org.enterprise.odontosoft.controller.mapper;

import io.micrometer.common.util.StringUtils;
import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.model.Entity.*;
import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;

import java.util.Objects;

@UtilityClass
public class MedicalHistoryMapper {
    public static HistoriaClinica toEntity(HistoriaClinicaRequest historiaClinicaRequest) {
        //se debe homologar el estado del diente con la BD
        // se debe homologar el diente con la BD
        return HistoriaClinica.builder()
                .id(historiaClinicaRequest.getId())
                .idpaciente(Paciente.builder()
                        .id(historiaClinicaRequest.getIdpaciente())
                        .build())
                .motivoconsulta(historiaClinicaRequest.getMotivoconsulta())
                .enfermedadactual(historiaClinicaRequest.getEnfermedadactual())
                .ultimomedicotratante(historiaClinicaRequest.getUltimomedicotratante())
                .observacionantec(historiaClinicaRequest.getObservacionantec())
                .observacionantecodon(historiaClinicaRequest.getObservacionantecodon())
                .observacion(historiaClinicaRequest.getObservacion())
                .observacionanafunc(historiaClinicaRequest.getObservacionanafunc())
                .observacionexaestomat(historiaClinicaRequest.getObservacionexaestomat())
                .observacionodontograma(historiaClinicaRequest.getObservacionodontograma())
                .observacionexaperiodontal(historiaClinicaRequest.getObservacionexaperiodontal())
                .observacionanalisisoclu(historiaClinicaRequest.getObservacionanalisisoclu())
                .observacionayudadiag(historiaClinicaRequest.getObservacionayudadiag())
                .idusuariocreacion(Usuario.builder()
                        .id(historiaClinicaRequest.getIdusuariocreacion())
                        .build())
                .atmmusculatura(historiaClinicaRequest.getAtmmusculatura())
                .fechacreacion(historiaClinicaRequest.getFechacreacion())
                .idusuariomodificacion(Objects.nonNull(historiaClinicaRequest.getIdusuariomodificacion()) ? Usuario.builder()
                        .id(historiaClinicaRequest.getIdusuariomodificacion())
                        .build() : null)
                .fechamodificacion(historiaClinicaRequest.getFechamodificacion())
                .habilitado(historiaClinicaRequest.getHabilitado())
                .build();
    }

    public static HistoriaClinicaResponse toDto(HistoriaClinica historiaClinica) {
        return HistoriaClinicaResponse.builder()
                .id(historiaClinica.getId())
                .idpaciente(Objects.nonNull(historiaClinica.getIdpaciente())
                        ? historiaClinica.getIdpaciente().getNombreCompleto()
                        : null)
                .motivoconsulta(historiaClinica.getMotivoconsulta())
                .enfermedadactual(historiaClinica.getEnfermedadactual())
                .ultimomedicotratante(historiaClinica.getUltimomedicotratante())
                .observacionantec(historiaClinica.getObservacionantec())
                .observacionantecodon(historiaClinica.getObservacionantecodon())
                .observacion(Objects.nonNull(historiaClinica.getObservacion()) || StringUtils.isBlank(historiaClinica.getObservacion())
                        ? getObservaciones()
                        : historiaClinica.getObservacion())
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
                .fechamodificacion(historiaClinica.getFechamodificacion())
                .habilitado(historiaClinica.getHabilitado())
                .acoplamientodienteants(historiaClinica.getAcoplamientodienteants().stream()
                        .map(AcoplamientoDienteAntMapper::toResponse).toList())
                .analisisfuncionals(historiaClinica.getAnalisisfuncionals().stream()
                    .map(AnalisisFuncionalMapper::toResponse).toList())
                .analisisoclusions(historiaClinica.getAnalisisoclusions().stream()
                        .map(AnalisisOclusionMapper::toResponse).toList())
                .antecedentepacientes(historiaClinica.getAntecedentepacientes().stream()
                        .map(AntecedentePacienteMapper::toResponse).toList())
                .ayudadiagnosticas(historiaClinica.getAyudadiagnosticas().stream()
                        .map(AyudaDiagnosticaMapper::toResponse).toList())
                .contactooclusalesmovs(historiaClinica.getContactooclusalesmovs().stream()
                        .map(ContactoOclusalesMovMapper::toResponse).toList())
                .diagnosticos(historiaClinica.getDiagnosticos().stream().map(DiagnosticoMapper::toResponse).toList())
                .examendentals(historiaClinica.getExamendentals().stream().map(ExamenDentalMapper::toResponse).toList())
                .examenestomatologicos(historiaClinica.getExamenestomatologicos().stream()
                        .map(ExamenEstomatologicoMapper::toResponse).toList())
                .examenperiodontals(historiaClinica.getExamenperiodontals().stream()
                        .map(ExamenPeriodontalMapper::toResponse).toList())
                .habitopacientes(
                        historiaClinica.getHabitopacientes().stream().map(HabitoPacienteMapper::toResponse).toList())
                .historiacaries(
                        historiaClinica.getHistoriacaries().stream().map(HistoriAcariesMapper::toResponse).toList())
                .odontogramas(historiaClinica.getOdontogramas().stream().map(OdontogramaMapper::toResponse).toList())
                .plantratamientos(
                        historiaClinica.getPlantratamientos().stream().map(PlanTratamientoMapper::toResponse).toList())
                .signovitals(historiaClinica.getSignovitals().stream().map(SignoVitalMapper::toResponse).toList())
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
                ? historiaClinica.getIdpaciente().getNombreCompleto()
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