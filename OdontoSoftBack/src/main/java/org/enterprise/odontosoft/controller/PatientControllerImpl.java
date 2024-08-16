package org.enterprise.odontosoft.controller;

import java.util.List;
import java.util.Objects;

import org.enterprise.odontosoft.controller.mapper.PatientMapper;
import org.enterprise.odontosoft.model.Dao.PatientDao;
import org.enterprise.odontosoft.model.Entity.Paciente;
import org.enterprise.odontosoft.view.dto.ConsultarPacienteDto;
import org.enterprise.odontosoft.view.dto.MensajeError;
import org.enterprise.odontosoft.view.dto.PacienteDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

@Controller
public class PatientControllerImpl implements PatientController {
    private final PatientDao patientDao;
    private static final Logger logger = LoggerFactory.getLogger(PatientControllerImpl.class);


    public PatientControllerImpl(PatientDao patientDao) {
        this.patientDao = patientDao;
    }

    @Override
    public ResponseEntity<PacienteDto> createPatient(PacienteDto pacienteDto) {
        ResponseEntity<PacienteDto> responseEntity;
        try {
            Paciente paciente = patientDao.save(PatientMapper.toEntity(pacienteDto));

            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(PatientMapper.toDto(paciente));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error creating patient", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<List<PacienteDto>> getPatient(ConsultarPacienteDto consultarPacienteDto) {
        ResponseEntity<List<PacienteDto>> responseEntity;
        try {
            List<Paciente> pacientes;
            List<PacienteDto> pacientesDto;
            if (Objects.nonNull(consultarPacienteDto.getDocumento()) && StringUtils.hasText(consultarPacienteDto.getDocumento())) {
                pacientes = patientDao.findByDocument(consultarPacienteDto.getDocumento());
            } else if (Objects.nonNull(consultarPacienteDto.getNombre()) && StringUtils.hasText(consultarPacienteDto.getNombre())) {
                pacientes = patientDao.findByName(consultarPacienteDto.getNombre());
            } else {
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                return responseEntity;
            }

            pacientesDto = PatientMapper.toDto(pacientes);

            responseEntity = ResponseEntity.status(HttpStatus.OK).body(pacientesDto);
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error creating patient", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<?> getPatientById(Integer id) {
        ResponseEntity<?> responseEntity;
        try {
            Paciente paciente = patientDao.findById(id).orElse(null);
            if (Objects.isNull(paciente)) {
                responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(MensajeError.builder()
                        .codigo(String.valueOf(HttpStatus.NOT_FOUND.value()))
                        .mensaje("Paciente no encontrado")
                        .build());
            } else {
                responseEntity = ResponseEntity.status(HttpStatus.OK).body(PatientMapper.toDto(paciente));
            }
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(MensajeError.builder()
                    .codigo(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()))
                    .mensaje("Ocurrió un error al consultar el paciente")
                    .build());
            logger.error("Error creating patient", e);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<PacienteDto> updatePatient(PacienteDto pacienteDto) {
        ResponseEntity<PacienteDto> responseEntity;
        try {
            Paciente paciente = patientDao.save(PatientMapper.toEntity(pacienteDto));
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(PatientMapper.toDto(paciente));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error creating patient", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<Void> deletePatient(Integer id) {
        ResponseEntity<Void> responseEntity;
        try {
            patientDao.deleteById(id);
            responseEntity = ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error creating patient", e);
        }

        return responseEntity;
    }
}
