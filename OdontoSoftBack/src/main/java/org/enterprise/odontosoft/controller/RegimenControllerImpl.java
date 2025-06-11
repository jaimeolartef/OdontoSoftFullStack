package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.RegimenMapper;
import org.enterprise.odontosoft.model.entity.Regimen;
import org.enterprise.odontosoft.model.service.RegimenService;
import org.enterprise.odontosoft.view.dto.response.RegimenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class RegimenControllerImpl implements RegimenController {

    private static final Logger logger = LoggerFactory.getLogger(RegimenControllerImpl.class);

    private final RegimenService regimenService;

    @Override
    public List<RegimenResponse> getAllRegimen() {
        try {
            List<Regimen> regimenes = regimenService.getAllRegimen();
            if (regimenes.isEmpty()) {
                throw new jakarta.persistence.EntityNotFoundException("No se encontraron regímenes.");
            }
            return regimenes.stream()
                .map(RegimenMapper::toResponse)
                .toList();
        } catch (Exception e) {
            logger.error("Error al obtener los regímenes.", e);
            throw e;
        }
    }
}