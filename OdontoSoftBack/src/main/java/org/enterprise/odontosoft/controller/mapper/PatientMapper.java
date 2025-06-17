package org.enterprise.odontosoft.controller.mapper;

import java.util.List;
import java.util.Objects;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.controller.enume.TipoDocumentoEnum;
import org.enterprise.odontosoft.model.entity.Paciente;
import org.enterprise.odontosoft.model.entity.TipoDocumento;
import org.enterprise.odontosoft.model.entity.Usuario;
import org.enterprise.odontosoft.util.UtilDate;
import org.enterprise.odontosoft.view.dto.request.PacienteRequest;
import org.enterprise.odontosoft.view.dto.response.PacienteResponse;

@UtilityClass
public class PatientMapper {

    public static Paciente toEntity(PacienteRequest pacienteRequest) {
        return Paciente.builder()
            .id(pacienteRequest.getId())
            .idtipodocumento(TipoDocumento.builder()
                .id(TipoDocumentoEnum.getBySigla(pacienteRequest.getIdtipodocumento()).getId())
                .build())
            .documento(pacienteRequest.getDocumento())
            .primernombre(pacienteRequest.getPrimernombre())
            .segundonombre(pacienteRequest.getSegundonombre())
            .primerapellido(pacienteRequest.getPrimerapellido())
            .segundoapellido(pacienteRequest.getSegundoapellido())
            .fechanacimiento(UtilDate.convertToLocalDate(pacienteRequest.getFechanacimiento()))
            .ciudadnacimiento(pacienteRequest.getCiudadnacimiento())
            .genero(pacienteRequest.getGenero())
            .estadocivil(pacienteRequest.getEstadocivil())
            .direccionresidencia(pacienteRequest.getDireccionresidencia())
            .ciudadresidencia(pacienteRequest.getCiudadresidencia())
            .telefono(pacienteRequest.getTelefono())
            .correo(pacienteRequest.getCorreo())
            .nombreacompanante(pacienteRequest.getNombreacompanante())
            .parentescoacompanante(pacienteRequest.getParentescoacompanante())
            .telefonoacompanante(pacienteRequest.getTelefonoacompanante())
            .idusuariocreacion(Usuario.builder().codigo(pacienteRequest.getIdusuariocreacion()).build())
            .fechacreacion(pacienteRequest.getFechacreacion())
            .idusuariomodificacion(Usuario.builder().codigo(pacienteRequest.getIdusuariomodificacion()).build())
            .fechamodificacion(Objects.nonNull(pacienteRequest.getFechamodificacion()) ? pacienteRequest.getFechamodificacion() : null)
            .habilitado(Objects.equals(pacienteRequest.getHabilitado(), "true"))
            .build();
    }

    public static PacienteResponse toDto(Paciente paciente) {
        return PacienteResponse.builder()
            .id(paciente.getId())
            .idtipodocumento(TipoDocumentoEnum.getById(paciente.getIdtipodocumento().getId()).getSigla())
            .documento(paciente.getDocumento())
            .primernombre(paciente.getPrimernombre())
            .segundonombre(paciente.getSegundonombre())
            .primerapellido(paciente.getPrimerapellido())
            .segundoapellido(paciente.getSegundoapellido())
            .fechanacimiento(String.valueOf(paciente.getFechanacimiento()))
            .ciudadnacimiento(paciente.getCiudadnacimiento())
            .genero(paciente.getGenero())
            .estadocivil(paciente.getEstadocivil())
            .direccionresidencia(paciente.getDireccionresidencia())
            .ciudadresidencia(paciente.getCiudadresidencia())
            .telefono(paciente.getTelefono())
            .correo(paciente.getCorreo())
            .nombreacompanante(paciente.getNombreacompanante())
            .parentescoacompanante(paciente.getParentescoacompanante())
            .telefonoacompanante(paciente.getTelefonoacompanante())
            .habilitado(paciente.isHabilitado() ? "true" : "false")
            .build();
    }

    public static PacienteResponse toDtoLight(Paciente paciente) {
        return PacienteResponse.builder()
            .id(paciente.getId())
            .idtipodocumento(TipoDocumentoEnum.getById(paciente.getIdtipodocumento().getId()).getSigla())
            .documento(paciente.getDocumento())
            .primernombre(paciente.getPrimernombre())
            .segundonombre(paciente.getSegundonombre())
            .primerapellido(paciente.getPrimerapellido())
            .segundoapellido(paciente.getSegundoapellido())
            .telefono(paciente.getTelefono())
            .habilitado(paciente.isHabilitado() ? "true" : "false")
            .build();
    }

    public static List<PacienteResponse> toDto(List<Paciente> pacientes) {
        return pacientes.stream().map(PatientMapper::toDtoLight).toList();
    }
}
