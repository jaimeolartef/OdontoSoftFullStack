package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.AntecedenteMapper;
import org.enterprise.odontosoft.model.Dao.AntecedenteDao;
import org.enterprise.odontosoft.model.Entity.Antecedente;
import org.enterprise.odontosoft.view.dto.response.AntecedenteResponse;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.NoSuchElementException;

@AllArgsConstructor
@Controller
public class PredecentHistoryImpl implements PrecedentHistory {

    private final AntecedenteDao antecedenteDao;

    @Override
    public List<AntecedenteResponse> getAntecedentes() throws NoSuchElementException {
            List<Antecedente> antecedentes = antecedenteDao.findAllByHabilitadoTrue();
            if (antecedentes.isEmpty()) {
                throw new NoSuchElementException("404", new Throwable("No se encontraron antecedentes"));
            }
        return antecedentes.stream().map(AntecedenteMapper::toDto).toList();
    }
}
