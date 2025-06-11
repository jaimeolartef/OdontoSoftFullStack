package org.enterprise.odontosoft.controller;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.EntityExistsException;
import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.PatientMapper;
import org.enterprise.odontosoft.exception.CustomException;
import org.enterprise.odontosoft.model.dao.PatientDao;
import org.enterprise.odontosoft.model.dao.UsuarioDao;
import org.enterprise.odontosoft.model.entity.Paciente;
import org.enterprise.odontosoft.model.entity.Usuario;
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
    public PacienteResponse createPatient(PacienteRequest pacienteRequest) {
        try {
            List<Paciente> pacientes = patientDao.findByDocument(pacienteRequest.getDocumento());
            if (!pacientes.isEmpty()) {
                throw new EntityExistsException("Ya existe un paciente con el número de documento proporcionado");
            }
            Paciente paciente = PatientMapper.toEntity(pacienteRequest);
            paciente.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(pacienteRequest.getIdusuariocreacion()).getId()).build());
            if (Objects.nonNull(pacienteRequest.getFechamodificacion())) {
                paciente.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(pacienteRequest.getIdusuariomodificacion()).getId()).build());
            } else {
                paciente.setIdusuariomodificacion(null);
            }
            patientDao.save(paciente);
            return PatientMapper.toDto(paciente);
        } catch (Exception e) {
            logger.error("Error creating patient.", e);
            throw e;
        }
    }

    @Override
    public List<PacienteResponse> getPatient(String documento, String nombre, String correo) {
        try {
            List<Paciente> pacientes;

            // Verificar si al menos un parámetro tiene valor
            if (!StringUtils.hasText(documento) && !StringUtils.hasText(nombre) && !StringUtils.hasText(correo)) {
                throw new CustomException("Se debe proporcionar al menos un criterio de búsqueda: documento, nombre o correo", 400);
            }

            if (StringUtils.hasText(documento)) {
                pacientes = patientDao.findByDocument(documento);
            } else if (StringUtils.hasText(nombre)) {
                pacientes = patientDao.findByName(nombre);
            } else {
                pacientes = patientDao.findByCorreo(correo);
            }

            // Si no se encuentran pacientes, lanzar excepción
            if (pacientes.isEmpty()) {
                throw new CustomException("No se encontraron pacientes con los criterios de búsqueda proporcionados", 404);
            }

            return PatientMapper.toDto(pacientes);
        } catch (Exception e) {
            logger.error("Error al buscar pacientes", e);
            throw e;
        }
    }

    @Override
    public PacienteResponse getPatientById(Integer id) {
        try {
            Paciente paciente = patientDao.findById(id).orElse(null);
            if (Objects.isNull(paciente)) {
                throw new CustomException("No existe un paciente con el id proporcionado", 404);
            } else {
                return PatientMapper.toDto(paciente);
            }
        } catch (Exception e) {
            logger.error("Error find patient", e);
            throw e;
        }
    }

    @Override
    public PacienteResponse updatePatient(PacienteRequest pacienteRequest) {
        try {
            Paciente paciente = PatientMapper.toEntity(pacienteRequest);
            paciente.setIdusuariocreacion(Usuario.builder().id(usuarioDao.findByCodigo(pacienteRequest.getIdusuariocreacion()).getId()).build());
            PacienteResponse pacienteResponse = PatientMapper.toDto(paciente);
            if (Objects.nonNull(pacienteRequest.getFechamodificacion())) {
                paciente.setIdusuariomodificacion(Usuario.builder().id(usuarioDao.findByCodigo(pacienteRequest.getIdusuariomodificacion()).getId()).build());
            } else {
                paciente.setIdusuariomodificacion(null);
            }
            patientDao.save(paciente);
            return pacienteResponse;
        } catch (Exception e) {
            logger.error("Error updating patient", e);
            throw e;
        }
    }

    @Override
    public List<PacienteResponse> getAllPatients() {
        try {
            List<Paciente> pacientes = (List<Paciente>) patientDao.findAll();
            return PatientMapper.toDto(pacientes);
        } catch (Exception e) {
            logger.error("Error getting all patients", e);
            throw e;
        }
    }
}
