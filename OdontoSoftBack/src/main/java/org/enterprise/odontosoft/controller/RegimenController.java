package org.enterprise.odontosoft.controller;

import org.enterprise.odontosoft.view.dto.response.RegimenResponse;

import java.util.List;

public interface RegimenController {
    List<RegimenResponse> getAllRegimen();
}