package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.controller.mapper.PatientMapper;
import org.enterprise.odontosoft.model.Dao.PatientDao;
import org.enterprise.odontosoft.model.Entity.Paciente;
import org.enterprise.odontosoft.view.dto.PacienteDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
