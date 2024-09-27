package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.AntecedenteResponse;

import java.util.List;
import java.util.NoSuchElementException;

public interface PrecedentHistoryController {

    List<AntecedenteResponse> getAntecedentes() throws NoSuchElementException;
}
