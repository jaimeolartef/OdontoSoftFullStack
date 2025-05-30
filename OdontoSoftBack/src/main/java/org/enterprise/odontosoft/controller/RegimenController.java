package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.RegimenResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RegimenController {
    ResponseEntity<List<RegimenResponse>> getAllRegimen();
}