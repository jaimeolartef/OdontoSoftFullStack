package org.enterprise.odontosoft.controller.mapper;

import java.util.List;
import java.util.Objects;

import lombok.experimental.UtilityClass;
import org.enterprise.odontosoft.controller.Enum.TipoDocumentoEnum;
import org.enterprise.odontosoft.model.Entity.Paciente;
import org.enterprise.odontosoft.model.Entity.Tipodocumento;
import org.enterprise.odontosoft.util.UtilDate;
import org.enterprise.odontosoft.view.dto.PacienteDto;

@UtilityClass
public class PatientMapper {

    public static Paciente toEntity(PacienteDto pacienteDto) {
        return Paciente.builder()
            .id(pacienteDto.getId())
            .idtipodocumento(Tipodocumento.builder()
                .id(TipoDocumentoEnum.getBySigla(pacienteDto.getIdtipodocumento()).getId())
                .build())
            .documento(pacienteDto.getDocumento())
            .primernombre(pacienteDto.getPrimernombre())
            .segundonombre(pacienteDto.getSegundonombre())
            .primerapellido(pacienteDto.getPrimerapellido())
            .segundoapellido(pacienteDto.getSegundoapellido())
            .fechanacimiento(UtilDate.convertToLocalDate(pacienteDto.getFechanacimiento()))
            .ciudadnacimiento(pacienteDto.getCiudadnacimiento())
            .genero(pacienteDto.getGenero())
            .estadocivil(pacienteDto.getEstadocivil())
            .direccionresidencia(pacienteDto.getDireccionresidencia())
            .ciudadresidencia(pacienteDto.getCiudadresidencia())
            .telefono(pacienteDto.getTelefono())
            .correo(pacienteDto.getCorreo())
            .nombreacompanante(pacienteDto.getNombreacompanante())
            .parentescoacompanante(pacienteDto.getParentescoacompanante())
            .telefonoacompanante(pacienteDto.getTelefonoacompanante())
            .habilitado(Objects.equals(pacienteDto.getHabilitado(), "true"))
            .build();
    }

    public static PacienteDto toDto(Paciente paciente) {
        return PacienteDto.builder()
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

    public static PacienteDto toDtoLight(Paciente paciente) {
        return PacienteDto.builder()
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

    public static List<PacienteDto> toDto(List<Paciente> pacientes) {
        return pacientes.stream().map(PatientMapper::toDtoLight).toList();
    }
}
