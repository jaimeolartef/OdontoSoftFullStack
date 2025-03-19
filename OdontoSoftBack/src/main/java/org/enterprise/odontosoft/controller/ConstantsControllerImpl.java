package org.enterprise.odontosoft.controller;

import lombok.AllArgsConstructor;
import org.enterprise.odontosoft.controller.mapper.ConstantesSistemaMapper;
import org.enterprise.odontosoft.model.Service.ConstantsService;
import org.enterprise.odontosoft.view.dto.response.ConstanteResponse;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
public class ConstantsControllerImpl implements ConstantsController {

	private final ConstantsService constantsService;

	@Override
	public List<ConstanteResponse> getAllConstants() {
		return constantsService.getAllConstants().stream()
			.map(ConstantesSistemaMapper::toResponse)
			.toList();
	}
}
