package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.TipoDiagnosticoMapper;
import org.enterprise.odontosoft.model.dao.TipoDiagnosticoDao;
import org.enterprise.odontosoft.view.dto.response.OdontogramaResponse;
import org.enterprise.odontosoft.view.dto.response.TipoDiagnosticoResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Controller
public class AnalysisControllerImpl implements AnalysisController {

    private static final Logger logger = LoggerFactory.getLogger(AnalysisControllerImpl.class);

    private final TipoDiagnosticoDao tipoDiagnosticoDao;

    public ResponseEntity<List<TipoDiagnosticoResponse>> getAllAnalysis() {
        ResponseEntity<List<TipoDiagnosticoResponse>> responseEntity = null;
        List<TipoDiagnosticoResponse> tipoDiagnosticosResponse = new ArrayList<>();
        try {
            tipoDiagnosticoDao.findAll().forEach(tipoDiagnostico -> {
                tipoDiagnosticosResponse.add(TipoDiagnosticoMapper.toResponse(tipoDiagnostico));
            });

            if (tipoDiagnosticosResponse == null) {
                responseEntity = ResponseEntity.status(HttpStatus.NOT_FOUND).body((List<TipoDiagnosticoResponse>) new OdontogramaResponse(String.valueOf(HttpStatus.NOT_FOUND.value()), "No se encontró tipos de diagnóstico."));
                return responseEntity;
            }
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(tipoDiagnosticosResponse);
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error getting medical history.", e);
        }

        return responseEntity;
    }
}
