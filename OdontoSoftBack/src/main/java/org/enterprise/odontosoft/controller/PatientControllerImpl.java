package org.enterprise.odontosoft.controller;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.enterprise.odontosoft.controller.Enum.TipoDocumentoEnum;
import org.enterprise.odontosoft.controller.mapper.PatientMapper;
import org.enterprise.odontosoft.model.Dao.PatientDao;
import org.enterprise.odontosoft.model.Entity.Paciente;
import org.enterprise.odontosoft.view.dto.ConsultarPacienteDto;
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
            List<Paciente> pacientes = patientDao.findByDocumentAndAndIdtipodocumento(pacienteDto.getDocumento(), TipoDocumentoEnum.getBySigla(pacienteDto.getIdtipodocumento()).getId());
            if (!pacientes.isEmpty()) {
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PacienteDto(String.valueOf(HttpStatus.BAD_REQUEST.value()), "Ya existe un paciente con el número y tipo de documento proporcionado"));
                return responseEntity;
            }
            Paciente paciente = patientDao.save(PatientMapper.toEntity(pacienteDto));
            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(PatientMapper.toDto(paciente));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error creating patient.", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<List<PacienteDto>> getPatient(String documento, String nombre) {
        ResponseEntity<List<PacienteDto>> responseEntity;
        try {
            List<Paciente> pacientes;
            List<PacienteDto> pacientesDto;
            if (Objects.nonNull(documento) && StringUtils.hasText(documento)) {
                pacientes = patientDao.findByDocument(documento);
            } else if (Objects.nonNull(nombre) && StringUtils.hasText(nombre)) {
                pacientes = patientDao.findByName(nombre);
            } else {
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                return responseEntity;
            }

            pacientesDto = PatientMapper.toDto(pacientes);

            responseEntity = ResponseEntity.status(HttpStatus.OK).body(pacientesDto);
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error getting patient.", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<PacienteDto> getPatientById(Integer id) {
        ResponseEntity<PacienteDto> responseEntity;
        try {
            Paciente paciente = patientDao.findById(id).orElse(null);
            if (Objects.isNull(paciente)) {
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PacienteDto(String.valueOf(HttpStatus.BAD_REQUEST.value()), "No existe un paciente con el id proporcionado"));
            } else {
                responseEntity = ResponseEntity.status(HttpStatus.OK).body(PatientMapper.toDto(paciente));
            }
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error find patient", e);
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
            logger.error("Error updating patient", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<PacienteDto> deletePatient(Integer id) {
        ResponseEntity<PacienteDto> responseEntity;
        PacienteDto pacienteDto;
        try {
            Optional<Paciente> paciente = patientDao.findById(id);
            if (paciente.isPresent()) {
                paciente.get().setHabilitado(false);
                patientDao.save(paciente.get());
                pacienteDto = PatientMapper.toDto(paciente.get());
                responseEntity = ResponseEntity.status(HttpStatus.OK).body(pacienteDto);
            } else {
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PacienteDto(String.valueOf(HttpStatus.BAD_REQUEST.value()), "No existe un paciente con el id proporcionado"));
                return responseEntity;
            }
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error deleting patient", e);
        }

        return responseEntity;
    }
}
