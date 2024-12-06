package org.enterprise.odontosoft.controller;

import java.util.List;
import java.util.Objects;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.Enum.TipoDocumentoEnum;
import org.enterprise.odontosoft.controller.mapper.PatientMapper;
import org.enterprise.odontosoft.model.Dao.PatientDao;
import org.enterprise.odontosoft.model.Dao.UsuarioDao;
import org.enterprise.odontosoft.model.Entity.Paciente;
import org.enterprise.odontosoft.model.Entity.Usuario;
import org.enterprise.odontosoft.view.dto.request.PacienteRequest;
import org.enterprise.odontosoft.view.dto.response.PacienteResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

@AllArgsConstructor
@Controller
public class PatientControllerImpl implements PatientController {
    private final PatientDao patientDao;
    private final UsuarioDao usuarioDao;
    private static final Logger logger = LoggerFactory.getLogger(PatientControllerImpl.class);

    @Override
    public ResponseEntity<PacienteResponse> createPatient(PacienteRequest pacienteRequest) {
        ResponseEntity<PacienteResponse> responseEntity;
        try {
            List<Paciente> pacientes = patientDao.findByDocument(pacienteRequest.getDocumento());
            if (!pacientes.isEmpty()) {
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PacienteResponse(String.valueOf(HttpStatus.BAD_REQUEST.value()), "Ya existe un paciente con el número de documento proporcionado"));
                return responseEntity;
            }
            Paciente paciente = PatientMapper.toEntity(pacienteRequest);
            paciente.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(pacienteRequest.getIdusuariocreacion()).getId()).build());
            if (Objects.nonNull(pacienteRequest.getFechamodificacion())) {
                paciente.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(pacienteRequest.getIdusuariomodificacion()).getId()).build());
            } else {
                paciente.setIdusuariomodificacion(null);
            }
            patientDao.save(paciente);
            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(PatientMapper.toDto(paciente));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error creating patient.", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<List<PacienteResponse>> getPatient(String documento, String nombre) {
        ResponseEntity<List<PacienteResponse>> responseEntity;
        try {
            List<Paciente> pacientes;
            List<PacienteResponse> pacientesDto;
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
    public ResponseEntity<PacienteResponse> getPatientById(Integer id) {
        ResponseEntity<PacienteResponse> responseEntity;
        try {
            Paciente paciente = patientDao.findById(id).orElse(null);
            if (Objects.isNull(paciente)) {
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PacienteResponse(String.valueOf(HttpStatus.BAD_REQUEST.value()), "No existe un paciente con el id proporcionado"));
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
    public ResponseEntity<PacienteResponse> updatePatient(PacienteRequest pacienteRequest) {
        ResponseEntity<PacienteResponse> responseEntity;
        try {
            Paciente paciente = patientDao.save(PatientMapper.toEntity(pacienteRequest));
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(PatientMapper.toDto(paciente));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error updating patient", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<List<PacienteResponse>> getAllPatients() {
        ResponseEntity<List<PacienteResponse>> responseEntity;
        try {
            List<Paciente> pacientes = (List<Paciente>) patientDao.findAll();
            List<PacienteResponse> pacientesDto = PatientMapper.toDto(pacientes);
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(pacientesDto);
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error getting all patients", e);
        }
        return responseEntity;
    }
}
