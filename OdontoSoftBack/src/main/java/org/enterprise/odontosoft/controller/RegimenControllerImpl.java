package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.RegimenMapper;
import org.enterprise.odontosoft.model.entity.Regimen;
import org.enterprise.odontosoft.model.service.RegimenService;
import org.enterprise.odontosoft.view.dto.response.RegimenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class RegimenControllerImpl implements RegimenController {

    private static final Logger logger = LoggerFactory.getLogger(RegimenControllerImpl.class);

    private final RegimenService regimenService;

    @Override
    public ResponseEntity<List<RegimenResponse>> getAllRegimen() {
        ResponseEntity<List<RegimenResponse>> responseEntity;
        try {
            List<Regimen> regimenes = regimenService.getAllRegimen();
            if (regimenes.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            List<RegimenResponse> regimenesResponse = regimenes.stream()
                .map(RegimenMapper::toResponse)
                .toList();
            responseEntity = ResponseEntity.status(HttpStatus.OK).body(regimenesResponse);
        } catch (Exception e) {
            responseEntity = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            logger.error("Error al obtener los regímenes.", e);
        }
        return responseEntity;
    }
}