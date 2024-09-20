package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.AntecedenteResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.NoSuchElementException;

public interface PrecedentHistory {

    List<AntecedenteResponse> getAntecedentes() throws NoSuchElementException;
}
