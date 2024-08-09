package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.model.Dao.PatientDao;
import org.enterprise.odontosoft.model.Entity.Paciente;
import org.enterprise.odontosoft.view.dto.PacienteDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
public class PatientControllerImpl implements PatientController {
    private final PatientDao patientDao;

    public PatientControllerImpl(PatientDao patientDao) {
        this.patientDao = patientDao;
    }

    @Override
    public ResponseEntity<Void> createPatient(PacienteDto pacienteDto) {
        ResponseEntity<Void> responseEntity;

        try {
            Paciente paciente = patientDao.save(Paciente.builder()
                .id(pacienteDto.getId())
                .idtipodocumento(pacienteDto.getIdtipodocumento())
                .primernombre(pacienteDto.getPrimernombre())
                .segundonombre(pacienteDto.getSegundonombre())
                .primerapellido(pacienteDto.getPrimerapellido())
                .segundoapellido(pacienteDto.getSegundoapellido())
                .fechanacimiento(pacienteDto.getFechanacimiento())
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
                .build());

            responseEntity = ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<PacienteDto> getPatient(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updatePatient(PacienteDto paciente) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deletePatient(Integer id) {
        return null;
    }
}
