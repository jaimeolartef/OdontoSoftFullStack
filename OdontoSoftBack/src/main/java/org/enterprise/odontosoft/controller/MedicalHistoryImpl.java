package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.controller.mapper.MedicalHistoryMapper;
import org.enterprise.odontosoft.model.Dao.HistoriaClinicaDao;
import org.enterprise.odontosoft.model.Entity.HistoriaClinica;
import org.enterprise.odontosoft.view.dto.request.HistoriaClinicaRequest;
import org.enterprise.odontosoft.view.dto.response.HistoriaClinicaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class MedicalHistoryImpl implements MedicalHistory {

    private final HistoriaClinicaDao historiaClinicaDao;
    private static final Logger logger = LoggerFactory.getLogger(MedicalHistoryImpl.class);

    public MedicalHistoryImpl(HistoriaClinicaDao historiaClinicaDao) {
        this.historiaClinicaDao = historiaClinicaDao;
    }

    @Override
    public ResponseEntity<HistoriaClinicaResponse> createMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
        ResponseEntity<HistoriaClinicaResponse> responseEntity = null;
        try {
            List<HistoriaClinica> historiaClinicas = historiaClinicaDao.findByPacienteId(historiaClinicaRequest.getIdpaciente());
            if (!historiaClinicas.isEmpty()) {
                responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new HistoriaClinicaResponse(String.valueOf(HttpStatus.BAD_REQUEST.value()), "Ya existe una historia clínica para el paciente proporcionado"));
                return responseEntity;
            }
            HistoriaClinica historiaClinica = historiaClinicaDao.save(MedicalHistoryMapper.toEntity(historiaClinicaRequest));
            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(MedicalHistoryMapper.toDto(historiaClinica));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error creating medical history.", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<HistoriaClinicaResponse> getMedicalHistoryById(Integer id) {
        ResponseEntity<HistoriaClinicaResponse> responseEntity = null;
        try {
            HistoriaClinica historiaClinica = historiaClinicaDao.findById(id).orElse(null);
            if (historiaClinica == null) {
                responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body(new HistoriaClinicaResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "No se encontró la historia clínica"));
                return responseEntity;
            }
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(MedicalHistoryMapper.toDto(historiaClinica));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error getting medical history.", e);
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity<HistoriaClinicaResponse> updateMedicalHistory(HistoriaClinicaRequest historiaClinicaRequest) {
        ResponseEntity<HistoriaClinicaResponse> responseEntity = null;
        try {
            HistoriaClinica historiaClinica = historiaClinicaDao.save(MedicalHistoryMapper.toEntity(historiaClinicaRequest));
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(MedicalHistoryMapper.toDto(historiaClinica));
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error updating medical history.", e);
        }

        return responseEntity;
    }
}
