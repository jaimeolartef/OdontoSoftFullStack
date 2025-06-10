package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.TipoDiagnosticoMapper;
import org.enterprise.odontosoft.model.dao.TipoDiagnosticoDao;
import org.enterprise.odontosoft.view.dto.response.TipoDiagnosticoResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Controller
public class AnalysisControllerImpl implements AnalysisController {

    private static final Logger logger = LoggerFactory.getLogger(AnalysisControllerImpl.class);

    private final TipoDiagnosticoDao tipoDiagnosticoDao;

    @Override
    public List<TipoDiagnosticoResponse> getAllAnalysis() {
        List<TipoDiagnosticoResponse> tipoDiagnosticosResponse = new ArrayList<>();
        try {
            tipoDiagnosticoDao.findAll().forEach(tipoDiagnostico -> {
                tipoDiagnosticosResponse.add(TipoDiagnosticoMapper.toResponse(tipoDiagnostico));
            });
        } catch (Exception e) {
            logger.error("Error obteniendo tipos de diagnóstico.", e);
            // Puedes lanzar una excepción personalizada si lo deseas
        }
        return tipoDiagnosticosResponse;
    }
}